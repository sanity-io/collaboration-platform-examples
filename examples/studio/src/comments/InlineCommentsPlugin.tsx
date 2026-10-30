import {SDKPortableTextComments} from '@sanity/collaboration/sdk'
import {useCommentThreads} from '@sanity/sdk-react/collaboration'
import {Suspense} from 'react'
import {type PortableTextPluginsProps, useFormValue} from 'sanity'

import {useFieldPath} from './CommentableTextInput'

// The editor's own plugins, plus inline comments. The studio renders this
// inside its `EditorProvider`, so the comments decorate the studio's editor
// and there's no editor or value sync of our own.
export function InlineCommentsPlugin(props: PortableTextPluginsProps) {
  return (
    <>
      {props.renderDefault(props)}
      <Suspense fallback={null}>
        <InlineComments />
      </Suspense>
    </>
  )
}

function InlineComments() {
  const path = useFieldPath()
  // The variant the form is editing (`drafts.…` while there's a draft), so a
  // new comment is written against it and re-anchored as it's edited.
  const documentId = useFormValue(['_id']) as string
  const documentType = useFormValue(['_type']) as string
  const handle = {documentId, documentType}
  const {threads} = useCommentThreads({...handle, status: 'open'})

  if (!path) return null
  return <SDKPortableTextComments {...handle} path={path} threads={threads} />
}
