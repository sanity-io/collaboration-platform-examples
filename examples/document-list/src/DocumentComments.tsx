import type {CommentThreadData} from '@sanity/collaboration'
import {useSDKThreadCallbacks} from '@sanity/collaboration/sdk'
import {
  CommentInput,
  type CommentInputHandle,
  CommentList,
  type CommentListHandle,
  CommentThread,
} from '@sanity/collaboration/ui'
import {
  useCommentActions,
  useCommentThreads,
} from '@sanity/sdk-react/collaboration'
import {Card, Flex, Heading, Label, Stack, Switch, Text} from '@sanity/ui'
import {useEffect, useMemo, useRef, useState} from 'react'

import {config} from './config'
import {FieldBadge} from './FieldBadge'
import {ReadOnlyPanel} from './ReadOnlyPanel'

// The fields to give a badge even before anyone has commented on them.
const FIELDS = ['title']

function sumByField(threads: CommentThreadData[]) {
  const counts = new Map<string, number>()

  for (const thread of threads) {
    counts.set(
      thread.fieldPath,
      (counts.get(thread.fieldPath) ?? 0) + thread.commentsCount,
    )
  }

  return counts
}

export function DocumentComments(props: {documentId: string}) {
  const {documentId} = props
  const handle = useMemo(
    () => ({documentId, documentType: config.documentType}),
    [documentId],
  )

  // "Count the threads on one document": one read, grouped by `fieldPath`.
  // Both statuses, so a field whose threads are all resolved can say so.
  const {threads} = useCommentThreads(handle)
  const openThreads = useMemo(
    () => threads.filter((thread) => thread.status === 'open'),
    [threads],
  )
  const countsByField = useMemo(() => sumByField(openThreads), [openThreads])
  const resolvedByField = useMemo(
    () => sumByField(threads.filter((thread) => thread.status === 'resolved')),
    [threads],
  )

  const fields = useMemo(
    () => [...new Set([...FIELDS, ...threads.map((t) => t.fieldPath)])],
    [threads],
  )

  // "Open a thread from a badge" > "A panel that scrolls".
  const list = useRef<CommentListHandle>(null)
  const [composing, setComposing] = useState<string>()
  const composer = useRef<CommentInputHandle>(null)
  useEffect(() => {
    if (composing) composer.current?.focus()
  }, [composing])
  const [readOnly, setReadOnly] = useState(false)
  const threadCallbacks = useSDKThreadCallbacks(handle)
  const {createComment} = useCommentActions()

  return (
    <Stack gap={4}>
      <Heading size={1}>{documentId}</Heading>

      <Stack gap={2}>
        {fields.map((fieldPath) => {
          const open = countsByField.get(fieldPath) ?? 0
          const resolved = resolvedByField.get(fieldPath) ?? 0
          return (
            <Flex key={fieldPath} align="center" gap={2}>
              <Text size={1} style={{flex: 1}}>
                <code>{fieldPath}</code>
              </Text>
              <FieldBadge
                // The newest open thread on the field, for the preview.
                thread={openThreads.find((t) => t.fieldPath === fieldPath)}
                // "Render the empty, unread, and resolved states".
                count={open || resolved}
                state={open === 0 && resolved > 0 ? 'resolved' : 'default'}
                emptyBehavior="add"
                // Scrolls to the field's threads, or starts the first one.
                onClick={() =>
                  open
                    ? list.current?.scrollToField(fieldPath)
                    : setComposing(fieldPath)
                }
              />
            </Flex>
          )
        })}
      </Stack>

      {composing && (
        <Card padding={3} radius={3} tone="transparent">
          <CommentInput
            ref={composer}
            placeholder={`Comment on ${composing}…`}
            onDiscard={() => setComposing(undefined)}
            onSubmit={async (message) => {
              await createComment({...handle, fieldPath: composing, message})
              setComposing(undefined)
            }}
          />
        </Card>
      )}

      <Flex align="center" gap={2}>
        <Switch
          id="read-only"
          checked={readOnly}
          onChange={() => setReadOnly(!readOnly)}
        />
        <Label as="label" htmlFor="read-only" size={1}>
          Read-only panel
        </Label>
      </Flex>

      {readOnly ? (
        <ReadOnlyPanel threads={threads} listRef={list} />
      ) : (
        <CommentList ref={list} threads={openThreads}>
          {(thread) => (
            <CommentThread
              key={thread.threadId}
              thread={thread}
              {...threadCallbacks(thread)}
            />
          )}
        </CommentList>
      )}
    </Stack>
  )
}
