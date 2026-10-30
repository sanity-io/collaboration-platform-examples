import {defineType} from 'sanity'

import {CommentableTextInput} from '../comments/CommentableTextInput'
import {CommentsField} from '../comments/CommentsField'
import {InlineCommentsPlugin} from '../comments/InlineCommentsPlugin'

// Portable Text you can comment on. It's the studio's own Portable Text
// editor with inline comments added, so the toolbar, presence, validation and
// patches all work as usual. Use it like any other type:
// `defineField({name: 'body', type: 'commentableText'})`.
export const commentableText = defineType({
  name: 'commentableText',
  title: 'Commentable text',
  type: 'array',
  of: [{type: 'block'}],
  components: {
    // Shows the field's open comment count next to its name.
    field: CommentsField,
    // Passes the field's path down to the plugin.
    input: CommentableTextInput,
    // Adds the highlights, the Comment button and the composer to the editor.
    portableText: {plugins: InlineCommentsPlugin},
  },
})
