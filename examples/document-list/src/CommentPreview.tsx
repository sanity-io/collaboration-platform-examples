import {type CommentThreadData} from '@sanity/collaboration'
import {Comment} from '@sanity/collaboration/ui'
import {Stack, Text} from '@sanity/ui'
import {Popover} from '@sanity/ui/popover'

// "Show a comment preview" > "Render the preview", as in the guide.
export function CommentPreview({
  thread,
  open,
  referenceElement,
}: {
  thread: CommentThreadData
  open: boolean
  referenceElement: HTMLElement | null
}) {
  return (
    <Popover
      open={open}
      referenceElement={referenceElement}
      content={
        <Stack gap={3} padding={2}>
          <Comment
            comment={thread.parentComment}
            variant="reply"
            showReactions={false}
            maxLines={3}
          />

          {thread.commentsCount > 1 && (
            <Text muted>
              {thread.commentsCount === 2
                ? '1 reply'
                : `${thread.commentsCount - 1} replies`}
            </Text>
          )}
        </Stack>
      }
    />
  )
}
