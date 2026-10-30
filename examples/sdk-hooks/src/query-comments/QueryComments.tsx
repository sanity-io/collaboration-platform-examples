// "Query comments". One component per guide section, top to bottom.
import {
  buildCommentThreads,
  useCommentsQuery,
} from '@sanity/sdk-react/collaboration'
import {useCurrentUser} from '@sanity/sdk-react'
import {Stack, Text} from '@sanity/ui'
import {useMemo, useState} from 'react'

import {config, handle} from '../config'
import {Section} from '../Section'

export function QueryComments() {
  const user = useCurrentUser()
  // Refs look like `dataset:{projectId}.{dataset}:{documentId}`.
  const prefix = `dataset:${config.projectId}.${config.dataset}:`

  return (
    <Stack gap={5}>
      <Section title="Write a filter">
        {user ? <Mentions userId={user.id} /> : <Text>Not signed in.</Text>}
      </Section>
      <Section title="Scope to one dataset">
        <OpenInDataset prefix={prefix} />
      </Section>
      <Section title="Group the results into threads">
        <OpenThreadsAcross refs={[`${prefix}${handle.documentId}`]} />
      </Section>
      <Section title="Filters that update instantly">
        <LastSevenDays />
      </Section>
    </Stack>
  )
}

function Mentions({userId}: {userId: string}) {
  const {comments} = useCommentsQuery({
    filter:
      'count(message[].children[_type == "mention" && userId == $userId]) > 0',
    params: {userId},
  })

  return (
    <Text>
      <span>{comments.length}</span> comments mention you, across the
      organization.
    </Text>
  )
}

function OpenInDataset({prefix}: {prefix: string}) {
  const {comments} = useCommentsQuery({
    filter:
      'string::startsWith(target.document._ref, $prefix) && status == "open"',
    params: {prefix},
  })

  return (
    <Text>
      {comments.length} open comments in <code>{config.dataset}</code>.
    </Text>
  )
}

function OpenThreadsAcross({refs}: {refs: string[]}) {
  const {comments} = useCommentsQuery({
    filter: 'target.document._ref in $refs',
    params: {refs},
  })
  const threads = useMemo(
    () =>
      buildCommentThreads(comments).filter(
        (thread) => thread.status === 'open',
      ),
    [comments],
  )

  return (
    <Text>
      <span>{threads.length}</span> open threads on{' '}
      <code>{handle.documentId}</code>.
    </Text>
  )
}

function LastSevenDays() {
  // A parameter rather than `now()`, so the filter can be matched locally.
  // A lazy `useState` rather than the guide's `useMemo`, which the React
  // purity lint rule rejects for calling `Date.now()` during render.
  const [since] = useState(() =>
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  )
  const {comments} = useCommentsQuery({
    filter: '_createdAt > $since',
    params: {since},
  })

  return <Text>{comments.length} comments in the last seven days.</Text>
}
