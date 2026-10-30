# Comment SDK hooks

The four SDK guides in one App SDK app, one tab per guide, using the
`@sanity/sdk-react/collaboration` hooks directly with plain Sanity UI and no
`@sanity/collaboration` components: read a document's comments and threads,
query comments with GROQ, write every kind of comment change, and anchor
comments to a run of Portable Text.

## Guides

- [Read comments](https://www.sanity.io/docs/collaboration/sdk-read-comments)
- [Query comments](https://www.sanity.io/docs/collaboration/sdk-query-comments)
- [Write comments](https://www.sanity.io/docs/collaboration/sdk-write-comments)
- [Anchor inline comments](https://www.sanity.io/docs/collaboration/sdk-anchor-inline-comments)

Each guide is one file, with one component per guide section, named after the
section:

| Guide                  | File                                                   |
| ---------------------- | ------------------------------------------------------ |
| Read comments          | `src/read-comments/ReadComments.tsx`                   |
| Query comments         | `src/query-comments/QueryComments.tsx`                 |
| Write comments         | `src/write-comments/WriteComments.tsx`, `toMessage.ts` |
| Anchor inline comments | `src/anchor-inline-comments/AnchorInlineComments.tsx`  |

`src/App.tsx` holds the tabs. `src/Section.tsx` and `src/toPlainText.ts` are
display helpers, not from the guides.

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/sdk-hooks my-app
cd my-app
cp .env.example .env
# Fill in your project ID, dataset, organization ID and a document. The
# "Anchor inline comments" tab also needs a Portable Text field on it with at
# least one paragraph.
pnpm install
pnpm dev
```

`sanity dev` prints two URLs: one to open the app in your organization's
Dashboard, and `http://localhost:3333`. Add `http://localhost:3333` as a CORS
origin on the project (with credentials allowed) at
[sanity.io/manage](https://www.sanity.io/manage).

## Differences from the guide

- The guides hardcode `post-123`, `article`/`post`, `title`, `body` and
  `YOUR_PROJECT_ID`. This example reads them from `.env` through
  `src/config.ts`.
- The guides' snippets are fragments. Each one is wrapped in a component named
  after its section, with buttons to trigger the writes.
- Read comments: "Wrap the read in Suspense" and "Show a dropped connection"
  share one `Threads` component, since both guide snippets are the same
  component. It uses `<output>` instead of `<p role="status">`, as the
  jsx-a11y lint rule asks.
- Read comments, "Hide threads on removed fields": the guide only describes
  this. The example filters on a hardcoded list of known fields.
- Query comments, "Filters that update instantly": the cutoff is computed in a
  lazy `useState`, not `useMemo`, because the React purity lint rule rejects
  calling `Date.now()` during render.
- Query comments: the dataset prefix is built from `.env`, and "Group the
  results into threads" passes this document's ref as `refs`.
- Anchor inline comments: block `_key`s come from the document's Portable Text
  field, read with `useDocument`. "Anchor into unsaved text" builds its
  `fieldValue` from a text input.
