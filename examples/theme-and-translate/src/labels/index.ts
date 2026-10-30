import type {CommentLabels, CommentsLabels} from '@sanity/collaboration/ui'

import {english, englishReview} from './english'
import {german, germanReview} from './german'
import {norwegian, norwegianReview} from './norwegian'

// The app's own strings: the nav, the headings and the loading text. These
// are not part of `CommentsLabels`, so each language carries them beside it.
export interface AppStrings {
  title: string
  theme: string
  language: string
  themes: {default: string; brand: string; playful: string}
  darkMode: string
  lightMode: string
  comments: string
  review: string
  starting: string
  signingIn: string
  loading: string
}

export interface Language {
  name: string
  labels: CommentsLabels
  review: Partial<CommentLabels>
  app: AppStrings
}

export const languages = {
  en: {
    name: 'English',
    labels: english,
    review: englishReview,
    app: {
      title: 'Theme and translate',
      theme: 'Theme',
      language: 'Language',
      themes: {default: 'Default', brand: 'Brand', playful: 'Playful'},
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      comments: 'Comments',
      review: 'Review',
      starting: 'Starting…',
      signingIn: 'Finding out who you are…',
      loading: 'Loading comments…',
    },
  },
  nb: {
    name: 'Norsk',
    labels: norwegian,
    review: norwegianReview,
    app: {
      title: 'Tema og oversettelse',
      theme: 'Tema',
      language: 'Språk',
      themes: {default: 'Standard', brand: 'Merkevare', playful: 'Leken'},
      darkMode: 'Mørk modus',
      lightMode: 'Lys modus',
      comments: 'Kommentarer',
      review: 'Gjennomgang',
      starting: 'Starter…',
      signingIn: 'Finner ut hvem du er…',
      loading: 'Laster kommentarer…',
    },
  },
  de: {
    name: 'Deutsch',
    labels: german,
    review: germanReview,
    app: {
      title: 'Design und Übersetzung',
      theme: 'Design',
      language: 'Sprache',
      themes: {default: 'Standard', brand: 'Marke', playful: 'Verspielt'},
      darkMode: 'Dunkler Modus',
      lightMode: 'Heller Modus',
      comments: 'Kommentare',
      review: 'Prüfung',
      starting: 'Wird gestartet…',
      signingIn: 'Anmeldung wird geprüft…',
      loading: 'Kommentare werden geladen…',
    },
  },
} satisfies Record<string, Language>

export type LanguageKey = keyof typeof languages
