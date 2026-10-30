import '@sanity/ui/styles.css'
import {AuthBoundary, SanityApp} from '@sanity/sdk-react'
import {Card, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {useState} from 'react'

import {Comments} from './Comments'
import {config} from './config'
import {type LanguageKey, languages} from './labels'
import {TopNav} from './TopNav'

const theme = buildTheme()

export function App() {
  const [languageKey, setLanguageKey] = useState<LanguageKey>('en')
  const language = languages[languageKey]

  return (
    <ThemeProvider theme={theme}>
      {/* Sanity UI paints no background of its own, so a `Card` does. */}
      <Card style={{minHeight: '100vh'}}>
        <TopNav languageKey={languageKey} onLanguageChange={setLanguageKey} />
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
