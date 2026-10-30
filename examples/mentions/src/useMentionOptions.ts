import type {MentionOption} from '@sanity/collaboration'
import {useUsers} from '@sanity/sdk-react'
import {useMemo} from 'react'

// "Build the mention options": the project's users, reshaped. `sanityUserId`
// becomes `id` and the profile is flattened.
export function useMentionOptions(): MentionOption[] {
  const {data} = useUsers()

  // Memoized: it is context, so a new array every render re-renders every
  // comment under the provider.
  return useMemo(
    () =>
      data.map((user) => ({
        id: user.sanityUserId,
        displayName: user.profile.displayName,
        imageUrl: user.profile.imageUrl,
      })),
    [data],
  )
}
