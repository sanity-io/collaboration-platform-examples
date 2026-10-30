// "Import the Sanity UI stylesheet"
import '@sanity/ui/styles.css'
import {AuthBoundary, SanityApp} from '@sanity/sdk-react'
import {Card, ThemeProvider} from '@sanity/ui'
import {useState} from 'react'

import {Comments} from './Comments'
import {config} from './config'
import {type LanguageKey, languages} from './labels'
import {type ThemeKey, themes} from './themes'
import {TopNav} from './TopNav'

export function App() {
  const [themeKey, setThemeKey] = useState<ThemeKey>('brand')
  const [languageKey, setLanguageKey] = useState<LanguageKey>('en')
  const [scheme, setScheme] = useState<'light' | 'dark'>('light')
  const language = languages[languageKey]

  return (
    // "Use the dark color scheme": a prop on `ThemeProvider`, not part of
    // the theme. Switching theme passes another prebuilt one.
    <ThemeProvider scheme={scheme} theme={themes[themeKey]}>
      {/* Sanity UI paints no background of its own, so a `Card` does. */}
      <Card style={{minHeight: '100vh'}}>
        <TopNav
          themeKey={themeKey}
          onThemeChange={setThemeKey}
          languageKey={languageKey}
          onLanguageChange={setLanguageKey}
          scheme={scheme}
          onSchemeChange={setScheme}
        />
        <SanityApp
          config={{
            projectId: config.projectId,
            dataset: config.dataset,
          }}
          fallback={<p>{language.app.starting}</p>}
        >
          <AuthBoundary>
            <Comments language={language} />
          </AuthBoundary>
        </SanityApp>
      </Card>
    </ThemeProvider>
  )
}

// `sanity dev` renders the entry file's default export.
export default App
