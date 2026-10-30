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
    'SANITY_STUDIO_PROJECT_ID',
    process.env.SANITY_STUDIO_PROJECT_ID,
  ),
  dataset: required('SANITY_STUDIO_DATASET', process.env.SANITY_STUDIO_DATASET),
}
