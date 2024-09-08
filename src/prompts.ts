import { extractFrontmatter } from "@silverbulletmd/silverbullet/lib/frontmatter";
import {
  editor,
  markdown,
  space,
  system,
} from "@silverbulletmd/silverbullet/syscalls";
import { queryObjects } from "./utils.ts";
import { renderTemplate } from "https://deno.land/x/silverbullet@0.9.4/plugs/template/api.ts";
import type {
  CompleteEvent,
  SlashCompletionOption,
  SlashCompletions,
} from "@silverbulletmd/silverbullet/types";
import { getPageLength } from "./editorUtils.ts";
import { currentAIProvider, initIfNeeded } from "./init.ts";
import {
  convertPageToMessages,
  enrichChatMessages,
  supportsPlugSlashComplete,
} from "./utils.ts";
import { ChatMessage } from "./types.ts";

// This only works in 0.7.2+, see https://github.com/silverbulletmd/silverbullet/issues/742
export async function aiPromptSlashComplete(
  completeEvent: CompleteEvent,
): Promise<{ options: SlashCompletions[] } | void> {
  if (!supportsPlugSlashComplete()) {
    return;
  }
  const allTemplates = await queryObjects("template", {
    filter: ["attr", ["attr", "aiprompt"], "slashCommand"],
  }, 5);
  return {
    options: allTemplates.map((template) => {
      const aiPromptTemplate = template.aiprompt!;
      console.log("ai prompt template: ", aiPromptTemplate);

      return {
        label: aiPromptTemplate.slashCommand,
        detail: aiPromptTemplate.description || template.description,
        order: aiPromptTemplate.order || 0,
        templatePage: template.ref,
        pageName: completeEvent.pageName,
        invoke: "silverbullet-ai.insertAiPromptFromTemplate",
      };
    }),
  };
}

/**
 * Prompts the user to select a template, renders that template, sends it to the LLM, and then inserts the result into the page.
 * Valid templates must have a value for aiprompt.description in the frontmatter.
 */
