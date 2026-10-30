import {SDKCommentsProvider} from '@sanity/collaboration/sdk'
import {Box, Flex} from '@sanity/ui'
import {Suspense, useState} from 'react'

import {DocumentComments} from './DocumentComments'
import {DocumentTable} from './DocumentTable'

// The badges and the preview read the current user and `getUser` from the
// provider, so it goes around both halves of the page.
export function Comments() {
  const [documentId, setDocumentId] = useState<string>()

  return (
    <Suspense fallback={<p>Resolving your identity…</p>}>
      <SDKCommentsProvider>
        <Flex gap={5} padding={4} wrap="wrap">
          <Box flex={1} style={{minWidth: 280}}>
            <Suspense fallback={<p>Loading documents…</p>}>
              <DocumentTable selected={documentId} onSelect={setDocumentId} />
            </Suspense>
          </Box>

          <Box flex={2} style={{minWidth: 360}}>
            {documentId ? (
              <Suspense key={documentId} fallback={<p>Loading comments…</p>}>
                <DocumentComments documentId={documentId} />
              </Suspense>
            ) : (
              <p>Pick a document to see its fields and comments.</p>
            )}
          </Box>
        </Flex>
      </SDKCommentsProvider>
    </Suspense>
  )
}
