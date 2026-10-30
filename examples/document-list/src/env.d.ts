// The Sanity CLI only exposes `SANITY_APP_`-prefixed variables to the browser.
interface ImportMetaEnv {
  readonly SANITY_APP_PROJECT_ID?: string
  readonly SANITY_APP_DATASET?: string
  readonly SANITY_APP_DOCUMENT_TYPE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
