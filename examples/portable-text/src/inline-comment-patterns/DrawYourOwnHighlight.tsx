// "Customize inline comments": Draw your own highlight.
import {SDKPortableTextComments} from '@sanity/collaboration/sdk'
import type {DocumentHandle} from '@sanity/sdk'

import {config} from '../config'
import {PatternField} from './PatternField'

export function DrawYourOwnHighlight({handle}: {handle: DocumentHandle}) {
  return (
    <PatternField handle={handle} path={config.portableTextPath}>
      {(threads) => (
        <SDKPortableTextComments
          {...handle}
          path={config.portableTextPath}
          threads={threads}
          renderHighlight={(comment, {selected, onSelect}) =>
            (props) =>
              (
                // A click target inside the editable text, as in the guide. The
                // editor owns the keyboard there, so there is no key handler.
                // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                <mark
                  data-comment-id={comment.id}
                  data-active={selected || undefined}
                  onClick={onSelect}
                  // Not in the guide: shows the active state and only looks
                  // clickable when `onSelect` is there.
                  style={{
                    background: selected ? '#a5d8ff' : '#d0ebff',
                    cursor: onSelect ? 'pointer' : undefined,
                  }}
                >
                  {props.children}
                </mark>
              )
            }
        />
      )}
    </PatternField>
  )
}
