// "Write comments": Write a message. Wraps plain text as Portable Text.
import type {CommentMessage} from '@sanity/sdk/collaboration'

export function toMessage(text: string): CommentMessage {
  return [
    {
      _type: 'block',
      _key: crypto.randomUUID(),
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: crypto.randomUUID(), text, marks: []}],
    },
  ]
}
