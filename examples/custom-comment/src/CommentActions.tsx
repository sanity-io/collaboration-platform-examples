import {
  type CommentData,
  type CommentReactionShortName,
  type CommentStatus,
  withCommentAddress,
} from '@sanity/collaboration'
import {
  AddReactionButton,
  CommentActionBar,
  commentActions,
  useCommentsContext,
} from '@sanity/collaboration/ui'
import {WarningOutlineIcon} from '@sanity/icons/WarningOutline'
import {Flex} from '@sanity/ui'
import {styled} from 'styled-components'

// The row the card's hover reveal targets ("Build a custom comment" >
// "Declare the hover reveal").
export const ActionRow = styled(Flex)``

function copyLink(commentId: string) {
  const url = new URL(window.location.href)
  url.search = String(
    withCommentAddress(url.searchParams, {type: 'comment', commentId}),
  )
  void navigator.clipboard.writeText(url.toString())
}

// "Customize comment actions": the actions are an array, so adding, removing
// and reordering are array operations.
export function CommentActions(props: {
  comment: CommentData
  onStatusChange?: (status: CommentStatus) => void
  onEdit: () => void
  onDelete: () => void
  onFlag: () => void
  onReactionToggle: (
    shortName: CommentReactionShortName,
    active: boolean,
  ) => void
}) {
  const {comment, onStatusChange, onEdit, onDelete, onFlag, onReactionToggle} =
    props

  // "Build the default list": the provider's policy is applied for you.
  const {resolveCapabilities} = useCommentsContext()
  const capabilities = resolveCapabilities(comment)

  const actions = [
    ...commentActions({
      comment,
      capabilities,
      onStatusChange,
      // "Own the flow an action starts": these flip the card's own state.
      onEdit,
      onDelete,
      // "Remove or reorder an action": a reply has no Copy link, by leaving
      // the callback out rather than filtering on the translated name.
      onCopyLink: comment.parentCommentId
        ? undefined
        : () => copyLink(comment.id),
    }),
    // "Add an action"
    {
      name: 'Mark as spam',
      icon: WarningOutlineIcon,
      action: onFlag,
    },
  ]

  // "Reactions are not actions": the picker sits beside the bar.
  return (
    <ActionRow align="center" gap={1}>
      {capabilities.canReact && (
        <AddReactionButton
          reactions={comment.reactions}
          onReactionToggle={onReactionToggle}
        />
      )}
      <CommentActionBar actions={actions} />
    </ActionRow>
  )
}
