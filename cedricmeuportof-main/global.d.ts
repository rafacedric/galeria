/// <reference types="vite/client" />

declare module '*.mp4' {
    const src: string;
    export default src;
  }
  
  interface ImportMetaEnv {
    readonly GEMINI_API_KEY: string;
    // Add other custom env variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }