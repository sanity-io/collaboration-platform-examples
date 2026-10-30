// "Import the Sanity UI stylesheet"
import '@sanity/ui/styles.css'
import {AuthBoundary, SanityApp} from '@sanity/sdk-react'
import {Button, Card, Flex, ThemeProvider} from '@sanity/ui'
import {useState} from 'react'

import {Comments} from './Comments'
import {config} from './config'
import {theme} from './theme'

export function App() {
  const [scheme, setScheme] = useState<'light' | 'dark'>('light')

  return (
    // "Use the dark color scheme": a prop on `ThemeProvider`, not part of
    // the theme.
    <ThemeProvider scheme={scheme} theme={theme}>
      {/* Sanity UI paints no background of its own, so a `Card` does. */}
      <Card style={{minHeight: '100vh'}}>
        <Flex justify="flex-end" padding={3}>
          <Button
            mode="ghost"
            text={scheme === 'light' ? 'Mørk modus' : 'Lys modus'}
            onClick={() => setScheme(scheme === 'light' ? 'dark' : 'light')}
          />
        </Flex>
        <SanityApp
          config={{
            projectId: config.projectId,
            dataset: config.dataset,
          }}
          fallback={<p>Starter…</p>}
        >
          <AuthBoundary>
            <Comments />
          </AuthBoundary>
        </SanityApp>
      </Card>
    </ThemeProvider>
  )
}

// `sanity dev` renders the entry file's default export.
export default App
