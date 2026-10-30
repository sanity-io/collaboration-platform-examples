import {SDKCommentsProvider} from '@sanity/collaboration/sdk'
import {CommentInput} from '@sanity/collaboration/ui'
import {
  useCommentActions,
  useCommentThreads,
} from '@sanity/sdk-react/collaboration'
import {Card, Stack} from '@sanity/ui'
import {Suspense} from 'react'

import {config} from './config'
import {CommentThreadCard} from './CommentThreadCard'

// Defined once, outside render: it is a subscription key.
const handle = {
  documentId: config.documentId,
  documentType: config.documentType,
}

export function Comments() {
  return (
    <Suspense fallback={<p>Resolving your identity…</p>}>
      {/* "Customize comment actions" > "Let capabilities decide what is
          disabled": a surface-wide policy. Here nobody may delete a resolved
          comment, so its Delete entry renders grayed out. */}
      <SDKCommentsProvider
        capabilities={(comment) =>
          comment.status === 'resolved' ? {canDelete: false} : {}
        }
      >
        <Suspense fallback={<p>Loading comments…</p>}>
          <Threads />
        </Suspense>
      </SDKCommentsProvider>
    </Suspense>
  )
}

function Threads() {
  const {threads} = useCommentThreads(handle)
  const {createComment} = useCommentActions()

  return (
    <Stack gap={4} padding={4}>
      {threads.map((thread) => (
        <CommentThreadCard key={thread.threadId} thread={thread} />
      ))}
      <Card padding={3} radius={3} tone="transparent">
        <CommentInput
          placeholder="Comment on title…"
          onSubmit={(message) =>
            createComment({...handle, fieldPath: 'title', message})
          }
        />
      </Card>
    </Stack>
  )
}
