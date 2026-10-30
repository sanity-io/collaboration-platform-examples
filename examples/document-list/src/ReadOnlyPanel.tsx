import type {CommentThreadData} from '@sanity/collaboration'
import {
  type CommentListHandle,
  CommentsPanel,
  READ_ONLY_CAPABILITIES,
} from '@sanity/collaboration/ui'
import type {Ref} from 'react'

// "Show a comment preview" > "Make the panel read-only": every capability
// off, and no `onThreadCreate`. `SDKCommentsPanel` always wires
// `onThreadCreate`, so this is `CommentsPanel` over `useCommentThreads`.
export function ReadOnlyPanel(props: {
  threads: CommentThreadData[]
  listRef: Ref<CommentListHandle>
}) {
  return (
    <CommentsPanel
      threads={props.threads}
      threadProps={() => ({capabilities: () => READ_ONLY_CAPABILITIES})}
      listRef={props.listRef}
    />
  )
}
