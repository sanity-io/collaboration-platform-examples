import {SDKCommentsPanel} from '@sanity/collaboration/sdk'
import type {DocumentHandle} from '@sanity/sdk'

// "Theme the components" > "Adjust appearance with props": `actions` on each
// card, passed through `threadProps`. `'always'` keeps the action row in view
// instead of revealing it on hover.
export function Panel({handle}: {handle: DocumentHandle}) {
  return (
    <SDKCommentsPanel
      {...handle}
      compose={{fieldPath: 'title'}}
      threadProps={() => ({actions: 'always'})}
    />
  )
}
