# Theme and translate

A comments page with a top nav for picking one of three themes and one of three
languages, plus a light/dark toggle. **Default** is Sanity UI's own theme,
**Brand** has a purple palette, rounder corners and more spacing, and
**Playful** has louder colours, 2px borders, big radii and bold buttons. The
languages are English, Norwegian and German. A second panel over the same
document words one action differently from the rest: there, Resolve reads
"Approve". Themes go on Sanity UI's `ThemeProvider`, and strings go on the
provider's `labels`. Both switch live, and nothing in the components is forked.

## Guides

- [Theme the components](https://www.sanity.io/docs/collaboration/theme-the-components)
- [Translate the UI text](https://www.sanity.io/docs/collaboration/translate-the-ui)

| Guide                 | Section                                                    | File                                  |
| --------------------- | ---------------------------------------------------------- | ------------------------------------- |
| Theme the components  | Change the Sanity UI theme, Use a brand palette            | `src/themes.ts`                       |
| Theme the components  | Increase corner radius and spacing                         | `src/themes.ts`                       |
| Theme the components  | Use the dark color scheme, Import the Sanity UI stylesheet | `src/App.tsx`                         |
| Theme the components  | Adjust appearance with props (`actions`)                   | `src/Panel.tsx`                       |
| Translate the UI text | Translate the whole surface                                | `src/labels/*.ts`, `src/Comments.tsx` |

The nav is in `src/TopNav.tsx`. `src/labels/index.ts` pairs each language's
`CommentsLabels` with the app's own strings (the nav and the headings).

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
menu reads **Edit** and **Delete**. In the right panel the same thread's
resolve button reads **Approve**. Use the nav to switch:

- **Language**: every string in the panels changes at once, including the
  menus, the composers, the reaction names and the nav itself. Resolve in the
  right panel reads **Godkjenn** in Norwegian and **Freigeben** in German.
- **Theme**: the whole page restyles, panels included. Try **Playful** in both
  light and dark.

## Differences from the guide

- The theme and the labels are combined in one app, with the themes in
  `src/themes.ts` and one file per language in `src/labels/`. The app holds
  the chosen theme and language in state, and passes the prebuilt theme and
  labels object to `ThemeProvider` and `SDKCommentsProvider`.
- The Playful theme goes beyond the guide's keys with `button`, `card` and
  `input` from `ThemeConfig` (border width, focus ring, button text weight).
  These replace a whole section, so it spreads the defaults from
  `buildTheme().v2` first. It also sets a few `color` tokens, which merge
  into the defaults, for darker borders and a deeper primary button in light
  mode.
- Each language adds `panel.composerPlaceholder`, `comment.edited` and the
  resolve/reopen action names to the guide's object. Without
  `composerPlaceholder`, the panel's composer still reads "Comment on title…".
- "Translate the text inside a comment", "Restyle the inline highlight",
  "Pass the strings as props", "Rename the default actions" (on
  `commentActions`) and "Timestamps" are not shown: this example has a single
  panel, no editor and no custom card.
