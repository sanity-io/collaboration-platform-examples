# Mentions

A comments panel with the `@` mention picker turned on, beside an inbox of
every comment that mentions you. The picker lists the project's users from
`useUsers`, and the inbox is a `useCommentsQuery` filter that looks for
mention objects inside each message.

## Guides

- [Enable mentions](https://www.sanity.io/docs/collaboration/enable-mentions)

| Guide section             | File                       |
| ------------------------- | -------------------------- |
| Build the mention options | `src/useMentionOptions.ts` |
| Pass them to the provider | `src/Comments.tsx`         |
| Query for mentions        | `src/MentionsInbox.tsx`    |

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/mentions my-app
cd my-app
cp .env.example .env
# Fill in your project ID, dataset, organization ID and a document to comment on.
pnpm install
pnpm dev
```

Add `http://localhost:3333` as a CORS origin on the project (with credentials
allowed) at [sanity.io/manage](https://www.sanity.io/manage). Reading the
project's users needs a role that can see them.

Type `@` in the composer, pick yourself, and post. The comment shows up in
**Mentions of you**.

## Differences from the guide

- "Mark users who may not be mentioned" is not wired: `useUsers` has no
  per-document permission to map onto `granted`. To try it, set
  `granted: false` on some options in `src/useMentionOptions.ts`.
- The inbox renders each `Comment` read-only. The query returns comments from
  every dataset in the organization, and `useCommentActions` writes to the
  app's own dataset, so offering writes on them could aim at the wrong one.
- The inbox labels each comment with its document and field, since it spans
  documents.
