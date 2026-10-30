import type {CommentThreadData} from '@sanity/collaboration'
import {CommentBadge, type CommentBadgeProps} from '@sanity/collaboration/ui'
import {useState} from 'react'

import {CommentPreview} from './CommentPreview'

// A field's badge, with a preview of its newest thread while the pointer is
// over it.
export function FieldBadge(
  props: CommentBadgeProps & {thread: CommentThreadData | undefined},
) {
  const {thread, ...badgeProps} = props
  const [element, setElement] = useState<HTMLButtonElement | null>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <CommentBadge
        {...badgeProps}
        ref={setElement}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      {thread && (
        <CommentPreview
          thread={thread}
          open={hovered}
          referenceElement={element}
        />
      )}
    </>
  )
}
