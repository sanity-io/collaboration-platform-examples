// Values from `.env`, which `node --env-file=.env` loads into `process.env`.
function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Set ${name} in .env (see .env.example).`)
  }
  return value
}

export const config = {
  projectId: required('SANITY_PROJECT_ID'),
  dataset: required('SANITY_DATASET'),
  token: required('SANITY_API_TOKEN'),
  documentId: required('SANITY_DOCUMENT_ID'),
  documentType: required('SANITY_DOCUMENT_TYPE'),
}
