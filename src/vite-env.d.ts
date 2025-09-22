/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLATFORM: string
  readonly VITE_IS_TAURI: string
  readonly VITE_IS_DEBUG: string
  // add other custom env vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
