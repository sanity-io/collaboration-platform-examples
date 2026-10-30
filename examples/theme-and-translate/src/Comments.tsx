import {SDKCommentsProvider} from '@sanity/collaboration/sdk'
import {Box, Flex, Heading, Stack} from '@sanity/ui'
import {Suspense} from 'react'

import {config} from './config'
import {norwegian} from './labels'
import {Panel} from './Panel'
import {ReviewPanel} from './ReviewPanel'

const handle = {
  documentId: config.documentId,
  documentType: config.documentType,
}

export function Comments() {
  return (
    <Suspense fallback={<p>Finner ut hvem du er…</p>}>
      {/* "Translate the whole surface": reaches every component below. */}
      <SDKCommentsProvider labels={norwegian}>
        <Flex gap={5} padding={4} wrap="wrap">
          <Box flex={1} style={{minWidth: 320}}>
            <Stack gap={4}>
              <Heading size={1}>Kommentarer</Heading>
              <Suspense fallback={<p>Laster kommentarer…</p>}>
                <Panel handle={handle} />
              </Suspense>
            </Stack>
          </Box>

          <Box flex={1} style={{minWidth: 320}}>
            <Stack gap={4}>
              <Heading size={1}>Gjennomgang</Heading>
              <Suspense fallback={<p>Laster kommentarer…</p>}>
                <ReviewPanel handle={handle} />
              </Suspense>
            </Stack>
          </Box>
        </Flex>
      </SDKCommentsProvider>
    </Suspense>
  )
}
