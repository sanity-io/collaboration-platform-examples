// "Customize inline comments": Comment on a nested Portable Text field.
import {SDKPortableTextComments} from '@sanity/collaboration/sdk'
import type {DocumentHandle} from '@sanity/sdk'

import {config} from '../config'
import {PatternField} from './PatternField'

export function NestedField({handle}: {handle: DocumentHandle}) {
  const path = config.nestedPortableTextPath
  if (!path) {
    return (
      <p>
        Set <code>SANITY_APP_NESTED_PORTABLE_TEXT_PATH</code> in{' '}
        <code>.env</code> to a Portable Text array inside a block, such as{' '}
        <code>{`body[_key=="callout-1"].content`}</code>, and restart.
      </p>
    )
  }

  // The inner array gets an editor of its own, and a plugin with the array's
  // full path.
  return (
    <PatternField handle={handle} path={path}>
      {(threads) => (
        <SDKPortableTextComments {...handle} path={path} threads={threads} />
      )}
    </PatternField>
  )
}
