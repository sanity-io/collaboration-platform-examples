import {type CommentStatus, withCommentAddress} from '@sanity/collaboration'
import {useSDKThreadCallbacks} from '@sanity/collaboration/sdk'
import {
  CommentInput,
  CommentList,
  CommentThread,
} from '@sanity/collaboration/ui'
import {
  useCommentActions,
  useCommentThreads,
} from '@sanity/sdk-react/collaboration'
import {Card, Select, Stack} from '@sanity/ui'

import {config} from './config'
import {JumpToFirst} from './JumpToFirst'

// Defined once, outside render: it is a subscription key.
const handle = {
  documentId: config.documentId,
  documentType: config.documentType,
}

export function Threads(props: {
  status: CommentStatus | undefined
  onStatusChange: (status: CommentStatus | undefined) => void
}) {
  const {status, onStatusChange} = props
  // Omitting `status`, which is what `undefined` does, reads open and
  // resolved threads together.
  const {threads, isPending} = useCommentThreads({...handle, status})
  const threadCallbacks = useSDKThreadCallbacks(handle)
  const {createComment} = useCommentActions()

  return (
    <Stack gap={4} padding={4} style={{opacity: isPending ? 0.6 : undefined}}>
      <Select
        fontSize={1}
        value={status ?? 'all'}
        onChange={(event) => {
          const value = event.currentTarget.value
          onStatusChange(value === 'all' ? undefined : (value as CommentStatus))
        }}
      >
        <option value="open">Open</option>
        <option value="resolved">Resolved</option>
        <option value="all">All</option>
      </Select>

      <JumpToFirst threads={threads} />

      {/* A `CommentList` of your own knows nothing about the filter, which is
          why `onActiveCommentNotFound` on the provider widens it. */}
      <CommentList threads={threads}>
        {(thread) => (
          <CommentThread
            key={thread.threadId}
            thread={thread}
            {...threadCallbacks(thread)}
            // "Add a Copy link action"
            onCopyLink={(comment) => {
              const url = new URL(window.location.href)
              url.search = String(
                withCommentAddress(url.searchParams, {
                  type: 'comment',
                  commentId: comment.id,
                }),
              )
              void navigator.clipboard.writeText(url.toString())
            }}
          />
        )}
      </CommentList>

      {/* Something to link to: starts a thread on the `title` field. */}
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
