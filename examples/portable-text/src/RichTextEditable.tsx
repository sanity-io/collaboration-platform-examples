// Not a guide section: the editor chrome. A drop-in replacement for
// `<PortableTextEditable />` that renders `strong` and `em`, adds a toolbar and
// the usual shortcuts, and puts the field in a box of its own. The guides leave
// all of this out, so the editor there is unstyled plain text.
import {
  defineDecorator,
  defineTextBlock,
  PortableTextEditable,
  useEditor,
  useEditorSelector,
} from '@portabletext/editor'
import {NodePlugin} from '@portabletext/editor/plugins'
import * as selectors from '@portabletext/editor/selectors'
import {BoldIcon} from '@sanity/icons/Bold'
import {ItalicIcon} from '@sanity/icons/Italic'
import {Button, Card, Flex} from '@sanity/ui'
import type {ComponentType, MouseEvent} from 'react'

// Kept at module scope: a new array on every render would make `NodePlugin`
// unregister and re-register the nodes on every keystroke.
const nodes = [
  defineTextBlock({
    type: 'block',
    render: (props) => <p {...props.attributes}>{props.children}</p>,
  }),
  defineDecorator({
    type: 'strong',
    render: ({children}) => <strong>{children}</strong>,
  }),
  defineDecorator({
    type: 'em',
    render: ({children}) => <em>{children}</em>,
  }),
]

// The decorators the toolbar knows how to label. The names come from the
// editor's schema, so the buttons follow `schemaDefinition`.
const decoratorIcons: Record<string, {icon: ComponentType; title: string}> = {
  strong: {icon: BoldIcon, title: 'Bold'},
  em: {icon: ItalicIcon, title: 'Italic'},
}

const hotkeys = {marks: {'mod+b': 'strong', 'mod+i': 'em'}}

export function RichTextEditable() {
  return (
    <Card border radius={3}>
      <NodePlugin nodes={nodes} />
      <Toolbar />
      <PortableTextEditable
        style={{minHeight: '12em', outline: 'none', padding: '1rem'}}
        hotkeys={hotkeys}
      />
    </Card>
  )
}

function Toolbar() {
  const editor = useEditor()
  const {decorators} = editor.getSnapshot().context.schema

  return (
    <Card borderBottom padding={2}>
      <Flex gap={1}>
        {decorators
          .filter((decorator) => decorator.name in decoratorIcons)
          .map((decorator) => (
            <DecoratorButton key={decorator.name} name={decorator.name} />
          ))}
      </Flex>
    </Card>
  )
}

function DecoratorButton({name}: {name: string}) {
  const editor = useEditor()
  const active = useEditorSelector(editor, selectors.isActiveDecorator(name))
  const {icon, title} = decoratorIcons[name]

  return (
    <Button
      aria-label={title}
      title={title}
      icon={icon}
      mode="bleed"
      padding={2}
      selected={active}
      // Keeps the selection the decorator applies to from collapsing when the
      // button takes focus.
      onMouseDown={(event: MouseEvent) => event.preventDefault()}
      onClick={() => {
        editor.send({type: 'decorator.toggle', decorator: name})
        editor.send({type: 'focus'})
      }}
    />
  )
}
