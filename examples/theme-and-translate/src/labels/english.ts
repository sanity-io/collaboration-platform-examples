import type {CommentLabels, CommentsLabels} from '@sanity/collaboration/ui'

// "Translate the UI text" > "Translate the whole surface". English is the
// default, but spelling it out keeps every language the same shape.

const REACTION_NAMES: Record<string, string> = {
  ':+1:': 'Thumbs up',
  ':-1:': 'Thumbs down',
  ':eyes:': 'Eyes',
  ':heart:': 'Heart',
  ':heavy_plus_sign:': 'Plus one',
  ':rocket:': 'Rocket',
}

export const english: CommentsLabels = {
  panel: {
    panel: 'Comments',
    open: 'Open',
    resolved: 'Resolved',
    addThread: 'Start a new thread',
    composerPlaceholder: (target) =>
      target.fieldPath === ''
        ? 'Comment on the document…'
        : `Comment on ${target.fieldPath}…`,
    empty: (status) =>
      status === 'open' ? 'No open comments.' : 'No resolved comments.',
  },
  thread: {
    showMoreReplies: (count) =>
      count === 1 ? 'Show 1 more reply' : `Show ${count} more replies`,
    showFewerReplies: 'Show fewer',
    replyPlaceholder: 'Reply or mention with @',
  },
  comment: {
    actions: {
      resolve: 'Resolve comment',
      reopen: 'Reopen comment',
      edit: 'Edit',
      delete: 'Delete',
    },
    deleteTitle: 'Delete comment?',
    deleteConfirm: 'Delete',
    deleteCancel: 'Cancel',
    unknownAuthor: 'Unknown',
    edited: '(edited)',
  },
  input: {
    placeholder: 'Write a comment…',
    submit: 'Comment',
    cancel: 'Cancel',
    mentionsEmpty: 'No users found',
  },
  list: {loading: 'Loading comments…'},
  inline: {button: 'Comment'},
  reactions: {name: (shortName) => REACTION_NAMES[shortName] ?? shortName},
}

// "Translate the text inside a comment": the review panel's wording.
export const englishReview: Partial<CommentLabels> = {
  actions: {resolve: 'Approve'},
}
