import {Comment, useCommentsContext} from '@sanity/collaboration/ui'
import {useCommentsQuery} from '@sanity/sdk-react/collaboration'
import {Stack, Text} from '@sanity/ui'

// "Query for mentions": a mention is an inline object inside a block's
// `children`, so the filter has to descend into them.
const MENTIONS_FILTER =
  'count(message[].children[_type == "mention" && userId == $userId]) > 0'

export function MentionsInbox() {
  // The provider has already resolved who you are.
  const {currentUser} = useCommentsContext()
  const {comments} = useCommentsQuery({
    filter: MENTIONS_FILTER,
    params: {userId: currentUser.id},
  })

  if (comments.length === 0) {
    return (
      <Text muted size={1}>
        No comments mention you yet. Type @ in a comment and pick yourself.
      </Text>
    )
  }

  // Comments rather than threads, so each one renders as a `Comment`. With no
  // callbacks it renders no actions.
  return (
    <Stack gap={4}>
      {comments.map((comment) => (
        <Stack gap={2} key={comment.id}>
          <Text muted size={0}>
            {comment.documentType} · {comment.documentId} · {comment.fieldPath}
          </Text>
          <Comment comment={comment} />
        </Stack>
      ))}
    </Stack>
  )
}
