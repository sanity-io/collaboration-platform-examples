import type {CommentThreadData} from '@sanity/collaboration'
import {CommentBadge} from '@sanity/collaboration/ui'
import {useCommentThreads} from '@sanity/sdk-react/collaboration'
import {Suspense} from 'react'
import {
  type FieldProps,
  getPublishedId,
  pathToString,
  useFormValue,
} from 'sanity'
import {useDocumentPane} from 'sanity/structure'

import {COMMENTS_INSPECTOR} from './CommentsInspector'

// A field with the count of its open comment threads next to its name.
// Clicking the count opens the comments panel.
export function CommentsField(props: FieldProps) {
  const title = (
    <>
      {props.title}{' '}
      <Suspense fallback={null}>
        <FieldCommentBadge fieldPath={pathToString(props.path)} />
      </Suspense>
    </>
  )
  // The studio renders `title` inside its field header, so a node works there;
  // the type only says string.
  return props.renderDefault({...props, title: title as unknown as string})
}

function FieldCommentBadge({fieldPath}: {fieldPath: string}) {
  const documentId = useFormValue(['_id']) as string
  const documentType = useFormValue(['_type']) as string
  const {threads} = useCommentThreads({
    documentId: getPublishedId(documentId),
    documentType,
    status: 'open',
  })
  const {openInspector} = useDocumentPane()
  const count = threads.filter((thread) => isOnField(thread, fieldPath)).length

  return (
    <CommentBadge
      count={count}
      label={`Open comments on ${fieldPath}`}
      onClick={() => openInspector(COMMENTS_INSPECTOR)}
      style={{verticalAlign: 'middle'}}
    />
  )
}

// A thread on the field itself or on something inside it.
function isOnField(thread: CommentThreadData, fieldPath: string) {
  const path = thread.fieldPath
  return (
    path === fieldPath ||
    path.startsWith(`${fieldPath}.`) ||
    path.startsWith(`${fieldPath}[`)
  )
}
