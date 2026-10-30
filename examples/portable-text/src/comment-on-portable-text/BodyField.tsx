// "Comment on Portable Text", Step 2 (the plugin) and Step 3 (the value sync).
import {
  defineSchema,
  EditorProvider,
  type PortableTextBlock,
  useEditor,
} from '@portabletext/editor'
import {SDKPortableTextComments} from '@sanity/collaboration/sdk'
import type {DocumentHandle} from '@sanity/sdk'
import {useDocument, useEditDocument} from '@sanity/sdk-react'
import {useCommentThreads} from '@sanity/sdk-react/collaboration'
import {useEffect} from 'react'

import {config} from '../config'
import {RichTextEditable} from '../RichTextEditable'

export const schemaDefinition = defineSchema({
  decorators: [{name: 'strong'}, {name: 'em'}],
})

export function BodyField({handle}: {handle: DocumentHandle}) {
  const {threads} = useCommentThreads({...handle, status: 'open'})
  const {data} = useDocument<PortableTextBlock[] | undefined, string>({
    ...handle,
    path: config.portableTextPath,
  })
  const editField = useEditDocument<PortableTextBlock[] | undefined>({
    ...handle,
    path: config.portableTextPath,
  })

  return (
    <EditorProvider initialConfig={{schemaDefinition, initialValue: data}}>
      <ValueSync value={data} onChange={editField} />
      {/* The guide renders `<PortableTextEditable />`; this adds the toolbar
          and the bold and italic rendering around it. */}
      <RichTextEditable />
      <SDKPortableTextComments
        {...handle}
        path={config.portableTextPath}
        threads={threads}
      />
    </EditorProvider>
  )
}

export function ValueSync(props: {
  value: PortableTextBlock[] | undefined
  onChange: (value: PortableTextBlock[] | undefined) => Promise<unknown>
}) {
  // Destructured, unlike the guide, so the effects' dependencies are exact.
  const {value, onChange} = props
  const editor = useEditor()

  useEffect(() => {
    editor.send({type: 'update value', value})
  }, [editor, value])

  useEffect(() => {
    const subscription = editor.on('mutation', (event) => {
      void onChange(event.value)
    })
    return () => subscription.unsubscribe()
  }, [editor, onChange])

  return null
}
