import {SDKCommentsProvider} from '@sanity/collaboration/sdk'
import {CommentsPanel} from '@sanity/collaboration/ui'
import {Box, Heading, Stack} from '@sanity/ui'
import {Suspense} from 'react'

import {config} from './config'
import type {Language} from './labels'

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
      <SDKCommentsProvider document={handle} labels={language.labels}>
        <Box padding={4} style={{maxWidth: 720}}>
          <Stack gap={4}>
            <Heading size={1}>{app.comments}</Heading>
            <CommentsPanel compose={{fieldPath: 'title'}} />
          </Stack>
        </Box>
      </SDKCommentsProvider>
    </Suspense>
  )
}
