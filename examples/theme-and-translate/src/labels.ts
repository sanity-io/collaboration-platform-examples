import type {CommentLabels, CommentsLabels} from '@sanity/collaboration/ui'

// "Translate the UI text" > "Translate the whole surface". Defined once,
// outside render. What is left out keeps the English default.

const REACTION_NAMES: Record<string, string> = {
  ':+1:': 'Tommel opp',
  ':-1:': 'Tommel ned',
  ':eyes:': 'Øyne',
  ':heart:': 'Hjerte',
  ':heavy_plus_sign:': 'Pluss',
  ':rocket:': 'Rakett',
}

export const norwegian: CommentsLabels = {
  panel: {
    panel: 'Kommentarer',
    open: 'Åpne',
    resolved: 'Løste',
    addThread: 'Start en ny tråd',
    composerPlaceholder: (target) =>
      target.fieldPath === ''
        ? 'Kommenter dokumentet…'
        : `Kommenter ${target.fieldPath}…`,
    empty: (status) =>
      status === 'open'
        ? 'Ingen åpne kommentarer.'
        : 'Ingen løste kommentarer.',
  },
  thread: {
    showMoreReplies: (count) => `Vis ${count} til`,
    showFewerReplies: 'Skjul',
    replyPlaceholder: 'Svar eller nevn med @',
  },
  comment: {
    actions: {
      resolve: 'Løs kommentaren',
      reopen: 'Gjenåpne kommentaren',
      edit: 'Rediger',
      delete: 'Slett',
    },
    deleteTitle: 'Slette kommentaren?',
    deleteConfirm: 'Slett',
    deleteCancel: 'Avbryt',
    unknownAuthor: 'Ukjent',
    edited: '(redigert)',
  },
  input: {
    placeholder: 'Skriv en kommentar…',
    submit: 'Kommenter',
    cancel: 'Avbryt',
    mentionsEmpty: 'Ingen brukere funnet',
  },
  list: {loading: 'Laster kommentarer…'},
  inline: {button: 'Kommenter'},
  reactions: {name: (shortName) => REACTION_NAMES[shortName] ?? shortName},
}

// "Translate the text inside a comment": one panel's comments worded
// differently from the rest of the app.
export const reviewLabels: Partial<CommentLabels> = {
  actions: {resolve: 'Godkjenn'},
}
