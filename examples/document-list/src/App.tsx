import '@sanity/ui/styles.css'
import {AuthBoundary, SanityApp} from '@sanity/sdk-react'
import {ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'

import {Comments} from './Comments'
import {config} from './config'

export function App() {
  return (
    <ThemeProvider theme={buildTheme()}>
      <SanityApp
        config={{
          projectId: config.projectId,
          dataset: config.dataset,
        }}
        fallback={<p>Starting…</p>}
      >
        <AuthBoundary>
          <Comments />
        </AuthBoundary>
      </SanityApp>
    </ThemeProvider>
  )
}

// `sanity dev` renders the entry file's default export.
export default App
