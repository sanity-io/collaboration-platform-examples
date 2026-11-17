'use client'

import {SDKCommentsProvider} from '@sanity/collaboration/sdk'
import {CommentsPanel} from '@sanity/collaboration/ui'
import {AuthStateType} from '@sanity/sdk'
import {useAuthState} from '@sanity/sdk-react'
import {Suspense} from 'react'

import {config} from './config'

const handle = {
  documentId: config.documentId,
  documentType: config.documentType,
}

export function Comments() {
  const auth = useAuthState()

  if (auth.type !== AuthStateType.LOGGED_IN || !auth.currentUser) {
    return <p>Signing in…</p>
  }

  return (
    <Suspense fallback={<p>Resolving your identity…</p>}>
      {/* Keeps the selection in React state. To make pasted links work, see
          "Link to a comment". */}
      <SDKCommentsProvider document={handle}>
        <CommentsPanel compose={{fieldPath: 'title'}} />
      </SDKCommentsProvider>
    </Suspense>
  )
}
