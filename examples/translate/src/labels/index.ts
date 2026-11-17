import type {CommentsLabels} from '@sanity/collaboration/ui'

import {english} from './english'
import {german} from './german'
import {norwegian} from './norwegian'

// The app's own strings: the nav and the headings. These are not part of
// `CommentsLabels`, so each language carries them beside it.
export interface AppStrings {
  title: string
  language: string
  comments: string
  starting: string
  signingIn: string
}

export interface Language {
  name: string
  labels: CommentsLabels
  app: AppStrings
}

export const languages = {
  en: {
    name: 'English',
    labels: english,
    app: {
      title: 'Translate',
      language: 'Language',
      comments: 'Comments',
      starting: 'Starting…',
      signingIn: 'Finding out who you are…',
    },
  },
  nb: {
    name: 'Norsk',
    labels: norwegian,
    app: {
      title: 'Oversettelse',
      language: 'Språk',
      comments: 'Kommentarer',
      starting: 'Starter…',
      signingIn: 'Finner ut hvem du er…',
    },
  },
  de: {
    name: 'Deutsch',
    labels: german,
    app: {
      title: 'Übersetzung',
      language: 'Sprache',
      comments: 'Kommentare',
      starting: 'Wird gestartet…',
      signingIn: 'Anmeldung wird geprüft…',
    },
  },
} satisfies Record<string, Language>

export type LanguageKey = keyof typeof languages
