import type {LayoutProps} from 'sanity'

import {StudioCommentsProvider} from './StudioCommentsProvider'

// The studio's layout, wrapped once in the comments provider. The form and
// the inspector are in different parts of the document pane, so the provider
// has to sit above both for them to share identity and the active comment.
export function CommentsLayout(props: LayoutProps) {
  return (
    <StudioCommentsProvider>
      {props.renderDefault(props)}
    </StudioCommentsProvider>
  )
}
