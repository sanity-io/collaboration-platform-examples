// Values from `.env`, compiled in at build time. Each variable is written out
// in full because Next.js only inlines `process.env.NEXT_PUBLIC_*` references
// it can see literally.
function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Set ${name} in .env (see .env.example) and restart.`)
  }
  return value
}

export const config = {
  projectId: required(
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  ),
  dataset: required(
    'NEXT_PUBLIC_SANITY_DATASET',
    process.env.NEXT_PUBLIC_SANITY_DATASET,
  ),
  documentId: required(
    'NEXT_PUBLIC_SANITY_DOCUMENT_ID',
    process.env.NEXT_PUBLIC_SANITY_DOCUMENT_ID,
  ),
  documentType: required(
    'NEXT_PUBLIC_SANITY_DOCUMENT_TYPE',
    process.env.NEXT_PUBLIC_SANITY_DOCUMENT_TYPE,
  ),
}
