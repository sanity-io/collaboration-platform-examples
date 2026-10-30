import {SDKCommentsPanel} from '@sanity/collaboration/sdk'
import {CommentIcon} from '@sanity/icons/Comment'
import {Box, Text} from '@sanity/ui'
import {Suspense} from 'react'
import {
  defineDocumentInspector,
  type DocumentInspectorProps,
  getPublishedId,
} from 'sanity'

export const COMMENTS_INSPECTOR = 'collaboration-comments'

// The comments panel in the document inspector, beside the form. It stays
// open while you edit, and it shares the active comment with the highlights
// in `body` through the provider in `CommentsLayout`.
function CommentsPanel({
  documentId,
  documentType,
  onClose,
}: DocumentInspectorProps) {
  return (
    <Box height="fill" overflow="auto" padding={3}>
      <Suspense fallback={<Text size={1}>Loading comments…</Text>}>
        {/* The panel has its own "Comments" header; `onClose` adds its close
            button. Comments attach to the published ID, whatever version is
            open. */}
        <SDKCommentsPanel
          documentId={getPublishedId(documentId)}
          documentType={documentType}
          compose={{fieldPath: 'title'}}
          onClose={onClose}
        />
      </Suspense>
    </Box>
  )
}

export const commentsInspector = defineDocumentInspector({
  name: COMMENTS_INSPECTOR,
  component: CommentsPanel,
  useMenuItem: () => ({
    icon: CommentIcon,
    showAsAction: true,
    title: 'Comments',
  }),
})
