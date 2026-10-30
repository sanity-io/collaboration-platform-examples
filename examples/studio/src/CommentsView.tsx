import {SDKCommentsPanel} from '@sanity/collaboration/sdk'
import {Box} from '@sanity/ui'
import {Suspense} from 'react'
import {getPublishedId} from 'sanity'
import type {UserViewComponent} from 'sanity/structure'

import {StudioCommentsProvider} from './StudioCommentsProvider'

// A custom document view. The studio supplies the stylesheet and the theme,
// so there is no `ThemeProvider` or CSS import here.
export const CommentsView: UserViewComponent = ({documentId, schemaType}) => (
  <Box padding={4}>
    <StudioCommentsProvider>
      <Suspense fallback={<p>Loading comments…</p>}>
        {/* Comments attach to the published ID, whatever version is open. */}
        <SDKCommentsPanel
          documentId={getPublishedId(documentId)}
          documentType={schemaType.name}
          compose={{fieldPath: 'title'}}
        />
      </Suspense>
    </StudioCommentsProvider>
  </Box>
)
