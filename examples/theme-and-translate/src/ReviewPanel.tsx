import {SDKCommentsPanel} from '@sanity/collaboration/sdk'
import type {DocumentHandle} from '@sanity/sdk'

import {reviewLabels} from './labels'

// "Translate the UI text" > "Translate the text inside a comment": the same
// threads, where Resolve reads "Godkjenn" (approve).
export function ReviewPanel({handle}: {handle: DocumentHandle}) {
  return (
    <SDKCommentsPanel
      {...handle}
      // Keeps this panel's unsent drafts apart from the other panel's.
      draftScope="review"
      threadProps={() => ({labels: {comment: reviewLabels}})}
    />
  )
}
