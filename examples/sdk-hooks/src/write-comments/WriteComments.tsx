// "Write comments". One component per guide section; each thread in the list
// shows the per-comment ones.
import {
  type Comment,
  type CommentThread,
  useCommentActions,
  useCommentThreads,
} from '@sanity/sdk-react/collaboration'
import {Button, Card, Flex, Stack, Text, TextInput} from '@sanity/ui'
import {useState} from 'react'

import {config, handle} from '../config'
import {Section} from '../Section'
import {toPlainText} from '../toPlainText'
import {toMessage} from './toMessage'

export function WriteComments() {
  // A read on screen to see the writes land.
  const {threads} = useCommentThreads(handle)

  return (
    <Stack gap={5}>
      <Section title="Start a thread">
        <StartAThread />
      </Section>
      <Section title="Comment on the whole document">
        <CommentOnTheWholeDocument />
      </Section>
      <Section title="Threads">
        <Text size={1} muted>
          Each thread shows "Reply, edit and delete", "Resolve and reopen", "Add
          and remove reactions" and "Retry a failed create".
        </Text>
        {threads.map((thread) => (
          <Thread key={thread.threadId} thread={thread} />
        ))}
      </Section>
    </Stack>
  )
}

function StartAThread() {
  const {createComment} = useCommentActions()
  const [text, setText] = useState('Can we make this shorter?')

  return (
    <Flex gap={2}>
      <TextInput
        aria-label="Message"
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <Button
        text={`Comment on ${config.fieldPath}`}
        onClick={() =>
          void createComment({
            ...handle,
            fieldPath: config.fieldPath,
            message: toMessage(text),
          })
        }
      />
    </Flex>
  )
}

function CommentOnTheWholeDocument() {
  const {createComment} = useCommentActions()

  return (
    <Button
      text="Approve for publishing"
      onClick={() =>
        void createComment({
          ...handle,
          message: toMessage('Approved for publishing.'),
        })
      }
    />
  )
}

function Thread({thread}: {thread: CommentThread}) {
  return (
    <Card border padding={3} radius={2}>
      <Stack gap={3}>
        <Text size={1} muted>
          <code>{thread.fieldPath || '(document)'}</code> · {thread.status}
        </Text>
        {[thread.parentComment, ...thread.replies].map((comment) => (
          <CommentRow key={comment.id} comment={comment} />
        ))}
        <Flex gap={2} wrap="wrap">
          <ReplyEditAndDelete parentCommentId={thread.parentComment.id} />
          <ResolveAndReopen thread={thread} />
        </Flex>
      </Stack>
    </Card>
  )
}

function CommentRow({comment}: {comment: Comment}) {
  const {updateComment, removeComment} = useCommentActions()

  return (
    <Stack gap={2}>
      <Text>
        {toPlainText(comment.message)}
        {comment.lastEditedAt ? ' (edited)' : ''}
        {comment.state?.type === 'createRetrying' ? ' (sending…)' : ''}
      </Text>
      <Flex gap={2} wrap="wrap">
        <Button
          mode="ghost"
          fontSize={1}
          padding={2}
          text="Edit"
          onClick={() =>
            void updateComment({
              commentId: comment.id,
              message: toMessage(`${toPlainText(comment.message)} (shortened)`),
            })
          }
        />
        <Button
          mode="ghost"
          tone="critical"
          fontSize={1}
          padding={2}
          text="Delete"
          onClick={() => void removeComment({commentId: comment.id})}
        />
        <AddAndRemoveReactions comment={comment} />
        <Retry comment={comment} />
      </Flex>
    </Stack>
  )
}

// "Reply, edit and delete": the reply. Edit and delete are on each comment.
function ReplyEditAndDelete({parentCommentId}: {parentCommentId: string}) {
  const {replyToComment} = useCommentActions()

  return (
    <Button
      mode="ghost"
      text="Reply “Done.”"
      onClick={() =>
        void replyToComment({parentCommentId, message: toMessage('Done.')})
      }
    />
  )
}

function ResolveAndReopen({thread}: {thread: CommentThread}) {
  const {setCommentStatus} = useCommentActions()
  const next = thread.status === 'open' ? 'resolved' : 'open'

  return (
    <Button
      mode="ghost"
      text={next === 'resolved' ? 'Resolve' : 'Reopen'}
      onClick={() =>
        // Rolling back is silent, so say when it fails.
        setCommentStatus({
          commentId: thread.parentComment.id,
          status: next,
        }).catch((error: unknown) => {
          window.alert(`Could not change the status: ${String(error)}`)
        })
      }
    />
  )
}

function AddAndRemoveReactions({comment}: {comment: Comment}) {
  const {addReaction, removeReaction} = useCommentActions()
  const count = comment.reactions.filter(
    (reaction) => reaction.shortName === ':+1:',
  ).length

  return (
    <>
      <Button
        mode="ghost"
        fontSize={1}
        padding={2}
        text={`+1 (${count})`}
        onClick={() =>
          void addReaction({commentId: comment.id, shortName: ':+1:'})
        }
      />
      <Button
        mode="ghost"
        fontSize={1}
        padding={2}
        text="Remove +1"
        onClick={() =>
          void removeReaction({commentId: comment.id, shortName: ':+1:'})
        }
      />
    </>
  )
}

// "Retry a failed create".
function Retry({comment}: {comment: Comment}) {
  const {createComment, replyToComment} = useCommentActions()
  if (comment.state?.type !== 'createError') return null

  const retry = () =>
    comment.parentCommentId
      ? replyToComment({
          commentId: comment.id,
          parentCommentId: comment.parentCommentId,
          message: comment.message,
          context: comment.context,
        })
      : createComment({
          commentId: comment.id,
          threadId: comment.threadId,
          documentId: comment.sourceDocumentId,
          documentType: comment.documentType,
          fieldPath: comment.fieldPath,
          message: comment.message,
          context: comment.context,
        })

  return <button onClick={() => void retry()}>Retry</button>
}
