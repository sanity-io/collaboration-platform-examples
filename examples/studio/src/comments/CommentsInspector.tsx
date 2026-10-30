import {SDKCommentsPanel} from '@sanity/collaboration/sdk'
import {CloseIcon} from '@sanity/icons/Close'
import {CommentIcon} from '@sanity/icons/Comment'
import {Box, Button, Card, Flex, Text} from '@sanity/ui'
import {Suspense} from 'react'
import {
  defineDocumentInspector,
  type DocumentInspectorProps,
  getPublishedId,
} from 'sanity'

// The comments panel in the document inspector, beside the form. It stays
// open while you edit, and it shares the active comment with the highlights
// in `body` through the provider in `CommentsLayout`.
function CommentsPanel({
  documentId,
  documentType,
  onClose,
}: DocumentInspectorProps) {
  return (
    <Flex direction="column" height="fill">
      <Card borderBottom padding={2}>
        <Flex align="center" gap={2}>
          <Box flex={1} paddingLeft={2}>
            <Text size={1} weight="medium">
              Comments
            </Text>
          </Box>
          <Button
            aria-label="Close comments"
            icon={CloseIcon}
            mode="bleed"
            onClick={onClose}
          />
        </Flex>
      </Card>
      <Box flex={1} overflow="auto" padding={3}>
        <Suspense fallback={<Text size={1}>Loading comments…</Text>}>
          {/* Comments attach to the published ID, whatever version is open. */}
          <SDKCommentsPanel
            documentId={getPublishedId(documentId)}
            documentType={documentType}
            compose={{fieldPath: 'title'}}
          />
        </Suspense>
      </Box>
    </Flex>
  )
}

export const commentsInspector = defineDocumentInspector({
  name: 'collaboration-comments',
  component: CommentsPanel,
  useMenuItem: () => ({
    icon: CommentIcon,
    showAsAction: true,
    title: 'Comments',
  }),
})
