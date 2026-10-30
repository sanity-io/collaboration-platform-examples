import type {CommentLabels, CommentsLabels} from '@sanity/collaboration/ui'

// "Translate the UI text" > "Translate the whole surface". Defined once,
// outside render. What is left out keeps the English default.

const REACTION_NAMES: Record<string, string> = {
  ':+1:': 'Daumen hoch',
  ':-1:': 'Daumen runter',
  ':eyes:': 'Augen',
  ':heart:': 'Herz',
  ':heavy_plus_sign:': 'Plus',
  ':rocket:': 'Rakete',
}

export const german: CommentsLabels = {
  panel: {
    panel: 'Kommentare',
    open: 'Offen',
    resolved: 'Erledigt',
    addThread: 'Neuen Thread starten',
    composerPlaceholder: (target) =>
      target.fieldPath === ''
        ? 'Das Dokument kommentieren…'
        : `${target.fieldPath} kommentieren…`,
    empty: (status) =>
      status === 'open'
        ? 'Keine offenen Kommentare.'
        : 'Keine erledigten Kommentare.',
  },
  thread: {
    showMoreReplies: (count) =>
      count === 1
        ? '1 weitere Antwort zeigen'
        : `${count} weitere Antworten zeigen`,
    showFewerReplies: 'Weniger zeigen',
    replyPlaceholder: 'Antworten oder mit @ erwähnen',
  },
  comment: {
    actions: {
      resolve: 'Kommentar erledigen',
      reopen: 'Kommentar wieder öffnen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
    },
    deleteTitle: 'Kommentar löschen?',
    deleteConfirm: 'Löschen',
    deleteCancel: 'Abbrechen',
    unknownAuthor: 'Unbekannt',
    edited: '(bearbeitet)',
  },
  input: {
    placeholder: 'Kommentar schreiben…',
    submit: 'Kommentieren',
    cancel: 'Abbrechen',
    mentionsEmpty: 'Keine Personen gefunden',
  },
  list: {loading: 'Kommentare werden geladen…'},
  inline: {button: 'Kommentieren'},
  reactions: {name: (shortName) => REACTION_NAMES[shortName] ?? shortName},
}

// "Translate the text inside a comment": the review panel's wording.
export const germanReview: Partial<CommentLabels> = {
  actions: {resolve: 'Freigeben'},
}
