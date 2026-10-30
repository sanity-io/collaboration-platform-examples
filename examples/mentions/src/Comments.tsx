import {SDKCommentsPanel, SDKCommentsProvider} from '@sanity/collaboration/sdk'
import {Box, Flex, Heading, Stack} from '@sanity/ui'
import {Suspense} from 'react'

import {config} from './config'
import {MentionsInbox} from './MentionsInbox'
import {useMentionOptions} from './useMentionOptions'

// "Pass them to the provider": every composer below gets the `@` picker, the
// panel's, each thread's reply composer, and the edit composer.
export function Comments() {
  const mentionOptions = useMentionOptions()

  return (
    <Suspense fallback={<p>Resolving your identity…</p>}>
      <SDKCommentsProvider mentionOptions={mentionOptions}>
        <Flex gap={5} padding={4} wrap="wrap">
          <Box flex={1} style={{minWidth: 320}}>
            <Suspense fallback={<p>Loading comments…</p>}>
              <SDKCommentsPanel
                documentId={config.documentId}
                documentType={config.documentType}
                compose={{fieldPath: 'title'}}
              />
            </Suspense>
          </Box>

          <Box flex={1} style={{minWidth: 320}}>
            <Stack gap={4}>
              <Heading size={1}>Mentions of you</Heading>
              <Suspense fallback={<p>Loading your mentions…</p>}>
                <MentionsInbox />
              </Suspense>
            </Stack>
          </Box>
        </Flex>
      </SDKCommentsProvider>
    </Suspense>
  )
}
