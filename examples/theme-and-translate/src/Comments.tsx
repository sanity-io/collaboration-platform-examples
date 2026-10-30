import {SDKCommentsProvider} from '@sanity/collaboration/sdk'
import {Box, Flex, Heading, Stack} from '@sanity/ui'
import {Suspense} from 'react'

import {config} from './config'
import type {Language} from './labels'
import {Panel} from './Panel'
import {ReviewPanel} from './ReviewPanel'

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
        <Flex gap={5} padding={4} wrap="wrap">
          <Box flex={1} style={{minWidth: 320}}>
            <Stack gap={4}>
              <Heading size={1}>{app.comments}</Heading>
              <Suspense fallback={<p>{app.loading}</p>}>
                <Panel handle={handle} />
              </Suspense>
            </Stack>
          </Box>

          <Box flex={1} style={{minWidth: 320}}>
            <Stack gap={4}>
              <Heading size={1}>{app.review}</Heading>
              <Suspense fallback={<p>{app.loading}</p>}>
                <ReviewPanel handle={handle} labels={language.review} />
              </Suspense>
            </Stack>
          </Box>
        </Flex>
      </SDKCommentsProvider>
    </Suspense>
  )
}
