# Custom comment

A comment card built from the package's primitives instead of the default
`Comment`. It does everything `Comment` does but changes two things: the
emoji picker stays in the header, and the action menu has a "Mark as spam"
entry. The actions are an array from `commentActions`: the card adds an
entry, leaves Copy link off replies, owns the edit and delete flows, and
lets a provider policy gray out Delete on resolved comments.

## Guides

- [Build a custom comment](https://www.sanity.io/docs/collaboration/build-a-custom-comment)
- [Customize comment actions](https://www.sanity.io/docs/collaboration/customize-comment-actions)

| Guide                     | Section                                                   | File                        |
| ------------------------- | --------------------------------------------------------- | --------------------------- |
| Build a custom comment    | Declare the hover reveal, Choose the card's tone          | `src/CustomComment.tsx`     |
| Build a custom comment    | Read what the card needs, Wire selection and deep links   | `src/CustomComment.tsx`     |
| Build a custom comment    | Resolve the author (`ParticipantAvatar`)                  | `src/CommentThreadCard.tsx` |
| Build a custom comment    | Compose the header, Render the body, Show a failed create | `src/CustomComment.tsx`     |
| Build a custom comment    | Render the reactions, Confirm a delete, Assemble the card | `src/CustomComment.tsx`     |
| Build a custom comment    | Build the action list                                     | `src/CommentActions.tsx`    |
| Customize comment actions | Build the default list, Add an action, Remove an action   | `src/CommentActions.tsx`    |
| Customize comment actions | Own the flow an action starts                             | `src/CustomComment.tsx`     |
| Customize comment actions | Let capabilities decide what is disabled                  | `src/Comments.tsx`          |
| Customize comment actions | Reactions are not actions                                 | `src/CommentActions.tsx`    |

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/custom-comment my-app
cd my-app
cp .env.example .env
# Fill in your project ID, dataset, organization ID and a document to comment on.
pnpm install
pnpm dev
```

Add `http://localhost:3333` as a CORS origin on the project (with credentials
allowed) at [sanity.io/manage](https://www.sanity.io/manage).

Write a comment, hover it to see the action row, and try Edit, Delete,
Resolve and **Mark as spam**. Once a thread is resolved, its Delete entry is
grayed out.

## Differences from the guide

- The action row (`commentActions`, the spam entry, `AddReactionButton` and
  `CommentActionBar`) is its own `CommentActions` component, so the
  "Customize comment actions" guide maps to one file. `ActionRow` moved there
  with it, and `CustomComment` imports it for the hover reveal.
- `CommentActions` also passes `onCopyLink` on thread parents only, to show
  removing an action by leaving its callback out.
- The provider has a capability policy (no delete on resolved comments) where
  the guide's snippet uses `canDelete: isAdmin` on a bare `CommentsProvider`.
  `SDKCommentsProvider` takes the same `capabilities` prop.
- The guide shows the card only. This example renders threads with
  `useCommentThreads`, one `CustomComment` per comment, with a reply
  composer per thread and a composer for new threads on `title`.
- `autoFocus` on the edit composer has an `oxlint-disable` comment, because
  the `jsx-a11y/no-autofocus` lint rule flags it.
- "Mark as spam" only flags the comment in local state, as in the guide.
