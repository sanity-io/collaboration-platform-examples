# Theme and translate

A comments panel with a purple brand palette, rounder corners, more spacing,
a light/dark toggle, and every visible string in Norwegian. A second panel over
the same document shows one surface worded differently from the rest: there,
Resolve reads "Godkjenn". The theme goes on Sanity UI's `ThemeProvider`, and
the strings go on the provider's `labels`. Nothing in the components is forked.

## Guides

- [Theme the components](https://www.sanity.io/docs/collaboration/theme-the-components)
- [Translate the UI text](https://www.sanity.io/docs/collaboration/translate-the-ui)

| Guide                 | Section                                                    | File                                   |
| --------------------- | ---------------------------------------------------------- | -------------------------------------- |
| Theme the components  | Change the Sanity UI theme, Use a brand palette            | `src/theme.ts`                         |
| Theme the components  | Increase corner radius and spacing                         | `src/theme.ts`                         |
| Theme the components  | Use the dark color scheme, Import the Sanity UI stylesheet | `src/App.tsx`                          |
| Theme the components  | Adjust appearance with props (`actions`)                   | `src/Panel.tsx`                        |
| Translate the UI text | Translate the whole surface                                | `src/labels.ts`, `src/Comments.tsx`    |
| Translate the UI text | Translate the text inside a comment                        | `src/labels.ts`, `src/ReviewPanel.tsx` |

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/theme-and-translate my-app
cd my-app
cp .env.example .env
# Fill in your project ID, dataset, organization ID and a document to comment on.
pnpm install
pnpm dev
```

Add `http://localhost:3333` as a CORS origin on the project (with credentials
allowed) at [sanity.io/manage](https://www.sanity.io/manage).

Write a comment in the left panel. Its action row is always visible, and its
menu reads **Rediger** and **Slett**. In the right panel the same thread's
resolve button reads **Godkjenn**. Use **Mørk modus** to switch scheme.

## Differences from the guide

- The theme and the labels are combined in one app, with the theme in
  `src/theme.ts` and the strings in `src/labels.ts`.
- `norwegian` adds `panel.composerPlaceholder`, `comment.edited` and the
  resolve/reopen action names to the guide's object. Without
  `composerPlaceholder`, the panel's composer still reads "Comment on title…".
- `ReviewPanel` passes `draftScope="review"` so its drafts stay apart from
  the other panel's over the same document.
- "Restyle the inline highlight", "Pass the strings as props", "Rename the
  default actions" (on `commentActions`) and "Timestamps" are not shown: this
  example has no editor and no custom card. `custom-comment` shows a card
  built from the primitives.
