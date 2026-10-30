# Link to a comment

A comments list whose selection lives in the URL. Selecting a thread writes
`?comment=<id>`, so the link is shareable: pasting it opens the list on that
comment, expands collapsed replies, scrolls to it and selects its thread. The
example uses React Router, has a Copy link action on every comment, a "Jump to
the first comment" button, and widens the status filter when a link points at
a resolved comment.

## Guides

- [Link to a comment](https://www.sanity.io/docs/collaboration/link-to-a-comment)

| Guide section                                  | File                                             |
| ---------------------------------------------- | ------------------------------------------------ |
| Start with what you already have               | `src/JumpToFirst.tsx`                            |
| Hand the address to your router                | `src/Comments.tsx`                               |
| Link with React Router                         | `src/Comments.tsx`, `BrowserRouter` in `App.tsx` |
| Handle a link to a comment the panel is hiding | `src/Comments.tsx` (state), `src/Threads.tsx`    |
| Add a Copy link action                         | `src/Threads.tsx`                                |

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/link-to-a-comment my-app
cd my-app
cp .env.example .env
# Fill in your project ID, dataset, organization ID and a document to comment on.
pnpm install
pnpm dev
```

Add `http://localhost:3333` as a CORS origin on the project (with credentials
allowed) at [sanity.io/manage](https://www.sanity.io/manage).

Write a comment, click it, and copy the URL (or use **Copy link** in the
comment's menu). Open it in a new tab and the same comment is selected.
Resolve a thread and open its link while the filter is on **Open**: the filter
widens to **All** and the comment is revealed.

## Differences from the guide

- The guide's snippets show only the provider; this example adds the
  `CommentList` and `CommentThread` around it, with writes from
  `useSDKThreadCallbacks` and a `CommentInput` to start threads on `title`.
- The guide passes `thread.parentComment.id` from a `thread` in scope. Here
  `JumpToFirst` takes the threads and picks the oldest.
- The status filter is a `Select` with **Open**, **Resolved** and **All**
  (`undefined`), so you can put the list into the state the guide's last
  section is about.
- Only the React Router recipe is used. The Next.js, Studio, TanStack, path
  and no-router recipes are left to the guide.