export async function insertAiPromptFromTemplate(
  SlashCompletions: SlashCompletionOption | undefined,
) {
  let selectedTemplate;

  if (!SlashCompletions || !SlashCompletions.templatePage) {
    // TODO: I don't really understand how this filter works.  I'd rather have it check for a #aiPrompt tag instead of an aiprompt.description property
    const aiPromptTemplates = await queryObjects("template", {
      filter: ["attr", ["attr", "aiprompt"], "description"],
    });

    selectedTemplate = await editor.filterBox(
      "Prompt Template",
      aiPromptTemplates.map((templateObj) => {
        const niceName = templateObj.ref.split("/").pop()!;
        return {
          ...templateObj,
          description: templateObj.aiprompt.description || templateObj.ref,
          name: templateObj.aiprompt.displayName || niceName,
          systemPrompt: templateObj.aiprompt.systemPrompt ||
            "You are an AI note assistant. Please follow the prompt instructions.",
          insertAt: templateObj.aiprompt.insertAt || "cursor",
          chat: templateObj.aiprompt.chat || false,
          enrichMessages: templateObj.aiprompt.enrichMessages || false,
        };
      }),
      `Select the template to use as the prompt.  The prompt will be rendered and sent to the LLM model.`,
    );
  } else {
    console.log("selectedTemplate from slash completion: ", SlashCompletions);
    const templatePage = await space.readPage(SlashCompletions.templatePage);
    const tree = await markdown.parseMarkdown(templatePage);
    const { aiprompt } = await extractFrontmatter(tree);
    console.log("templatePage from slash completion: ", templatePage);
    selectedTemplate = {
      ref: SlashCompletions.templatePage,
      systemPrompt: aiprompt.systemPrompt || aiprompt.system ||
        "You are an AI note assistant. Please follow the prompt instructions.",
      insertAt: aiprompt.insertAt || "cursor",
      chat: aiprompt.chat || false,
      enrichMessages: aiprompt.enrichMessages || false,
    };
  }

  if (!selectedTemplate) {
    await editor.flashNotification("No template selected");
    return;
  }

  console.log("User selected prompt template: ", selectedTemplate);

  const validInsertAtOptions = [
    "cursor",
    "page-start",
    "page-end",
    "start-of-line",
    "end-of-line",
    // Item can mean either a list item or a task
    "start-of-item",
    "end-of-item",
    "new-line-above",
    "new-line-below",
    "replace-line",
    // "frontmatter",
    // "modal",
    // "replace",
  ];
  if (!validInsertAtOptions.includes(selectedTemplate.insertAt)) {
    console.error(
      `Invalid insertAt value: ${selectedTemplate.insertAt}. It must be one of ${
        validInsertAtOptions.join(", ")
      }`,
    );
    await editor.flashNotification(
      `Invalid insertAt value: ${selectedTemplate.insertAt}. Please select a valid option.`,
      "error",
    );
    return;
  }

  await initIfNeeded();

  let templateText, currentPage, pageMeta;
  try {
    templateText = await space.readPage(selectedTemplate.ref);
    currentPage = await editor.getCurrentPage();
    pageMeta = await space.getPageMeta(currentPage);
  } catch (error) {
    console.error("Error fetching template details or page metadata", error);
    await editor.flashNotification(
      "Error fetching template details or page metadata",
      "error",
    );
    return;
  }

  let currentPageText,
    currentLineNumber,
    lineStartPos,
    lineEndPos,
    currentItemBounds,
    currentItemText,
    parentItemBounds,
    parentItemText;
  try {
    // This is all to get the current line number and position
    // It probably could be a new editor.syscall or something that uses the tree instead
    currentPageText = await editor.getText();
    const curCursorPos = await editor.getCursor();
    const lines = currentPageText.split("\n");
    currentLineNumber =
      currentPageText.substring(0, curCursorPos).split("\n").length;
    lineStartPos = curCursorPos -
      (currentPageText.substring(0, curCursorPos).split("\n").pop()?.length ||
        0);
    lineEndPos = lineStartPos + lines[currentLineNumber - 1].length;

    // Also get the current item if we need it
    currentItemBounds = await system.invokeFunction(
      "editor.determineItemBounds",
      currentPageText,
      curCursorPos,
      undefined,
      true,
    );
    currentItemText = currentPageText.slice(
      currentItemBounds.from,
      currentItemBounds.to,
    );

    parentItemBounds = await system.invokeFunction(
      "editor.determineItemBounds",
      currentPageText,
      curCursorPos,
      0,
      true,
    );
    parentItemText = currentPageText.slice(
      parentItemBounds.from,
      parentItemBounds.to,
    );
  } catch (error) {
    console.error("Error fetching current page text or cursor position", error);
    await editor.flashNotification(
      "Error fetching current page text or cursor position",
      "error",
    );
    return;
  }

  let cursorPos;
  switch (selectedTemplate.insertAt) {
    case "page-start":
      cursorPos = 0;
      break;
    case "page-end":
      cursorPos = await getPageLength();
      break;
    case "frontmatter":
      await editor.flashNotification(
        `rendering in frontmatter not supported yet`,
        "error",
      );
      break;
    case "modal":
      // TODO: How do we handle modals?
      break;
    case "replace":
      // TODO: Replace selection
      break;
    case "replace-line":
      cursorPos = lineStartPos;
      await editor.replaceRange(lineStartPos, lineEndPos, "");
      break;
    case "start-of-line":
      cursorPos = lineStartPos;
      break;
    case "end-of-line":
      cursorPos = lineEndPos;
      break;
    case "new-line-above":
      cursorPos = lineStartPos;
      await editor.insertAtPos("\n", cursorPos);
      cursorPos += 1;
      break;
    case "new-line-below":
      cursorPos = lineEndPos;
      await editor.insertAtPos("\n", cursorPos);
      cursorPos += 1;
      break;
    case "start-of-item":
      cursorPos = currentItemBounds.from;
      break;
    case "end-of-item":
      cursorPos = currentItemBounds.to;
      break;
    case "cursor":
    default:
      cursorPos = await editor.getCursor();
  }

  if (cursorPos === undefined) {
    cursorPos = await getPageLength();
  }

  console.log("templatetext: ", templateText);

  let messages: ChatMessage[] = [];
  const globalMetadata = {
    page: pageMeta,
    currentItemBounds: currentItemBounds,
    currentItemText: currentItemText,
    currentLineNumber: currentLineNumber,
    lineStartPos: lineStartPos,
    lineEndPos: lineEndPos,
    currentPageText: currentPageText,
    parentItemBounds: parentItemBounds,
    parentItemText: parentItemText,
  };

  if (!selectedTemplate.chat) {
    // non-multi-chat template
    const renderedTemplate = await renderTemplate(
      templateText,
      pageMeta,
      globalMetadata,
    );
    console.log("Rendered template:", renderedTemplate);
    if (selectedTemplate.systemPrompt) {
      messages.push({
        role: "system",
        content: selectedTemplate.systemPrompt,
      });
    }
    messages.push({
      role: "user",
      content: renderedTemplate.text,
    });
  } else {
    // multi-turn-chat template
    messages = await convertPageToMessages(templateText);
    if (selectedTemplate.systemPrompt) {
      messages.unshift({
        role: "system",
        content: selectedTemplate.systemPrompt,
      });
    }
    if (selectedTemplate.chat && selectedTemplate.enrichMessages) {
      messages = await enrichChatMessages(messages, globalMetadata);
    }
  }

  console.log("Messages: ", messages);
  await currentAIProvider.streamChatIntoEditor({
    messages: messages,
    stream: true,
  }, cursorPos);
}
