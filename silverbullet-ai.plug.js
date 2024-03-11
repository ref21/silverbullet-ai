var Le=Object.defineProperty;var A=(e,t)=>{for(var r in t)Le(e,r,{get:t[r],enumerable:!0})};var B=typeof window>"u"&&typeof globalThis.WebSocketPair>"u";typeof Deno>"u"&&(self.Deno={args:[],build:{arch:"x86_64"},env:{get(){}}});var j=new Map,G=0;function O(e){self.postMessage(e)}B&&(globalThis.syscall=async(e,...t)=>await new Promise((r,n)=>{G++,j.set(G,{resolve:r,reject:n}),O({type:"sys",id:G,name:e,args:t})}));function re(e,t){B&&(self.addEventListener("message",r=>{(async()=>{let n=r.data;switch(n.type){case"inv":{let o=e[n.name];if(!o)throw new Error(`Function not loaded: ${n.name}`);try{let s=await Promise.resolve(o(...n.args||[]));O({type:"invr",id:n.id,result:s})}catch(s){console.error("An exception was thrown as a result of invoking function",n.name,"error:",s.message),O({type:"invr",id:n.id,error:s.message})}}break;case"sysr":{let o=n.id,s=j.get(o);if(!s)throw Error("Invalid request id");j.delete(o),n.error?s.reject(new Error(n.error)):s.resolve(n.result)}break}})().catch(console.error)}),O({type:"manifest",manifest:t}))}function Ke(e){let t=atob(e),r=t.length,n=new Uint8Array(r);for(let o=0;o<r;o++)n[o]=t.charCodeAt(o);return n}function ne(e){typeof e=="string"&&(e=new TextEncoder().encode(e));let t="",r=e.byteLength;for(let n=0;n<r;n++)t+=String.fromCharCode(e[n]);return btoa(t)}async function Re(e,t){if(typeof e!="string"){let r=new Uint8Array(await e.arrayBuffer()),n=r.length>0?ne(r):void 0;t={method:e.method,headers:Object.fromEntries(e.headers.entries()),base64Body:n},e=e.url}return syscall("sandboxFetch.fetch",e,t)}globalThis.nativeFetch=globalThis.fetch;function $e(){globalThis.fetch=async function(e,t){let r=t&&t.body?ne(new Uint8Array(await new Response(t.body).arrayBuffer())):void 0,n=await Re(e,t&&{method:t.method,headers:t.headers,base64Body:r});return new Response(n.base64Body?Ke(n.base64Body):null,{status:n.status,headers:n.headers})}}B&&$e();function W(e){if(e.children)for(let t of e.children){if(t.parent)return;t.parent=e,W(t)}}function _(e,t){if(t(e))return[e];let r=[];if(e.children)for(let n of e.children)r=[...r,..._(n,t)];return r}async function oe(e,t){if(await t(e))return[e];let r=[];if(e.children)for(let n of e.children)r=[...r,...await oe(n,t)];return r}async function V(e,t){if(e.children){let r=e.children.slice();for(let n of r){let o=await t(n);if(o!==void 0){let s=e.children.indexOf(n);o?e.children.splice(s,1,o):e.children.splice(s,1)}else await V(n,t)}}}function Y(e,t){return _(e,r=>r.type===t)[0]}function se(e,t){_(e,t)}async function ae(e,t){await oe(e,t)}function T(e){if(!e)return"";let t=[];if(e.text!==void 0)return e.text;for(let r of e.children)t.push(T(r));return t.join("")}function k(e){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(k);let t={};for(let r of Object.keys(e)){let n=r.split("."),o=t;for(let s=0;s<n.length-1;s++){let i=n[s];o[i]||(o[i]={}),o=o[i]}o[n[n.length-1]]=k(e[r])}return t}var c={};A(c,{confirm:()=>ut,dispatch:()=>dt,downloadFile:()=>tt,filterBox:()=>ot,flashNotification:()=>nt,fold:()=>yt,foldAll:()=>wt,getCurrentPage:()=>De,getCursor:()=>Be,getSelection:()=>We,getText:()=>Ge,getUiOption:()=>ft,goHistory:()=>et,hidePanel:()=>at,insertAtCursor:()=>mt,insertAtPos:()=>it,moveCursor:()=>lt,navigate:()=>Ye,openCommandPalette:()=>He,openPageNavigator:()=>ze,openSearchPanel:()=>vt,openUrl:()=>Ze,prompt:()=>pt,reloadPage:()=>Je,reloadSettingsAndCommands:()=>Xe,reloadUI:()=>Qe,replaceRange:()=>ct,save:()=>Ve,setPage:()=>qe,setSelection:()=>_e,setText:()=>je,setUiOption:()=>gt,showPanel:()=>st,toggleFold:()=>Pt,unfold:()=>xt,unfoldAll:()=>At,uploadFile:()=>rt,vimEx:()=>ht});typeof self>"u"&&(self={syscall:()=>{throw new Error("Not implemented here")}});var a=globalThis.syscall;function De(){return a("editor.getCurrentPage")}function qe(e){return a("editor.setPage",e)}function Ge(){return a("editor.getText")}function je(e){return a("editor.setText",e)}function Be(){return a("editor.getCursor")}function We(){return a("editor.getSelection")}function _e(e,t){return a("editor.setSelection",e,t)}function Ve(){return a("editor.save")}function Ye(e,t=!1,r=!1){return a("editor.navigate",e,t,r)}function ze(e="page"){return a("editor.openPageNavigator",e)}function He(){return a("editor.openCommandPalette")}function Je(){return a("editor.reloadPage")}function Qe(){return a("editor.reloadUI")}function Xe(){return a("editor.reloadSettingsAndCommands")}function Ze(e,t=!1){return a("editor.openUrl",e,t)}function et(e){return a("editor.goHistory",e)}function tt(e,t){return a("editor.downloadFile",e,t)}function rt(e,t){return a("editor.uploadFile",e,t)}function nt(e,t="info"){return a("editor.flashNotification",e,t)}function ot(e,t,r="",n=""){return a("editor.filterBox",e,t,r,n)}function st(e,t,r,n=""){return a("editor.showPanel",e,t,r,n)}function at(e){return a("editor.hidePanel",e)}function it(e,t){return a("editor.insertAtPos",e,t)}function ct(e,t,r){return a("editor.replaceRange",e,t,r)}function lt(e,t=!1){return a("editor.moveCursor",e,t)}function mt(e){return a("editor.insertAtCursor",e)}function dt(e){return a("editor.dispatch",e)}function pt(e,t=""){return a("editor.prompt",e,t)}function ut(e){return a("editor.confirm",e)}function ft(e){return a("editor.getUiOption",e)}function gt(e,t){return a("editor.setUiOption",e,t)}function ht(e){return a("editor.vimEx",e)}function yt(){return a("editor.fold")}function xt(){return a("editor.unfold")}function Pt(){return a("editor.toggleFold")}function wt(){return a("editor.foldAll")}function At(){return a("editor.unfoldAll")}function vt(){return a("editor.openSearchPanel")}var P={};A(P,{parseMarkdown:()=>St});function St(e){return a("markdown.parseMarkdown",e)}var g={};A(g,{deleteAttachment:()=>Ut,deleteFile:()=>Dt,deletePage:()=>Mt,getAttachmentMeta:()=>Ot,getFileMeta:()=>Rt,getPageMeta:()=>Tt,listAttachments:()=>Nt,listFiles:()=>Lt,listPages:()=>bt,listPlugs:()=>Et,readAttachment:()=>kt,readFile:()=>Kt,readPage:()=>Ct,writeAttachment:()=>Ft,writeFile:()=>$t,writePage:()=>It});function bt(e=!1){return a("space.listPages",e)}function Tt(e){return a("space.getPageMeta",e)}function Ct(e){return a("space.readPage",e)}function It(e,t){return a("space.writePage",e,t)}function Mt(e){return a("space.deletePage",e)}function Et(){return a("space.listPlugs")}function Nt(){return a("space.listAttachments")}function Ot(e){return a("space.getAttachmentMeta",e)}function kt(e){return a("space.readAttachment",e)}function Ft(e,t){return a("space.writeAttachment",e,t)}function Ut(e){return a("space.deleteAttachment",e)}function Lt(){return a("space.listFiles")}function Kt(e){return a("space.readFile",e)}function Rt(e){return a("space.getFileMeta",e)}function $t(e,t){return a("space.writeFile",e,t)}function Dt(e){return a("space.deleteFile",e)}var F={};A(F,{getEnv:()=>_t,getMode:()=>Vt,getVersion:()=>Yt,invokeCommand:()=>Gt,invokeFunction:()=>qt,listCommands:()=>jt,listSyscalls:()=>Bt,reloadPlugs:()=>Wt});function qt(e,...t){return a("system.invokeFunction",e,...t)}function Gt(e,t){return a("system.invokeCommand",e,t)}function jt(){return a("system.listCommands")}function Bt(){return a("system.listSyscalls")}function Wt(){a("system.reloadPlugs")}function _t(){return a("system.getEnv")}function Vt(){return a("system.getMode")}function Yt(){return a("system.getVersion")}var v={};A(v,{del:()=>Jt,get:()=>Ht,set:()=>zt});function zt(e,t){return a("clientStore.set",e,t)}function Ht(e){return a("clientStore.get",e)}function Jt(e){return a("clientStore.delete",e)}var E={};A(E,{parseTemplate:()=>tr,renderTemplate:()=>er});function er(e,t,r={}){return a("template.renderTemplate",e,t,r)}function tr(e){return a("template.parseTemplate",e)}var h={};A(h,{parse:()=>ar,stringify:()=>ir});function ar(e){return a("yaml.parse",e)}function ir(e){return a("yaml.stringify",e)}async function C(e,t={}){let r={tags:[]},n=[];return W(e),await V(e,async o=>{if(o.type==="Paragraph"&&o.parent?.type==="Document"){let s=!0,i=new Set;for(let l of o.children)if(l.text){if(l.text.startsWith(`
`)&&l.text!==`
`)break;if(l.text.trim()){s=!1;break}}else if(l.type==="Hashtag"){let m=l.children[0].text.substring(1);i.add(m),(t.removeTags===!0||t.removeTags?.includes(m))&&(l.children[0].text="")}else if(l.type){s=!1;break}s&&n.push(...i)}if(o.type==="FrontMatter"){let s=o.children[1].children[0],i=T(s);try{let l=await h.parse(i),m={...l};if(r={...r,...l},r.tags||(r.tags=[]),typeof r.tags=="string"&&n.push(...r.tags.split(/,\s*|\s+/)),Array.isArray(r.tags)&&n.push(...r.tags),t.removeKeys&&t.removeKeys.length>0){let p=!1;for(let u of t.removeKeys)u in m&&(delete m[u],p=!0);p&&(s.text=await h.stringify(m))}if(Object.keys(m).length===0||t.removeFrontmatterSection)return null}catch(l){console.warn("Could not parse frontmatter",l.message)}}}),r.tags=[...new Set([...n.map(o=>o.replace(/^#/,""))])],r=k(r),r}async function ie(e,t){let r=null;if(await ae(e,async n=>{if(n.type==="FrontMatter"){let o=n.children[1].children[0],s=T(o);try{let i="";if(typeof t=="string")i=s+t+`
`;else{let m={...await h.parse(s),...t};i=await h.stringify(m)}r={changes:{from:o.from,to:o.to,insert:i}}}catch(i){console.error("Error parsing YAML",i)}return!0}return!1}),!r){let n="";typeof t=="string"?n=t+`
`:n=await h.stringify(t),r={changes:{from:0,to:0,insert:`---
`+n+`---
`}}}return r}var U=class{constructor(t,r={}){this.maxSize=t;this.map=new Map(Object.entries(r))}map;set(t,r,n){let o={value:r,la:Date.now()};if(n){let s=this.map.get(t);s?.expTimer&&clearTimeout(s.expTimer),o.expTimer=setTimeout(()=>{this.map.delete(t)},n)}if(this.map.size>=this.maxSize){let s=this.getOldestKey();this.map.delete(s)}this.map.set(t,o)}get(t){let r=this.map.get(t);if(r)return r.la=Date.now(),r.value}remove(t){this.map.delete(t)}toJSON(){return Object.fromEntries(this.map.entries())}getOldestKey(){let t,r;for(let[n,o]of this.map.entries())(!r||o.la<r)&&(t=n,r=o.la);return t}};var ce=new U(50);async function le(e,t,r){if(!r)return t(e);let n=JSON.stringify(e),o=ce.get(n);if(o)return o;let s=await t(e);return ce.set(n,s,r*1e3),s}function z(e,t,r){return le(t,()=>F.invokeFunction("index.queryObjects",e,t),r)}async function me(e,t={},r={}){try{let n=await P.parseMarkdown(e),o=await C(n,{removeFrontmatterSection:!0,removeTags:["template"]});e=T(n).trimStart();let s;return o.frontmatter&&(typeof o.frontmatter=="string"?s=o.frontmatter:s=await h.stringify(o.frontmatter),s=await E.renderTemplate(s,t,r)),{frontmatter:o,renderedFrontmatter:s,text:await E.renderTemplate(e,t,r)}}catch(n){throw console.error("Error rendering template",n),n}}async function mr(){let e=await c.getSelection(),t="";return e.from===e.to?t="":t=(await c.getText()).slice(e.from,e.to),{from:e.from,to:e.to,text:t}}async function L(){let e=await mr(),t=await c.getText();if(e.text==="")return{from:0,to:t.length,text:t,isWholeNote:!0};let r=e.from===0&&e.to===t.length;return{...e,isWholeNote:r}}async function I(){return(await c.getText()).length}async function dr(e,t){let r=await g.readPage(e),n=await P.parseMarkdown(r),o;return se(n,s=>{if(s.type!=="FencedCode")return!1;let i=Y(s,"CodeInfo");if(t&&!i||t&&!t.includes(i.children[0].text))return!1;let l=Y(s,"CodeText");return l?(o=l.children[0].text,!0):!1}),o}async function K(e,t=["yaml"]){let r=await dr(e,t);if(r!==void 0)try{return h.parse(r)}catch(n){throw console.error("YAML Page parser error",n),new Error(`YAML Error: ${n.message}`)}}async function H(e){try{let r=(await K("SECRETS",["yaml","secrets"]))[e];if(r===void 0)throw new Error(`No such secret: ${e}`);return r}catch(t){throw t.message==="Not found"?new Error(`No such secret: ${e}`):t}}var pr="SETTINGS";async function de(e,t){try{let n=(await K(pr,["yaml"])||{})[e];return n===void 0?t:n}catch(r){if(r.message==="Not found")return t;throw r}}var M=class{name;apiKey;baseUrl;modelName;constructor(t,r,n,o){this.name=t,this.apiKey=r,this.baseUrl=n,this.modelName=o,console.log(`New AI Provider initialized: ${this.name}, Base URL: ${this.baseUrl}, Model Name: ${this.modelName}`)}async streamChatIntoEditor(t,r){let{onDataReceived:n}=t,o="\u{1F914} Thinking \u2026 ",s=r??await I();await c.insertAtPos(o,s);let i=!0,l=m=>{try{if(!m){console.log("No data received from LLM");return}i?(["`","-","*"].includes(m.charAt(0))&&(console.log("First character of response is:",m.charAt(0)),m=`
`+m),c.replaceRange(s,s+o.length,m),i=!1):c.insertAtPos(m,s),s+=m.length,n&&n(m)}catch(p){console.error("Error handling chat stream data:",p),c.flashNotification("An error occurred while processing chat data.","error")}};await this.chatWithAI({...t,onDataReceived:l})}},R=class{apiKey;baseUrl;name;modelName;requireAuth;constructor(t,r,n,o,s=!0){this.apiKey=t,this.baseUrl=r,this.name=n,this.modelName=o,this.requireAuth=s}};var $=class extends R{constructor(t,r,n){super(t,n,"DALL-E",r)}async generateImage(t){try{y||await S();let r=await nativeFetch(`${this.baseUrl}/images/generations`,{method:"POST",headers:{Authorization:`Bearer ${this.apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({model:this.modelName,prompt:t.prompt,n:t.numImages,size:t.size,quality:t.quality,response_format:"b64_json"})});if(!r.ok)throw new Error(`HTTP error, status: ${r.status}`);let n=await r.json();if(!n||n.length===0)throw new Error("Invalid response from DALL-E.");return n}catch(r){throw console.error("Error calling DALL\xB7E image generation endpoint:",r),r}}};var b=function(e,t){if(!(this instanceof b))return new b(e,t);this.INITIALIZING=-1,this.CONNECTING=0,this.OPEN=1,this.CLOSED=2,this.url=e,t=t||{},this.headers=t.headers||{},this.payload=t.payload!==void 0?t.payload:"",this.method=t.method||this.payload&&"POST"||"GET",this.withCredentials=!!t.withCredentials,this.debug=!!t.debug,this.FIELD_SEPARATOR=":",this.listeners={},this.xhr=null,this.readyState=this.INITIALIZING,this.progress=0,this.chunk="",this.addEventListener=function(r,n){this.listeners[r]===void 0&&(this.listeners[r]=[]),this.listeners[r].indexOf(n)===-1&&this.listeners[r].push(n)},this.removeEventListener=function(r,n){if(this.listeners[r]!==void 0){var o=[];this.listeners[r].forEach(function(s){s!==n&&o.push(s)}),o.length===0?delete this.listeners[r]:this.listeners[r]=o}},this.dispatchEvent=function(r){if(!r)return!0;this.debug&&console.debug(r),r.source=this;var n="on"+r.type;return this.hasOwnProperty(n)&&(this[n].call(this,r),r.defaultPrevented)?!1:this.listeners[r.type]?this.listeners[r.type].every(function(o){return o(r),!r.defaultPrevented}):!0},this._setReadyState=function(r){var n=new CustomEvent("readystatechange");n.readyState=r,this.readyState=r,this.dispatchEvent(n)},this._onStreamFailure=function(r){var n=new CustomEvent("error");n.data=r.currentTarget.response,this.dispatchEvent(n),this.close()},this._onStreamAbort=function(r){this.dispatchEvent(new CustomEvent("abort")),this.close()},this._onStreamProgress=function(r){if(this.xhr){if(this.xhr.status!==200){this._onStreamFailure(r);return}this.readyState==this.CONNECTING&&(this.dispatchEvent(new CustomEvent("open")),this._setReadyState(this.OPEN));var n=this.xhr.responseText.substring(this.progress);this.progress+=n.length;var o=(this.chunk+n).split(/(\r\n\r\n|\r\r|\n\n)/g),s=o.pop();o.forEach(function(i){i.trim().length>0&&this.dispatchEvent(this._parseEventChunk(i))}.bind(this)),this.chunk=s}},this._onStreamLoaded=function(r){this._onStreamProgress(r),this.dispatchEvent(this._parseEventChunk(this.chunk)),this.chunk=""},this._parseEventChunk=function(r){if(!r||r.length===0)return null;this.debug&&console.debug(r);var n={id:null,retry:null,data:null,event:null};r.split(/\n|\r\n|\r/).forEach(function(s){var i=s.indexOf(this.FIELD_SEPARATOR),l,m;if(i>0){var p=s[i+1]===" "?2:1;l=s.substring(0,i),m=s.substring(i+p)}else if(i<0)l=s,m="";else return;l in n&&(l==="data"&&n[l]!==null?n.data+=`
`+m:n[l]=m)}.bind(this));var o=new CustomEvent(n.event||"message");return o.data=n.data||"",o.id=n.id,o},this._checkStreamClosed=function(){this.xhr&&this.xhr.readyState===XMLHttpRequest.DONE&&this._setReadyState(this.CLOSED)},this.stream=function(){if(!this.xhr){this._setReadyState(this.CONNECTING),this.xhr=new XMLHttpRequest,this.xhr.addEventListener("progress",this._onStreamProgress.bind(this)),this.xhr.addEventListener("load",this._onStreamLoaded.bind(this)),this.xhr.addEventListener("readystatechange",this._checkStreamClosed.bind(this)),this.xhr.addEventListener("error",this._onStreamFailure.bind(this)),this.xhr.addEventListener("abort",this._onStreamAbort.bind(this)),this.xhr.open(this.method,this.url);for(var r in this.headers)this.xhr.setRequestHeader(r,this.headers[r]);this.xhr.withCredentials=this.withCredentials,this.xhr.send(this.payload)}},this.close=function(){this.readyState!==this.CLOSED&&(this.xhr.abort(),this.xhr=null,this._setReadyState(this.CLOSED))},(t.start===void 0||t.start)&&this.stream()};typeof exports<"u"&&(exports.SSE=b);var D=class extends M{name="Gemini";constructor(t,r){super("Gemini",t,"https://generativelanguage.googleapis.com",r)}async listModels(){let t=`${this.baseUrl}/v1beta/models?key=${this.apiKey}`;try{let r=await fetch(t);if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);return(await r.json()).models||[]}catch(r){throw console.error("Failed to fetch models:",r),r}}async chatWithAI({messages:t,stream:r,onDataReceived:n}){return r?await this.streamChat({messages:t,stream:r,onDataReceived:n}):await this.nonStreamingChat(t)}mapRolesForGemini(t){let r=[],n="";return t.forEach(o=>{let s="user";o.role==="system"||o.role==="user"?s="user":o.role==="assistant"&&(s="model"),s==="model"&&(r.length===0||n==="model")||(s==="user"&&n==="user"?r[r.length-1].parts[0].text+=" "+o.content:r.push({role:s,parts:[{text:o.content}]})),n=s}),r}streamChat(t){let{messages:r,onDataReceived:n}=t;try{let o=`${this.baseUrl}/v1beta/models/${this.modelName}:streamGenerateContent?key=${this.apiKey}&alt=sse`,s={"Content-Type":"application/json"},i=this.mapRolesForGemini(r),l={method:"POST",headers:s,payload:JSON.stringify({contents:i}),withCredentials:!1},m=new b(o,l),p="";m.addEventListener("message",u=>{try{if(u.data=="[DONE]")return m.close(),p;if(!u.data)console.error("Received empty message from Gemini"),console.log("source: ",m);else{let f=JSON.parse(u.data),te=f.candidates[0].content.parts[0].text||f.text||"";p+=te,n&&n(te)}}catch(f){console.error("Error processing message event:",f,u.data)}}),m.addEventListener("end",()=>(m.close(),p)),m.addEventListener("error",u=>{console.error("SSE error:",u),m.close()}),m.stream()}catch(o){throw console.error("Error streaming from Gemini chat endpoint:",o),o}}async nonStreamingChat(t){let r=this.mapRolesForGemini(t),n=await nativeFetch(`${this.baseUrl}/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:r})});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);return(await n.json()).candidates[0].content.parts[0].text}};var q=class extends M{name="OpenAI";requireAuth;constructor(t,r,n,o){super("OpenAI",t,n,r),this.requireAuth=o}async chatWithAI({messages:t,stream:r,onDataReceived:n}){return r?await this.streamChat({messages:t,onDataReceived:n}):await this.nonStreamingChat(t)}async streamChat(t){let{messages:r,onDataReceived:n}=t;try{let o=`${this.baseUrl}/chat/completions`,s={"Content-Type":"application/json"};this.requireAuth&&(s.Authorization=`Bearer ${this.apiKey}`);let i={method:"POST",headers:s,payload:JSON.stringify({model:this.modelName,stream:!0,messages:r}),withCredentials:!1},l=new b(o,i),m="";l.addEventListener("message",function(p){try{if(p.data=="[DONE]")return l.close(),m;{let f=JSON.parse(p.data).choices[0]?.delta?.content||"";m+=f,n&&n(f)}}catch(u){console.error("Error processing message event:",u,p.data)}}),l.addEventListener("end",function(){return l.close(),m}),l.addEventListener("error",p=>{console.error("SSE error:",p),l.close()}),l.stream()}catch(o){throw console.error("Error streaming from OpenAI chat endpoint:",o),await c.flashNotification("Error streaming from OpenAI chat endpoint.","error"),o}return""}async nonStreamingChat(t){try{let r=JSON.stringify({model:this.modelName,messages:t}),n={Authorization:`Bearer ${this.apiKey}`,"Content-Type":"application/json"},o=await nativeFetch(this.baseUrl+"/chat/completions",{method:"POST",headers:n,body:r});if(!o.ok)throw console.error("http response: ",o),console.error("http response body: ",await o.json()),new Error(`HTTP error, status: ${o.status}`);let s=await o.json();if(!s||!s.choices||s.choices.length===0)throw new Error("Invalid response from OpenAI.");return s.choices[0].message.content}catch(r){throw console.error("Error calling OpenAI chat endpoint:",r),await c.flashNotification("Error calling OpenAI chat endpoint.","error"),r}}};var y,d,N,x,Q,J,ur;async function w(){let e=await pe();(!y||!x||!d||!J||JSON.stringify(e)!==JSON.stringify(J))&&await S(!0)}async function pe(){try{return await v.get("ai.selectedTextModel")}catch{return}}async function fr(){try{return await v.get("ai.selectedImageModel")}catch{return}}async function ue(e){await v.set("ai.selectedImageModel",e)}async function X(e){await v.set("ai.selectedTextModel",e)}async function gr(){let e=await pe()||d.textModels[0];if(!e)throw new Error("No text model selected or available as default.");await Z(e)}async function hr(){let e=await fr()||d.imageModels[0];if(!e)throw new Error("No image model selected or available as default.");await ee(e)}function yr(e){let t=e.provider.toLowerCase();switch(console.log("Provider name",t),t){case"dalle":Q=new $(y,e.modelName,e.baseUrl||d.dallEBaseUrl);break;default:throw new Error(`Unsupported image provider: ${e.provider}. Please configure a supported provider.`)}}function xr(e){switch(e.provider.toLowerCase()){case"openai":x=new q(y,e.modelName,e.baseUrl||d.openAIBaseUrl,e.requireAuth||d.requireAuth);break;case"gemini":x=new D(y,e.modelName);break;default:throw new Error(`Unsupported AI provider: ${e.provider}. Please configure a supported provider.`)}}async function Z(e){if(console.log("configureSelectedModel called with:",e),!e)throw new Error("No model provided to configure");if(e.requireAuth===void 0&&(e.requireAuth=d.requireAuth),e.requireAuth){let t=await H(e.secretName||"OPENAI_API_KEY");t!==y&&(y=t,console.log("API key updated"))}if(e.requireAuth&&!y)throw new Error("AI API key is missing. Please set it in the secrets page.");J=e,xr(e)}async function ee(e){if(console.log("configureSelectedImageModel called with:",e),!e)throw new Error("No image model provided to configure");if(e.requireAuth){let t=await H(e.secretName||"OPENAI_API_KEY");t!==y&&(y=t,console.log("API key updated for image model"))}if(e.requireAuth&&!y)throw new Error("AI API key is missing for image model. Please set it in the secrets page.");ur=e,yr(e)}async function Pr(){let e={defaultTextModel:"gpt-3.5-turbo",openAIBaseUrl:"https://api.openai.com/v1",dallEBaseUrl:"https://api.openai.com/v1",requireAuth:!0,secretName:"OPENAI_API_KEY",provider:"OpenAI",chat:{}},t={userInformation:"",userInstructions:"",parseWikiLinks:!0},r=await de("ai",{});r.defaultTextModel?r.backwardsCompat=!0:r.backwardsCompat=!1;let n={...e,...r};return n.chat={...t,...r.chat||{}},n}async function S(e=!0){let t=await Pr(),r="";if(!t.textModels&&t.defaultTextModel?(t.textModels=[{name:"default",description:"Default model",modelName:t.defaultTextModel,provider:t.provider,secretName:t.secretName}],await X(t.textModels[0])):t.textModels.length>0&&t.backwardsCompat?r="Both textModels and defaultTextModel found in ai settings. Please remove defaultTextModel.":!t.textModels&&!t.defaultTextModel&&(r="No textModels found in ai settings"),r!=="")throw console.error(r),new Error(r);JSON.stringify(d)!==JSON.stringify(t)?(console.log("aiSettings updating from",d),d=t,console.log("aiSettings updated to",d)):console.log("aiSettings unchanged",d),e&&(await gr(),d.imageModels&&d.imageModels.length>0&&await hr()),N={role:"system",content:"This is an interactive chat session with a user in a markdown-based note-taking tool called SilverBullet."},d.chat.userInformation&&(N.content+=`
The user has provided the following information about their self: ${d.chat.userInformation}`),d.chat.userInstructions&&(N.content+=`
The user has provided the following instructions for the chat, follow them as closely as possible: ${d.chat.userInstructions}`)}function fe(e){return e.split("/").slice(0,-1).join("/")}async function ge(){let t=(await c.getText()).split(`
`),r=[],n="user",o="";return t.forEach(s=>{let i=s.match(/^\*\*(\w+)\*\*:/);if(i){let l=i[1].toLowerCase();n&&n!==l&&(r.push({role:n,content:o.trim()}),o=""),n=l,o+=s.replace(/^\*\*(\w+)\*\*:/,"").trim()+`
`}else n&&(o+=s.trim()+`
`)}),o&&n&&r.push({role:n,content:o.trim()}),r}async function he(){try{let e=await syscall("system.getVersion"),[t,r,n]=e.split(".").map(Number),[o,s,i]="0.7.2".split(".").map(Number);return t>o||t===o&&r>s||t===o&&r===s&&n>=i}catch{return!1}}async function ye(e){let t=[];for(let r of e){let n=r.content;if(r.role==="assistant"){t.push(r);continue}d.chat.parseWikiLinks&&(n=await wr(n)),t.push({...r,content:n})}return t}async function wr(e){let t=[],r=e,n=/\[\[([^\]]+)\]\]/g,o,s=!1;for(;(o=n.exec(e))!==null;){let i=o[1];if(!t.includes(i)){s||(r+=`

Base your answer on the content of the following referenced pages (referenced above using the [[page name]] format). In these listings ~~~ is used to mark the page's content start and end. If context is missing, always ask me to link directly to a page mentioned in the context if.`,s=!0);try{let l=await g.readPage(i);t.push(i),r+=`

Content of the [[${i}]] page:
~~~
${l}
~~~
`}catch(l){console.error(`Error fetching page '${i}':`,l)}}}return r}async function xe(e){return he()?{options:(await z("template",{filter:["attr",["attr","aiprompt"],"slashCommand"]},5)).map(r=>{let n=r.aiprompt;return console.log("ai prompt template: ",n),{label:n.slashCommand,detail:n.description||r.description,order:n.order||0,templatePage:r.ref,pageName:e.pageName,invoke:"silverbullet-ai.insertAiPromptFromTemplate"}})}:void 0}async function Pe(e){let t;if(!e||!e.templatePage){let p=await z("template",{filter:["attr",["attr","aiprompt"],"description"]});t=await c.filterBox("Prompt Template",p.map(u=>{let f=u.ref.split("/").pop();return{...u,description:u.aiprompt.description||u.ref,name:u.aiprompt.displayName||f,systemPrompt:u.aiprompt.systemPrompt||"You are an AI note assistant. Please follow the prompt instructions.",insertAt:u.aiprompt.insertAt||"cursor"}}),"Select the template to use as the prompt.  The prompt will be rendered and sent to the LLM model.")}else{console.log("selectedTemplate from slash completion: ",e);let p=await g.readPage(e.templatePage),u=await P.parseMarkdown(p),{aiprompt:f}=await C(u);console.log("templatePage from slash completion: ",p),t={ref:e.templatePage,systemPrompt:f.systemPrompt||f.system||"You are an AI note assistant. Please follow the prompt instructions.",insertAt:f.insertAt||"cursor"}}if(!t){await c.flashNotification("No template selected");return}console.log("User selected prompt template: ",t);let r=["cursor","page-start","page-end"];if(!r.includes(t.insertAt)){console.error(`Invalid insertAt value: ${t.insertAt}. It must be one of ${r.join(", ")}`),await c.flashNotification(`Invalid insertAt value: ${t.insertAt}. Please select a valid option.`,"error");return}await w();let n,o,s;try{n=await g.readPage(t.ref),o=await c.getCurrentPage(),s=await g.getPageMeta(o)}catch(p){console.error("Error fetching template details or page metadata",p),await c.flashNotification("Error fetching template details or page metadata","error");return}let i;switch(t.insertAt){case"page-start":i=0;break;case"page-end":i=await I();break;case"frontmatter":await c.flashNotification("rendering in frontmatter not supported yet","error");break;case"modal":break;case"replace":break;case"cursor":default:i=await c.getCursor()}console.log("templatetext: ",n);let l=await me(n,s,{page:s});console.log("Rendered template:",l);let m=[{role:"user",content:l.text}];t.systemPrompt&&m.unshift({role:"system",content:t.systemPrompt}),await x.streamChatIntoEditor({messages:m,stream:!0},i)}var no=new TextEncoder;function we(e){let t=atob(e),r=t.length,n=new Uint8Array(r);for(let o=0;o<r;o++)n[o]=t.charCodeAt(o);return n}async function Ae(e){(e==="SETTINGS"||e==="SECRETS")&&await S(!0)}async function ve(){(!d||!d.textModels)&&await S(!1);let e=d.textModels.map(n=>({...n,name:n.name,description:n.description||`${n.modelName} on ${n.provider}`})),t=await c.filterBox("Select a model",e);if(!t){await c.flashNotification("No model selected.","error");return}let r=t.name;await X(t),await Z(t),await c.flashNotification(`Selected model: ${r}`),console.log("Selected model:",t)}async function Se(){(!d||!d.imageModels)&&await S(!1);let e=d.imageModels.map(n=>({...n,name:n.name,description:n.description||`${n.modelName} on ${n.provider}`})),t=await c.filterBox("Select an image model",e);if(!t){await c.flashNotification("No image model selected.","error");return}let r=t.name;await ue(t),await ee(t),await c.flashNotification(`Selected image model: ${r}`),console.log("Selected image model:",t)}async function be(){await w();let e=await L(),t=await c.prompt("Please enter a prompt to send to the LLM. Selected text or the entire note will also be sent as context."),r=await c.getCurrentPage(),n=new Date,o=n.toISOString().split("T")[0],s=n.toLocaleDateString("en-US",{weekday:"long"});await x.streamChatIntoEditor({messages:[{role:"system",content:"You are an AI note assistant.  Follow all user instructions and use the note context and note content to help follow those instructions.  Use Markdown for any formatting."},{role:"user",content:`Note Context: Today is ${s}, ${o}. The current note name is "${r}".
User Prompt: ${t}
Note Content:
${e.text}`}],stream:!0},e.to)}async function Te(){await w();let e=await L();if(console.log("selectedTextInfo",e),e.text.length>0){let t=await c.getCurrentPage(),r=await x.chatWithAI({messages:[{role:"user",content:`Please summarize this note using markdown for any formatting. Your summary will be appended to the end of this note, do not include any of the note contents yourself. Keep the summary brief. The note name is ${t}.

${e.text}`}],stream:!1});return console.log("OpenAI response:",r),{summary:r,selectedTextInfo:e}}return{summary:"",selectedTextInfo:null}}async function Ce(){let{summary:e,selectedTextInfo:t}=await Te();e&&t&&await c.insertAtPos(`

`+e,t.to)}async function Ie(){let{summary:e}=await Te();e?await c.showPanel("rhs",2,e):await c.flashNotification("No summary available.")}async function Me(){await w();let e=await c.getText(),t=await c.getCurrentPage(),n=(await x.chatWithAI({messages:[{role:"system",content:"You are an AI tagging assistant. Please provide a short list of tags, separated by spaces. Only return tags and no other content. Tags must be one word only and lowercase.  Suggest tags sparingly, do not treat them as keywords."},{role:"user",content:`Given the note titled "${t}" with the content below, please provide tags.

${e}`}],stream:!1})).trim().replace(/,/g,"").split(/\s+/),o=await P.parseMarkdown(e),s=await C(o),i=[...new Set([...s.tags||[],...n])];s.tags=i,console.log("Current frontmatter:",s);let l=await ie(o,s);console.log("updatedNoteContent",l),await c.dispatch(l),await c.flashNotification("Note tagged successfully.")}async function Ee(){let e=await L(),t=e.to;await x.streamChatIntoEditor({messages:[{role:"system",content:"You are an AI note assistant in a markdown-based note tool."},{role:"user",content:e.text}],stream:!0},t)}async function Ne(){await w();let e=await ge();if(e.length===0){await c.flashNotification("Error: The page does not match the required format for a chat.");return}e.unshift(N);let t=await ye(e);console.log("enrichedMessages",t);let r=await I();await c.insertAtPos(`

**assistant**: `,r),r+=17,await c.insertAtPos(`

**user**: `,r),await c.moveCursor(r+12);try{await x.streamChatIntoEditor({messages:t,stream:!0},r)}catch(n){console.error("Error streaming chat on page:",n),await c.flashNotification("Error streaming chat on page.","error")}}async function Oe(){await w();try{let e=await c.prompt("Enter a prompt for DALL\xB7E:");if(!e||!e.trim()){await c.flashNotification("No prompt entered. Operation cancelled.","error");return}let t={prompt:e,numImages:1,size:"1024x1024",quality:"hd"},r=await Q.generateImage(t);if(r&&r.data&&r.data.length>0){let n=r.data[0].b64_json,o=r.data[0].revised_prompt,s=new Uint8Array(we(n)),i=`dall-e-${Date.now()}.png`,l=fe(await c.getCurrentPage())+"/";l==="/"&&(l=""),await g.writeAttachment(l+i,s);let m=`![${i}](${i})
*${o}*`;await c.insertAtCursor(m),await c.flashNotification("Image generated and inserted with caption successfully.")}else await c.flashNotification("Failed to generate image.","error")}catch(e){console.error("Error generating image with DALL\xB7E:",e),await c.flashNotification("Error generating image.","error")}}async function ke(e,t){try{await w();let r=[];return r.push({role:"system",content:t||"You are an AI note assistant helping to render content for a note.  Please follow user instructions and keep your response short and concise."}),r.push({role:"user",content:e}),await x.chatWithAI({messages:r,stream:!1})}catch(r){throw console.error("Error querying OpenAI:",r),r}}var Fe={aiPromptSlashCommplete:xe,queryOpenAI:ke,reloadConfig:Ae,summarizeNote:Ie,insertSummary:Ce,callOpenAI:be,tagNoteWithAI:Me,promptAndGenerateImage:Oe,streamOpenAIWithSelectionAsPrompt:Ee,streamChatOnPage:Ne,insertAiPromptFromTemplate:Pe,selectTextModel:ve,selectImageModel:Se},Ue={name:"silverbullet-ai",requiredPermissions:["fetch"],functions:{aiPromptSlashCommplete:{path:"src/prompts.ts:aiPromptSlashComplete",events:["slash:complete"]},queryOpenAI:{path:"sbai.ts:queryOpenAI"},reloadConfig:{path:"sbai.ts:reloadConfig",events:["page:saved"]},summarizeNote:{path:"sbai.ts:openSummaryPanel",command:{name:"AI: Summarize Note and open summary"}},insertSummary:{path:"sbai.ts:insertSummary",command:{name:"AI: Insert Summary"}},callOpenAI:{path:"sbai.ts:callOpenAIwithNote",command:{name:"AI: Call OpenAI with Note as context"}},tagNoteWithAI:{path:"sbai.ts:tagNoteWithAI",command:{name:"AI: Generate tags for note"}},promptAndGenerateImage:{path:"sbai.ts:promptAndGenerateImage",command:{name:"AI: Generate and insert image using DallE"}},streamOpenAIWithSelectionAsPrompt:{path:"sbai.ts:streamOpenAIWithSelectionAsPrompt",command:{name:"AI: Stream response with selection or note as prompt"}},streamChatOnPage:{path:"sbai.ts:streamChatOnPage",command:{name:"AI: Chat on current page",key:"Ctrl-Shift-Enter",mac:"Cmd-Shift-Enter"}},insertAiPromptFromTemplate:{path:"src/prompts.ts:insertAiPromptFromTemplate",command:{name:"AI: Execute AI Prompt from Custom Template"}},selectTextModel:{path:"sbai.ts:selectModelFromConfig",command:{name:"AI: Select Text Model from Config"}},selectImageModel:{path:"sbai.ts:selectImageModelFromConfig",command:{name:"AI: Select Image Model from Config"}}},assets:{}},Fo={manifest:Ue,functionMapping:Fe};re(Fe,Ue);export{Fo as plug};
