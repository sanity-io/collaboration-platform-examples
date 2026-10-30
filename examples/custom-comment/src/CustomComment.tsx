import {
  type CommentData,
  type CommentReactionShortName,
} from '@sanity/collaboration'
import {
  CommentErrorNotice,
  CommentHeader,
  CommentInput,
  CommentMessageContent,
  CommentReactions,
  DeleteCommentDialog,
  useActiveComment,
  useCommentsContext,
  useCommentUser,
  useNavigableComment,
  useSelectionProps,
} from '@sanity/collaboration/ui'
import {useCommentActions} from '@sanity/sdk-react/collaboration'
import {Badge, Box, Card, type CardTone, Flex, useTheme_v2} from '@sanity/ui'
import {useState} from 'react'
import {styled} from 'styled-components'

import {ActionRow, CommentActions} from './CommentActions'

// "Declare the hover reveal". `ActionRow` lives with the action row, in
// `CommentActions.tsx`.
const CommentCard = styled(Card)`
  ${ActionRow} {
    opacity: 0;
  }

  &:hover ${ActionRow}, &:focus-within ${ActionRow} {
    opacity: 1;
  }
`

// "Choose the card's tone"
function cardTone(state: {createError: boolean; selected: boolean}): CardTone {
  if (state.createError) return 'critical'
  if (state.selected) return 'primary'
  return 'inherit'
}

// "Assemble the card"
export function CustomComment({comment}: {comment: CommentData}) {
  const [editing, setEditing] = useState(false)
  const [deletePending, setDeletePending] = useState(false)
  const [flagged, setFlagged] = useState(false)

  // "Read what the card needs"
  const {resolveCapabilities} = useCommentsContext()
  const {activeComment, setActiveComment} = useActiveComment()
  const actions = useCommentActions()
  // "Resolve the author"
  const author = useCommentUser(comment.authorId)
  // "Wire selection and deep links"
  const {ref} = useNavigableComment<HTMLDivElement>(comment.id)
  const selectionProps = useSelectionProps(() => setActiveComment(comment.id))
  // "Render the body"
  const {avatar, space} = useTheme_v2()

  const capabilities = resolveCapabilities(comment)
  const selected = activeComment?.commentId === comment.id
  const createError = comment.state?.type === 'createError'
  const dimmed =
    comment.state?.type === 'createRetrying' || comment.status === 'resolved'
  const bodyIndent = avatar.sizes[0].size + space[2]

  // "Render the reactions"
  const toggleReaction = (
    shortName: CommentReactionShortName,
    active: boolean,
  ) =>
    active
      ? actions.removeReaction({commentId: comment.id, shortName})
      : actions.addReaction({commentId: comment.id, shortName})

  return (
    <CommentCard
      padding={3}
      radius={3}
      tone={cardTone({createError, selected})}
      style={{opacity: dimmed ? 0.6 : undefined}}
      {...selectionProps}
      ref={ref}
      tabIndex={selectionProps.tabIndex ?? -1}
    >
      <Flex direction="column" gap={2}>
        {/* "Compose the header" */}
        <CommentHeader
          author={author.user}
          authorLoading={author.loading}
          createdAt={comment.createdAt}
          lastEditedAt={comment.lastEditedAt}
        >
          {flagged && (
            <Badge fontSize={0} tone="critical">
              Spam
            </Badge>
          )}

          {/* "Build the action list", in `CommentActions.tsx` */}
          {!editing && (
            <CommentActions
              comment={comment}
              onStatusChange={(status) =>
                actions.setCommentStatus({commentId: comment.id, status})
              }
              onEdit={() => setEditing(true)}
              onDelete={() => setDeletePending(true)}
              onFlag={() => setFlagged(true)}
              onReactionToggle={toggleReaction}
            />
          )}
        </CommentHeader>

        {/* "Render the body" */}
        <Box style={{paddingLeft: editing ? 0 : bodyIndent}}>
          {editing ? (
            <CommentInput
              // The user has just chosen Edit, so the caret belongs here.
              // oxlint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              defaultValue={comment.message}
              submitLabel="Update"
              onSubmit={(message) => {
                setEditing(false)
                return actions.updateComment({commentId: comment.id, message})
              }}
              onDiscard={() => setEditing(false)}
            />
          ) : (
            <CommentMessageContent message={comment.message} />
          )}
        </Box>

        {/* "Show a failed create" */}
        {comment.state?.type === 'createError' && (
          <CommentErrorNotice>{comment.state.error.message}</CommentErrorNotice>
        )}

        {/* "Render the reactions" */}
        <CommentReactions
          reactions={comment.reactions}
          showPicker={false}
          onReactionToggle={capabilities.canReact ? toggleReaction : undefined}
        />
      </Flex>

      {/* "Confirm a delete" */}
      <DeleteCommentDialog
        confirmLabel="Delete forever"
        open={deletePending}
        onClose={() => setDeletePending(false)}
        onConfirm={() => actions.removeComment({commentId: comment.id})}
      >
        Deleting this removes its {comment.reactions.length} reactions too.
      </DeleteCommentDialog>
    </CommentCard>
  )
}
