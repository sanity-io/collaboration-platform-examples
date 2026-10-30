import type {CommentThreadData} from '@sanity/collaboration'
import {
  CommentInput,
  useCommentUser,
  UserAvatar,
} from '@sanity/collaboration/ui'
import {useCommentActions} from '@sanity/sdk-react/collaboration'
import {AvatarStack, Card, Stack} from '@sanity/ui'

import {CustomComment} from './CustomComment'

// A thread made of `CustomComment`s: the parent, then its replies.
export function CommentThreadCard(props: {thread: CommentThreadData}) {
  const {thread} = props
  const {replyToComment} = useCommentActions()
  const participants = [
    ...new Set(
      [thread.parentComment, ...thread.replies].flatMap((comment) =>
        comment.authorId ? [comment.authorId] : [],
      ),
    ),
  ]

  return (
    <Card border padding={2} radius={3}>
      <Stack gap={2}>
        <CustomComment comment={thread.parentComment} />
        {thread.replies.map((reply) => (
          <CustomComment key={reply.id} comment={reply} />
        ))}
        <AvatarStack maxLength={4} size={0}>
          {participants.map((userId) => (
            <ParticipantAvatar key={userId} userId={userId} />
          ))}
        </AvatarStack>
        {thread.status === 'open' && (
          <CommentInput
            placeholder="Reply…"
            draftKey={`reply:${thread.threadId}`}
            onSubmit={(message) =>
              replyToComment({
                parentCommentId: thread.parentComment.id,
                message,
              })
            }
          />
        )}
      </Stack>
    </Card>
  )
}

// "Build a custom comment" > "Resolve the author": a hook cannot run inside
// `map`, so a list of users is a component per row.
function ParticipantAvatar(props: {userId: string}) {
  const {user, loading} = useCommentUser(props.userId)

  return <UserAvatar user={user} loading={loading} />
}
