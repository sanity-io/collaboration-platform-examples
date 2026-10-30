'use client'

import {SDKCommentsProvider, SDKCommentsPanel} from '@sanity/collaboration/sdk'
import {Suspense} from 'react'

import {config} from './config'

export function Comments() {
  return (
    <Suspense fallback={<p>Resolving your identity…</p>}>
      {/* Keeps the selection in React state. To make pasted links work, see
          "Link to a comment". */}
      <SDKCommentsProvider>
        <Suspense fallback={<p>Loading comments…</p>}>
          <SDKCommentsPanel
            documentId={config.documentId}
            documentType={config.documentType}
            compose={{fieldPath: 'title'}}
          />
        </Suspense>
      </SDKCommentsProvider>
    </Suspense>
  )
}
