import '@sanity/ui/styles.css'
import {AuthBoundary, SanityApp} from '@sanity/sdk-react'
import {
  Card,
  Container,
  Stack,
  Tab,
  TabList,
  TabPanel,
  ThemeProvider,
} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {type ComponentType, Suspense, useState} from 'react'

import {AnchorInlineComments} from './anchor-inline-comments/AnchorInlineComments'
import {config} from './config'
import {QueryComments} from './query-comments/QueryComments'
import {ReadComments} from './read-comments/ReadComments'
import {WriteComments} from './write-comments/WriteComments'

// One tab per guide.
const guides: {id: string; title: string; Guide: ComponentType}[] = [
  {id: 'read-comments', title: 'Read comments', Guide: ReadComments},
  {id: 'query-comments', title: 'Query comments', Guide: QueryComments},
  {id: 'write-comments', title: 'Write comments', Guide: WriteComments},
  {
    id: 'anchor-inline-comments',
    title: 'Anchor inline comments',
    Guide: AnchorInlineComments,
  },
]

export function App() {
  const [selected, setSelected] = useState(guides[0].id)

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
              <TabList gap={2}>
                {guides.map((guide) => (
                  <Tab
                    key={guide.id}
                    id={`${guide.id}-tab`}
                    aria-controls={`${guide.id}-panel`}
                    label={guide.title}
                    selected={selected === guide.id}
                    onClick={() => setSelected(guide.id)}
                  />
                ))}
              </TabList>
              {guides
                .filter((guide) => guide.id === selected)
                .map(({id, Guide}) => (
                  <TabPanel
                    key={id}
                    id={`${id}-panel`}
                    aria-labelledby={`${id}-tab`}
                  >
                    <Card border padding={4} radius={3}>
                      <Suspense fallback={<p>Loading comments…</p>}>
                        <Guide />
                      </Suspense>
                    </Card>
                  </TabPanel>
                ))}
            </Stack>
          </Container>
        </AuthBoundary>
      </SanityApp>
    </ThemeProvider>
  )
}

// `sanity dev` renders the entry file's default export.
export default App
