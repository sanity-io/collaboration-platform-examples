import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {config} from './src/config'
import {defaultDocumentNode} from './src/defaultDocumentNode'
import {schemaTypes} from './src/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Collaboration studio',
  projectId: config.projectId,
  dataset: config.dataset,
  // The studio's built-in comments on the Comments API, the same comments the
  // custom view reads.
  beta: {comments: {v2: true}},
  plugins: [structureTool({defaultDocumentNode})],
  schema: {types: schemaTypes},
})
