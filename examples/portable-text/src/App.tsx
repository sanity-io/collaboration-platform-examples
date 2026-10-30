import '@sanity/ui/styles.css'
import type {DocumentHandle} from '@sanity/sdk'
import {AuthBoundary, SanityApp} from '@sanity/sdk-react'
import {Card, Container, Select, Stack, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {type ComponentType, useState} from 'react'

import {BodyField} from './comment-on-portable-text/BodyField'
import {Comments} from './comment-on-portable-text/Comments'
import {config} from './config'
import {DrawYourOwnHighlight} from './inline-comment-patterns/DrawYourOwnHighlight'
import {MoveOrRelabelComposer} from './inline-comment-patterns/MoveOrRelabelComposer'
import {NestedField} from './inline-comment-patterns/NestedField'
import {RunWithoutSdkWrites} from './inline-comment-patterns/RunWithoutSdkWrites'
import {SelectNewThread} from './inline-comment-patterns/SelectNewThread'

// One entry per guide section. The first is "Comment on Portable Text"; the
// rest are the patterns from "Customize inline comments".
const fields: {
  label: string
  Field: ComponentType<{handle: DocumentHandle}>
}[] = [
  {label: 'Comment on Portable Text', Field: BodyField},
  {label: 'Select a new thread as soon as it exists', Field: SelectNewThread},
  {label: 'Move or relabel the composer', Field: MoveOrRelabelComposer},
  {label: 'Draw your own highlight', Field: DrawYourOwnHighlight},
  {label: 'Comment on a nested Portable Text field', Field: NestedField},
  {label: "Run without the SDK's writes", Field: RunWithoutSdkWrites},
]

export function App() {
  const [selected, setSelected] = useState(0)
  const handle: DocumentHandle = {
    documentId: config.documentId,
    documentType: config.documentType,
  }

  return (
    <ThemeProvider theme={buildTheme()}>
      <SanityApp
        config={{
          projectId: config.projectId,
          dataset: config.dataset,
        }}
        fallback={<p>Starting…</p>}
      >
        <AuthBoundary>
          <Container width={2} padding={4}>
            <Stack gap={4}>
              <Select
                aria-label="Guide section"
                value={selected}
                onChange={(event) =>
                  setSelected(Number(event.currentTarget.value))
                }
              >
                {fields.map((field, index) => (
                  <option key={field.label} value={index}>
                    {field.label}
                  </option>
                ))}
              </Select>
              <Card border padding={4} radius={3}>
                {/* `key` remounts the editor when the section changes. */}
                <Comments
                  key={selected}
                  handle={handle}
                  Field={fields[selected].Field}
                />
              </Card>
            </Stack>
          </Container>
        </AuthBoundary>
      </SanityApp>
    </ThemeProvider>
  )
}

// `sanity dev` renders the entry file's default export.
export default App
