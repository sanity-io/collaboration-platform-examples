import type {CommentThreadData} from '@sanity/collaboration'
import {useActiveComment} from '@sanity/collaboration/ui'
import {Button} from '@sanity/ui'

// "Start with what you already have": move the address from anywhere under
// the provider. The list scrolls to the comment, expands collapsed replies,
// and selects its thread.
export function JumpToFirst(props: {threads: CommentThreadData[]}) {
  const {setActiveComment} = useActiveComment()
  // The oldest thread, whatever order the list is in.
  const thread = props.threads.reduce<CommentThreadData | undefined>(
    (oldest, candidate) =>
      !oldest ||
      candidate.parentComment.createdAt < oldest.parentComment.createdAt
        ? candidate
        : oldest,
    undefined,
  )

  return (
    <Button
      disabled={!thread}
      mode="ghost"
      text="Jump to the first comment"
      onClick={() => thread && setActiveComment(thread.parentComment.id)}
    />
  )
}
