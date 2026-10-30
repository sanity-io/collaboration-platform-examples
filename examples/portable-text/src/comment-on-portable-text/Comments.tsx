// "Comment on Portable Text", Step 4: the panel beside the editor, both under
// one provider.
import {SDKCommentsProvider, SDKCommentsPanel} from '@sanity/collaboration/sdk'
import type {DocumentHandle} from '@sanity/sdk'
import {type ComponentType, Suspense} from 'react'

import {BodyField} from './BodyField'

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
          <SDKCommentsPanel {...handle} />
        </Suspense>
      </SDKCommentsProvider>
    </Suspense>
  )
}
