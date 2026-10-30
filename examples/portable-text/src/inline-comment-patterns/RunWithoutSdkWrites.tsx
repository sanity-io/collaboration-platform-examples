// "Customize inline comments": Run without the SDK's writes.
import {PortableTextComments} from '@sanity/collaboration/ui'
import type {DocumentHandle} from '@sanity/sdk'
import {useCommentActions} from '@sanity/sdk-react/collaboration'

import {config} from '../config'
import {PatternField} from './PatternField'

export function RunWithoutSdkWrites({handle}: {handle: DocumentHandle}) {
  // Stands in for the host's own write path (`api` in the guide).
  const api = useCommentActions()

  return (
    <PatternField handle={handle} path={config.portableTextPath}>
      {(threads) => (
        <PortableTextComments
          path={config.portableTextPath}
          comments={threads.flatMap((thread) => [
            thread.parentComment,
            ...thread.replies,
          ])}
          sourceDocumentId={handle.documentId}
          onCreate={({fieldPath, range, fieldValue, message}) =>
            api.createComment({
              ...handle,
              fieldPath,
              message,
              anchor: {type: 'portable-text', ...range, fieldValue},
            })
          }
          onRangeChange={(commentId, change) =>
            void api.updateCommentAnchor({
              commentId,
              anchor:
                change.range === null
                  ? null
                  : {
                      type: 'portable-text',
                      ...change.range,
                      fieldValue: change.fieldValue,
                    },
            })
          }
        />
      )}
    </PatternField>
  )
}
