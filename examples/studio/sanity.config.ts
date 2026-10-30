import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {CommentsLayout} from './src/comments/CommentsLayout'
import {commentsInspector} from './src/comments/CommentsInspector'
import {config} from './src/config'
import {schemaTypes} from './src/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Collaboration studio',
  projectId: config.projectId,
  dataset: config.dataset,
  plugins: [structureTool()],
  schema: {types: schemaTypes},
  studio: {components: {layout: CommentsLayout}},
  document: {
    // Only this example's comments UI: the studio's built-in comments (the
    // field buttons and their inspector) are off.
    comments: {enabled: false},
    // The panel goes on posts, the type with the commented `body`.
    inspectors: (prev, {documentType}) =>
      documentType === 'post' ? [...prev, commentsInspector] : prev,
  },
})
