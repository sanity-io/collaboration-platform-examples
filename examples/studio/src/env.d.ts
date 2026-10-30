// The Sanity CLI only exposes `SANITY_STUDIO_`-prefixed variables to the
// browser.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly SANITY_STUDIO_PROJECT_ID?: string
    readonly SANITY_STUDIO_DATASET?: string
  }
}
