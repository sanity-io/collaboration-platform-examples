import {SDKCommentsProvider} from '@sanity/collaboration/sdk'
import {CommentsPanel} from '@sanity/collaboration/ui'
import {Box, Flex, Heading, Stack} from '@sanity/ui'
import {Suspense} from 'react'

import {config} from './config'
import {MentionsInbox} from './MentionsInbox'
import {useMentionOptions} from './useMentionOptions'

const handle = {
  documentId: config.documentId,
  documentType: config.documentType,
}

// "Pass them to the provider": every composer below gets the `@` picker, the
// panel's, each thread's reply composer, and the edit composer.
export function Comments() {
  const mentionOptions = useMentionOptions()

  return (
    <Suspense fallback={<p>Resolving your identity…</p>}>
      <SDKCommentsProvider document={handle} mentionOptions={mentionOptions}>
        <Flex gap={5} padding={4} wrap="wrap">
          <Box flex={1} style={{minWidth: 320}}>
            <CommentsPanel compose={{fieldPath: 'title'}} />
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
