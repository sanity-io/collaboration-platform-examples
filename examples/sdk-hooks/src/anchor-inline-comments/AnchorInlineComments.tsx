// "Anchor inline comments". One component per guide section, top to bottom.
import {useDocument} from '@sanity/sdk-react'
import {
  type Comment,
  type CommentFieldValue,
  useCommentActions,
  useComments,
} from '@sanity/sdk-react/collaboration'
import {Button, Flex, Stack, Text, TextInput} from '@sanity/ui'
import {useState} from 'react'

import {config, handle} from '../config'
import {Section} from '../Section'
import {toPlainText} from '../toPlainText'
import {toMessage} from '../write-comments/toMessage'

const documentType = handle.documentType

export function AnchorInlineComments() {
  // The field's blocks, for their `_key`s and as the `fieldValue`.
  const {data: editorValue} = useDocument<CommentFieldValue | undefined>({
    ...handle,
    path: config.portableTextPath,
  })
  const first = editorValue?.find((block) => block._type === 'block')

  if (!editorValue || !first) {
    return (
      <Text>
        Add a paragraph to <code>{config.portableTextPath}</code> on the
        document first: an anchor names a block by its <code>_key</code>.
      </Text>
    )
  }

  return (
    <Stack gap={5}>
      <Section title="Pass an anchor when creating">
        <PassAnAnchorWhenCreating blockKey={first._key} />
      </Section>
      <Section title="Read what the API resolved">
        <ReadWhatTheApiResolved />
      </Section>
      <Section title="Anchor into unsaved text">
        <AnchorIntoUnsavedText blockKey={first._key} />
      </Section>
      <Section title="Re-anchor when the text moves">
        <ReAnchorWhenTheTextMoves editorValue={editorValue} />
      </Section>
    </Stack>
  )
}

function PassAnAnchorWhenCreating({blockKey}: {blockKey: string}) {
  const {createComment} = useCommentActions()
  const {documentId} = handle

  return (
    <Button
      text="Comment on the first 12 characters"
      onClick={() =>
        void createComment({
          documentId,
          documentType,
          fieldPath: config.portableTextPath,
          message: toMessage('Tighten this up'),
          anchor: {
            type: 'portable-text',
            start: {_key: blockKey, offset: 0},
            end: {_key: blockKey, offset: 12},
          },
        })
      }
    />
  )
}

// U+F000 and U+F001 mark where the run starts and ends in each block's text.
function markRun(text: string): string {
  return text.replace('', '[').replace('', ']')
}

function ReadWhatTheApiResolved() {
  const {comments} = useComments({
    ...handle,
    fieldPath: config.portableTextPath,
  })
  const inline = comments.filter((comment) => comment.selection)

  if (inline.length === 0) {
    return <Text muted>No resolved inline comments yet.</Text>
  }

  return (
    <ul>
      {inline.map((comment) => (
        <li key={comment.id}>
          {toPlainText(comment.message)}: selection “
          {comment.selection?.value.map((item) => markRun(item.text)).join(' ')}
          ”, snapshot “
          {comment.contentSnapshot ? toPlainText(comment.contentSnapshot) : ''}”
        </li>
      ))}
    </ul>
  )
}

function AnchorIntoUnsavedText({blockKey}: {blockKey: string}) {
  const {createComment} = useCommentActions()
  const {documentId} = handle
  // Text nobody has saved: it lives here, not on the document.
  const [text, setText] = useState('Unsaved words to comment on')
  const editorValue = [
    {
      _type: 'block',
      _key: blockKey,
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: 'unsaved', text, marks: []}],
    },
  ]

  return (
    <Flex gap={2}>
      <TextInput
        aria-label="Unsaved text"
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <Button
        text="Comment on its first 12 characters"
        onClick={() =>
          void createComment({
            documentId,
            documentType,
            fieldPath: config.portableTextPath,
            message: toMessage('Tighten this up'),
            anchor: {
              type: 'portable-text',
              start: {_key: blockKey, offset: 0},
              end: {_key: blockKey, offset: 12},
              fieldValue: editorValue,
            },
          })
        }
      />
    </Flex>
  )
}

function ReAnchorWhenTheTextMoves({
  editorValue,
}: {
  editorValue: CommentFieldValue
}) {
  const {comments} = useComments({
    ...handle,
    fieldPath: config.portableTextPath,
  })
  const inline = comments.filter((comment) => comment.selection)

  if (inline.length === 0) {
    return <Text muted>No resolved inline comments yet.</Text>
  }

  return (
    <Stack gap={2}>
      {inline.map((comment) => (
        <ReAnchor
          key={comment.id}
          comment={comment}
          editorValue={editorValue}
        />
      ))}
    </Stack>
  )
}

function ReAnchor({
  comment,
  editorValue,
}: {
  comment: Comment
  editorValue: CommentFieldValue
}) {
  const {updateCommentAnchor} = useCommentActions()
  const commentId = comment.id
  const blockKey = comment.selection?.value[0]?._key ?? editorValue[0]._key

  const anchor = {
    type: 'portable-text',
    start: {_key: blockKey, offset: 4},
    end: {_key: blockKey, offset: 16},
  } as const

  return (
    <Flex gap={2} align="center" wrap="wrap">
      <Text>{toPlainText(comment.message)}</Text>
      <Button
        mode="ghost"
        text="Move to characters 4–16"
        onClick={() =>
          void updateCommentAnchor({
            commentId,
            anchor: {...anchor, fieldValue: editorValue},
          })
        }
      />
      <Button
        mode="ghost"
        text="Drop the anchor"
        onClick={() => void updateCommentAnchor({commentId, anchor: null})}
      />
    </Flex>
  )
}
