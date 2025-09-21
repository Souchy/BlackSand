/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLATFORM: string
  // add other custom env vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
