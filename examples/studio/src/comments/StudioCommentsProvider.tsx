import type {CommentUser} from '@sanity/collaboration'
import {CommentsProvider} from '@sanity/collaboration/ui'
import {type ReactNode, useCallback, useRef, useState} from 'react'
import {useCurrentUser, useUserStore} from 'sanity'

export function StudioCommentsProvider({children}: {children: ReactNode}) {
  const currentUser = useCurrentUser()
  const userStore = useUserStore()
  const [users, setUsers] = useState(new Map<string, CommentUser | null>())
  const requested = useRef(new Set<string>())

  const getUser = useCallback(
    (id: string) => {
      if (users.has(id)) return users.get(id)
      if (!requested.current.has(id)) {
        requested.current.add(id)
        userStore.getUser(id).then((user) =>
          setUsers((prev) =>
            new Map(prev).set(
              id,
              user
                ? {
                    id: user.id,
                    displayName: user.displayName,
                    imageUrl: user.imageUrl,
                  }
                : null,
            ),
          ),
        )
      }
      return undefined
    },
    [users, userStore],
  )

  if (!currentUser) return null

  return (
    <CommentsProvider
      currentUser={{
        id: currentUser.id,
        displayName: currentUser.name,
        imageUrl: currentUser.profileImage,
      }}
      getUser={getUser}
    >
      {children}
    </CommentsProvider>
  )
}
