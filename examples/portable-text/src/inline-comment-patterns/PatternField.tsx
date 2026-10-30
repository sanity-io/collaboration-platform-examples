// Not a guide section: the editor and value sync from "Comment on Portable
// Text", shared by the patterns here so each file only shows what its pattern
// changes. `children` renders the inline comments plugin.
import {EditorProvider} from '@portabletext/editor'
import type {PortableTextBlock} from '@portabletext/editor'
import type {DocumentHandle} from '@sanity/sdk'
import {useDocument, useEditDocument} from '@sanity/sdk-react'
import {
  type CommentThread,
  useCommentThreads,
} from '@sanity/sdk-react/collaboration'
import type {ReactNode} from 'react'

import {
  schemaDefinition,
  ValueSync,
} from '../comment-on-portable-text/BodyField'
import {RichTextEditable} from '../RichTextEditable'

export function PatternField({
  handle,
  path,
  children,
}: {
  handle: DocumentHandle
  path: string
  children: (threads: CommentThread[]) => ReactNode
}) {
  const {threads} = useCommentThreads({...handle, status: 'open'})
  const {data} = useDocument<PortableTextBlock[] | undefined, string>({
    ...handle,
    path,
  })
  const editField = useEditDocument<PortableTextBlock[] | undefined>({
    ...handle,
    path,
  })

  return (
    <EditorProvider initialConfig={{schemaDefinition, initialValue: data}}>
      <ValueSync value={data} onChange={editField} />
      <RichTextEditable />
      {children(threads)}
    </EditorProvider>
  )
}
