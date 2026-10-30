# Translate

A comments panel with a language picker in a top nav. The languages are
English, Norwegian and German. Each one is a `CommentsLabels` object on the
provider's `labels`, and switching changes every string in the panel at once.
Nothing in the components is forked.

## Guides

- [Translate the UI text](https://www.sanity.io/docs/collaboration/translate-the-ui)

| Section                     | File                                  |
| --------------------------- | ------------------------------------- |
| Translate the whole surface | `src/labels/*.ts`, `src/Comments.tsx` |

The nav is in `src/TopNav.tsx`. `src/labels/index.ts` pairs each language's
`CommentsLabels` with the app's own strings (the nav and the headings).

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/translate my-app
cd my-app
cp .env.example .env
# Fill in your project ID, dataset, organization ID and a document to comment on.
pnpm install
pnpm dev
```

Add `http://localhost:3333` as a CORS origin on the project (with credentials
allowed) at [sanity.io/manage](https://www.sanity.io/manage).

Write a comment, then pick another language in the nav. Every string in the
panel changes at once, including the menus, the composer, the reaction names
and the nav itself.

## Differences from the guide

- One file per language in `src/labels/`. The app holds the chosen language in
  state and passes its prebuilt labels object to `SDKCommentsProvider`.
- Each language adds `panel.composerPlaceholder`, `comment.edited` and the
  resolve/reopen action names to the guide's object. Without
  `composerPlaceholder`, the panel's composer still reads "Comment on title…".
- "Translate the text inside a comment", "Pass the strings as props", "Rename
  the default actions" (on `commentActions`) and "Timestamps" are not shown:
  this example has a single panel, no editor and no custom card.
