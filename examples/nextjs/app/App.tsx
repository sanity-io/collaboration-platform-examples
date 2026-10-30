// `@sanity/ui/styles.css` has a conditional export: only the `browser`
// condition points at the real stylesheet, the `node` one at a no-op shim. This
// file is browser-only (loaded through `next/dynamic` with `ssr: false`), so
// the import resolves to the stylesheet here but would not in the root layout.
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
