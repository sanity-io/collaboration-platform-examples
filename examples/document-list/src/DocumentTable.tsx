import {CommentBadge} from '@sanity/collaboration/ui'
import {useDocuments} from '@sanity/sdk-react'
import {useCommentsQuery} from '@sanity/sdk-react/collaboration'
import {Box, Button, Card, Flex, Heading, Stack, Text} from '@sanity/ui'
import {useMemo} from 'react'

import {config} from './config'

// "Show comment counts" > "Count across documents": one query for every row,
// grouped here, instead of one suspending read per row.
export function DocumentTable(props: {
  selected: string | undefined
  onSelect: (documentId: string) => void
}) {
  const {selected, onSelect} = props
  const {
    data: documents,
    hasMore,
    loadMore,
  } = useDocuments({
    documentType: config.documentType,
  })

  // The filter runs over every comment the organization can read, so the
  // prefix keeps it to this dataset.
  const {comments} = useCommentsQuery({
    filter:
      'string::startsWith(target.document._ref, $prefix) && status == "open"',
    params: {prefix: `dataset:${config.projectId}.${config.dataset}:`},
  })

  // `documentId` is always the published ID.
  const countsByDocument = useMemo(() => {
    const counts = new Map<string, number>()

    for (const comment of comments) {
      counts.set(comment.documentId, (counts.get(comment.documentId) ?? 0) + 1)
    }

    return counts
  }, [comments])

  return (
    <Stack gap={3}>
      <Heading size={1}>{config.documentType} documents</Heading>

      {documents.map((doc) => (
        <Card
          key={doc.documentId}
          padding={2}
          radius={2}
          tone={doc.documentId === selected ? 'primary' : 'default'}
          border
        >
          <Flex align="center" gap={2}>
            <Box flex={1}>
              <Button
                mode="bleed"
                justify="flex-start"
                text={doc.documentId}
                onClick={() => onSelect(doc.documentId)}
              />
            </Box>
            <CommentBadge
              count={countsByDocument.get(doc.documentId) ?? 0}
              onClick={() => onSelect(doc.documentId)}
            />
          </Flex>
        </Card>
      ))}

      {documents.length === 0 && (
        <Text muted size={1}>
          No {config.documentType} documents in this dataset.
        </Text>
      )}

      {hasMore && <Button mode="ghost" text="Load more" onClick={loadMore} />}
    </Stack>
  )
}
