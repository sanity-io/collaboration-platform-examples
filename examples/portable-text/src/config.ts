// Values from `.env`, compiled in at build time. Each variable is written out
// in full because the substitution is textual.
function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Set ${name} in .env (see .env.example) and restart.`)
  }
  return value
}

export const config = {
  projectId: required(
    'SANITY_APP_PROJECT_ID',
    import.meta.env.SANITY_APP_PROJECT_ID,
  ),
  dataset: required('SANITY_APP_DATASET', import.meta.env.SANITY_APP_DATASET),
  documentId: required(
    'SANITY_APP_DOCUMENT_ID',
    import.meta.env.SANITY_APP_DOCUMENT_ID,
  ),
  documentType: required(
    'SANITY_APP_DOCUMENT_TYPE',
    import.meta.env.SANITY_APP_DOCUMENT_TYPE,
  ),
  portableTextPath: required(
    'SANITY_APP_PORTABLE_TEXT_PATH',
    import.meta.env.SANITY_APP_PORTABLE_TEXT_PATH,
  ),
  // Optional: only the nested field pattern reads it.
  nestedPortableTextPath:
    import.meta.env.SANITY_APP_NESTED_PORTABLE_TEXT_PATH || undefined,
}
