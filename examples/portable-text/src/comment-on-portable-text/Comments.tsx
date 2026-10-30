// "Comment on Portable Text", Step 4: the panel beside the editor, both under
// one provider.
import {SDKCommentsProvider, SDKCommentsPanel} from '@sanity/collaboration/sdk'
import type {DocumentHandle} from '@sanity/sdk'
import {Card} from '@sanity/ui'
import {type ComponentType, Suspense} from 'react'

import {BodyField} from './BodyField'

// Not in the guide: the panel is pinned to the right edge of the viewport, so
// the page leaves this much room for it.
export const PANEL_WIDTH = 400

export function Comments({
  handle,
  Field = BodyField,
}: {
  handle: DocumentHandle
  // Not in the guide: lets the app swap in a field from
  // `../inline-comment-patterns`. Leave it out for the guide's `BodyField`.
  Field?: ComponentType<{handle: DocumentHandle}>
}) {
  return (
    <Suspense fallback={<p>Resolving your identity…</p>}>
      <SDKCommentsProvider>
        <Suspense fallback={<p>Loading comments…</p>}>
          <Field handle={handle} />
          <Card
            borderLeft
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: PANEL_WIDTH,
              overflow: 'auto',
            }}
          >
            <SDKCommentsPanel {...handle} />
          </Card>
        </Suspense>
      </SDKCommentsProvider>
    </Suspense>
  )
}
