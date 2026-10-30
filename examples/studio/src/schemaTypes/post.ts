import {defineField, defineType} from 'sanity'

import {CommentsField} from '../comments/CommentsField'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // The panel's composer comments on `title`, so it shows a count too.
    defineField({
      name: 'title',
      type: 'string',
      components: {field: CommentsField},
    }),
    defineField({name: 'body', type: 'commentableText'}),
  ],
})
