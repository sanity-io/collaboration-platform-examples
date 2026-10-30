import {Heading, Stack} from '@sanity/ui'
import type {ReactNode} from 'react'

// A heading named after the guide section the children come from.
export function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <Stack as="section" gap={3}>
      <Heading as="h2" size={1}>
        {title}
      </Heading>
      {children}
    </Stack>
  )
}
