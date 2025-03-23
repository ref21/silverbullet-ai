import { editor } from "@silverbulletmd/silverbullet/syscalls";
import { currentAIProvider, initIfNeeded } from "./init.ts";
import { AudioTranscriptionOptions } from "./types.ts";

/**
 * Captures audio from the user's microphone and sends it to the OpenAI API for transcription.
 * Inserts the transcribed text at the cursor position.
 */
export async function transcribeAudio() {
  try {
    await initIfNeeded();
    
    await editor.flashNotification("Recording... Press Stop when finished.");
    
    // Request microphone access and start recording
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: BlobPart[] = [];
    
    // Set up event handlers for recording
    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });
    
    // Create UI for the recording
    const recordingUI = `
      <div style="padding: 20px; text-align: center;">
        <h3>Recording Audio...</h3>
        <button id="stop-recording" style="background: #f44336; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
          Stop Recording
        </button>
        <div id="recording-status" style="margin-top: 10px;">Recording in progress...</div>
      </div>
    `;
    
    const stopRecordingScript = `
      document.getElementById('stop-recording').addEventListener('click', () => {
        window.parent.postMessage({ type: 'stop-recording' }, '*');
      });
    `;
    
    // Show recording UI in a panel
    await editor.showPanel("rhs", 3, recordingUI, stopRecordingScript);
    
    // Start recording
    mediaRecorder.start();
    
    // Set up message listener for the stop button
    const recordingPromise = new Promise<Blob>((resolve) => {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'stop-recording') {
          mediaRecorder.stop();
          
          // Wait for all data to be collected
          mediaRecorder.addEventListener("stop", () => {
            // Stop all tracks to release the microphone
            stream.getTracks().forEach(track => track.stop());
            
            // Combine audio chunks into a single blob
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            resolve(audioBlob);
          });
        }
      }, { once: true });
    });
    
    // Wait for recording to complete
    const audioBlob = await recordingPromise;
    
    // Hide the panel once recording is stopped
    await editor.hidePanel("rhs");
    await editor.flashNotification("Transcribing audio...");
    
    // Convert blob to base64
    const base64Audio = await blobToBase64(audioBlob);
    
    // Send to OpenAI for transcription
    const transcription = await currentAIProvider.transcribeAudio({
      audio: base64Audio,
      model: "gpt-4o-transcribe",
      language: "en" // This could be made configurable
    });
    
    // Insert transcription at cursor
    if (transcription) {
      await editor.insertAtCursor(transcription);
      await editor.flashNotification("Transcription inserted!");
    } else {
      await editor.flashNotification("Transcription failed.", "error");
    }
    
  } catch (error) {
    console.error("Error during transcription:", error);
    await editor.hidePanel("rhs");
    await editor.flashNotification(`Transcription error: ${error.message}`, "error");
  }
}

// Helper function to convert a Blob to base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix
      const base64 = base64String.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}