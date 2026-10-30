// "Read comments". One component per guide section, top to bottom.
import {
  type CommentStatus,
  useCommentThreads,
  useComments,
} from '@sanity/sdk-react/collaboration'
import {Button, Flex, Stack, Text} from '@sanity/ui'
import {Suspense, useState} from 'react'

import {handle} from '../config'
import {Section} from '../Section'
import {toPlainText} from '../toPlainText'

export function ReadComments() {
  return (
    <Stack gap={5}>
      <Section title="Choose between comments and threads">
        <ChooseBetweenCommentsAndThreads />
      </Section>
      <Section title="Narrow by field and status">
        <NarrowByFieldAndStatus />
      </Section>
      <Section title="Wrap the read in Suspense">
        <Suspense fallback={<p>Loading comments…</p>}>
          <Threads documentId={handle.documentId} />
        </Suspense>
      </Section>
      <Section title="Hide threads on removed fields">
        <HideThreadsOnRemovedFields />
      </Section>
    </Stack>
  )
}

function ThreadCount({documentId}: {documentId: string}) {
  const {threads} = useCommentThreads({
    documentId,
    documentType: handle.documentType,
  })

  return <span>{threads.length}</span>
}

// Both hooks read the same list, so this costs one connection.
function ChooseBetweenCommentsAndThreads() {
  const {comments} = useComments(handle)

  return (
    <Text>
      <ThreadCount documentId={handle.documentId} /> threads, {comments.length}{' '}
      comments (replies included).
    </Text>
  )
}

function NarrowByFieldAndStatus() {
  const [fieldPath, setFieldPath] = useState<string | undefined>(undefined)
  const [status, setStatus] = useState<CommentStatus | undefined>('open')
  const {threads, isPending} = useCommentThreads({
    ...handle,
    fieldPath,
    status,
  })

  return (
    <Stack gap={3}>
      <Flex gap={2} wrap="wrap">
        <Button
          mode={status === 'open' ? 'default' : 'ghost'}
          text="Open"
          onClick={() => setStatus('open')}
        />
        <Button
          mode={status === 'resolved' ? 'default' : 'ghost'}
          text="Resolved"
          onClick={() => setStatus('resolved')}
        />
        <Button
          mode={status === undefined ? 'default' : 'ghost'}
          text="Any status"
          onClick={() => setStatus(undefined)}
        />
        <Button
          mode={fieldPath === undefined ? 'default' : 'ghost'}
          text="Any field"
          onClick={() => setFieldPath(undefined)}
        />
        <Button
          mode={fieldPath === '' ? 'default' : 'ghost'}
          text="Whole document"
          onClick={() => setFieldPath('')}
        />
      </Flex>
      <ul style={{opacity: isPending ? 0.5 : 1}}>
        {threads.map((thread) => (
          <li key={thread.threadId}>
            <code>{thread.fieldPath || '(document)'}</code> · {thread.status} ·{' '}
            {toPlainText(thread.parentComment.message)}
          </li>
        ))}
      </ul>
    </Stack>
  )
}

// "Wrap the read in Suspense" and "Show a dropped connection" in one
// component: `isPending` while switching, `error` once the connection drops.
function Threads({documentId}: {documentId: string}) {
  const {threads, isPending, error} = useCommentThreads({
    documentId,
    documentType: handle.documentType,
  })

  return (
    <>
      {/* `<output>` rather than the guide's `<p role="status">`, as the
          jsx-a11y lint rule asks. Same semantics. */}
      {error ? <output>Comments are not up to date.</output> : null}
      <ul data-pending={isPending}>
        {threads.map((thread) => (
          <li key={thread.threadId}>
            {toPlainText(thread.parentComment.message)} ({thread.commentsCount})
          </li>
        ))}
      </ul>
    </>
  )
}

// The SDK has no schema, so it returns threads on fields that have left it.
// Check `fieldPath` against the fields you know about.
const knownFields = ['', 'title', 'body']

function HideThreadsOnRemovedFields() {
  const {threads} = useCommentThreads(handle)
  const visible = threads.filter((thread) =>
    knownFields.some(
      (field) =>
        thread.fieldPath === field || thread.fieldPath.startsWith(`${field}[`),
    ),
  )

  return (
    <Text>
      {visible.length} of {threads.length} threads are on{' '}
      {knownFields.map((field) => `"${field || '(document)'}"`).join(', ')}.
    </Text>
  )
}
