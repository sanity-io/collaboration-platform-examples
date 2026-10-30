import type {CommentMessage} from '@sanity/sdk-react/collaboration'

// Enough to show a comment in a list. Not part of the guides.
export function toPlainText(message: CommentMessage): string {
  return message
    .map((block) =>
      Array.isArray(block.children)
        ? block.children
            .map((child: {text?: unknown}) =>
              typeof child.text === 'string' ? child.text : '',
            )
            .join('')
        : '',
    )
    .join('\n')
}
