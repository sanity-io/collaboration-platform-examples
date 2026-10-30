# Use comments in Next.js

The get-started comments panel in a Next.js App Router app: the client
boundary, `@sanity/ui/styles.css` in the root layout, the styled-components
compiler, and a styled-components registry.

## Guides

- [Use comments in Next.js](https://www.sanity.io/docs/collaboration/use-in-nextjs)

| Guide section                            | File                                                 |
| ---------------------------------------- | ---------------------------------------------------- |
| Mark the client boundary once            | `app/Comments.tsx`, `app/ClientApp.tsx`              |
| Import the stylesheet in the root layout | `app/layout.tsx`                                     |
| Enable the styled-components compiler    | `next.config.ts`                                     |
| Add a styled-components registry         | `app/StyledComponentsRegistry.tsx`, `app/layout.tsx` |
| The panel itself (from Get started)      | `app/App.tsx`, `app/Comments.tsx`                    |

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/nextjs my-app
cd my-app
cp .env.example .env
# Fill in your project ID, dataset and a document to comment on.
pnpm install
pnpm dev
```

Add `http://localhost:3000` as a CORS origin on the project (with credentials
allowed) at [sanity.io/manage](https://www.sanity.io/manage).

## Differences from the guide

- `SanityApp` reads `window` while it renders, so the SDK tree can't be
  server-rendered: `next build` fails with `window is not defined` when it
  prerenders the page. `app/ClientApp.tsx` loads `App` with
  `next/dynamic` and `ssr: false`, and `app/page.tsx` (a server component)
  renders `ClientApp`.
- The guide shows only the `'use client'` line of `Comments.tsx`. Here
  `App.tsx` and `Comments.tsx` are the Get started files, configured from
  `.env` through `app/config.ts` instead of hardcoded IDs.
