# Comment on Portable Text

A Portable Text editor with inline comments beside a comments panel: select
words to start a thread, see highlights under the words each thread is about,
and click a highlight or a card to select the thread on the other side. A
switcher at the top swaps the editor for each pattern from "Customize inline
comments": selecting a new thread, a relabelled composer, a custom highlight,
a nested field, and `PortableTextComments` with your own writes.

## Guides

- [Comment on Portable Text](https://www.sanity.io/docs/collaboration/comment-on-portable-text)
- [Customize inline comments](https://www.sanity.io/docs/collaboration/inline-comment-patterns)

| Guide section                                                       | File                                                    |
| ------------------------------------------------------------------- | ------------------------------------------------------- |
| Comment on Portable Text, Step 2 and Step 3                         | `src/comment-on-portable-text/BodyField.tsx`            |
| Comment on Portable Text, Step 4                                    | `src/comment-on-portable-text/Comments.tsx`             |
| Customize inline comments: Select a new thread as soon as it exists | `src/inline-comment-patterns/SelectNewThread.tsx`       |
| Customize inline comments: Move or relabel the composer             | `src/inline-comment-patterns/MoveOrRelabelComposer.tsx` |
| Customize inline comments: Draw your own highlight                  | `src/inline-comment-patterns/DrawYourOwnHighlight.tsx`  |
| Customize inline comments: Comment on a nested Portable Text field  | `src/inline-comment-patterns/NestedField.tsx`           |
| Customize inline comments: Run without the SDK's writes             | `src/inline-comment-patterns/RunWithoutSdkWrites.tsx`   |

`src/inline-comment-patterns/PatternField.tsx` is the editor and value sync
from Step 3, shared so each pattern file shows only what it changes.
`src/App.tsx` holds the switcher.

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/portable-text my-app
cd my-app
cp .env.example .env
# Fill in your project ID, dataset, organization ID, a document, and the
# Portable Text field on it.
pnpm install
pnpm dev
```

`sanity dev` prints two URLs: one to open the app in your organization's
Dashboard, and `http://localhost:3333`. Add `http://localhost:3333` as a CORS
origin on the project (with credentials allowed) at
[sanity.io/manage](https://www.sanity.io/manage).

Point `SANITY_APP_PORTABLE_TEXT_PATH` at a field of plain text blocks: the
editor's schema only knows `strong` and `em`. For the nested field pattern, set
`SANITY_APP_NESTED_PORTABLE_TEXT_PATH` to an array inside a block, such as
`body[_key=="callout-1"].content`.

## Differences from the guide

- The guides hardcode the field as `body`. This example reads it from
  `SANITY_APP_PORTABLE_TEXT_PATH`, and the document from `.env`, through
  `src/config.ts`.
- `ValueSync` destructures its props so the effect dependencies pass the
  `react-hooks/exhaustive-deps` lint rule. It behaves the same.
- `Comments` takes an optional `Field` prop so the switcher can swap in each
  pattern. Without it, it renders the guide's `BodyField`.
- Each pattern renders the full editor around the guide's snippet, through
  `PatternField`.
- "Draw your own highlight" adds colors and a pointer cursor to the `<mark>`,
  so the custom highlight is visible and its active state shows.
- "Run without the SDK's writes" stands `useCommentActions` in for the
  guide's `api`, and turns the range into the SDK's `anchor`.
