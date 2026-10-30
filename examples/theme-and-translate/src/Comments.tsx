import {SDKCommentsProvider} from '@sanity/collaboration/sdk'
import {Box, Heading, Stack} from '@sanity/ui'
import {Suspense} from 'react'

import {config} from './config'
import type {Language} from './labels'
import {Panel} from './Panel'

const handle = {
  documentId: config.documentId,
  documentType: config.documentType,
}

export function Comments({language}: {language: Language}) {
  const {app} = language

  return (
    <Suspense fallback={<p>{app.signingIn}</p>}>
      {/* "Translate the whole surface": reaches every component below.
          Each language's object is defined once, so switching passes a
          new, stable object rather than one rebuilt on every render. */}
      <SDKCommentsProvider labels={language.labels}>
        <Box padding={4} style={{maxWidth: 720}}>
          <Stack gap={4}>
            <Heading size={1}>{app.comments}</Heading>
            <Suspense fallback={<p>{app.loading}</p>}>
              <Panel handle={handle} />
            </Suspense>
          </Stack>
        </Box>
      </SDKCommentsProvider>
    </Suspense>
  )
}
