// "Customize inline comments": Select a new thread as soon as it exists.
import {SDKPortableTextComments} from '@sanity/collaboration/sdk'
import {useActiveComment} from '@sanity/collaboration/ui'
import type {DocumentHandle} from '@sanity/sdk'

import {config} from '../config'
import {PatternField} from './PatternField'

export function SelectNewThread({handle}: {handle: DocumentHandle}) {
  const {setActiveComment} = useActiveComment()

  return (
    <PatternField handle={handle} path={config.portableTextPath}>
      {(threads) => (
        <SDKPortableTextComments
          {...handle}
          path={config.portableTextPath}
          threads={threads}
          onCommentCreated={(comment) => setActiveComment(comment.id)}
        />
      )}
    </PatternField>
  )
}
