// "Customize inline comments": Move or relabel the composer.
import {SDKPortableTextComments} from '@sanity/collaboration/sdk'
import {InlineCommentInput} from '@sanity/collaboration/ui'
import type {DocumentHandle} from '@sanity/sdk'

import {config} from '../config'
import {PatternField} from './PatternField'

export function MoveOrRelabelComposer({handle}: {handle: DocumentHandle}) {
  return (
    <PatternField handle={handle} path={config.portableTextPath}>
      {(threads) => (
        <SDKPortableTextComments
          {...handle}
          path={config.portableTextPath}
          threads={threads}
        >
          <InlineCommentInput label="Add note" placement="top" />
        </SDKPortableTextComments>
      )}
    </PatternField>
  )
}
