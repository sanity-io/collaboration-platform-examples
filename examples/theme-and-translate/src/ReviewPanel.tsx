import {SDKCommentsPanel} from '@sanity/collaboration/sdk'
import type {CommentLabels} from '@sanity/collaboration/ui'
import type {DocumentHandle} from '@sanity/sdk'

// "Translate the UI text" > "Translate the text inside a comment": the same
// threads, where Resolve reads "Approve" ("Godkjenn", "Freigeben").
export function ReviewPanel({
  handle,
  labels,
}: {
  handle: DocumentHandle
  labels: Partial<CommentLabels>
}) {
  return (
    <SDKCommentsPanel
      {...handle}
      // Keeps this panel's unsent drafts apart from the other panel's.
      draftScope="review"
      threadProps={() => ({labels: {comment: labels}})}
    />
  )
}
