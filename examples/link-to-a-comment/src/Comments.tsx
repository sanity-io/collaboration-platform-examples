import {
  type CommentStatus,
  parseCommentAddress,
  withCommentAddress,
} from '@sanity/collaboration'
import {SDKCommentsProvider} from '@sanity/collaboration/sdk'
import {Suspense, useState} from 'react'
import {useSearchParams} from 'react-router'

import {Threads} from './Threads'

// "Link with React Router": the address lives in `?comment=`, so a pasted
// link opens on the comment it names.
export function Comments() {
  const [searchParams, setSearchParams] = useSearchParams()

  // "Handle a link to a comment the panel is hiding": `undefined` reads both
  // statuses.
  const [status, setStatus] = useState<CommentStatus | undefined>('open')

  return (
    <Suspense fallback={<p>Resolving your identity…</p>}>
      <SDKCommentsProvider
        activeComment={parseCommentAddress(searchParams)}
        onActiveCommentChange={(next) =>
          setSearchParams((params) => withCommentAddress(params, next), {
            replace: true,
          })
        }
        // Fires once per address, so widen all the way in one step.
        onActiveCommentNotFound={() => setStatus(undefined)}
      >
        <Suspense fallback={<p>Loading comments…</p>}>
          <Threads status={status} onStatusChange={setStatus} />
        </Suspense>
      </SDKCommentsProvider>
    </Suspense>
  )
}
