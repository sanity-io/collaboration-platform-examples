# Get started with comments

A comments panel on one document: threads, replies, reactions, resolve, and a
composer for new comments, built with `SDKCommentsProvider` and
`SDKCommentsPanel` from `@sanity/collaboration`.

The code follows the guide
[Get started with comments](https://www.sanity.io/docs/collaboration/get-started).

## Run it

You need Node 24, pnpm, and a Sanity project you can read and write.

```sh
cp .env.example .env
# Fill in your project ID, dataset, organization ID and a document to comment on.
pnpm install
pnpm dev
```

`sanity dev` prints two URLs: one to open the app in your organization's
Dashboard, and `http://localhost:3333`. Add `http://localhost:3333` as a CORS
origin on the project (with credentials allowed) at
[sanity.io/manage](https://www.sanity.io/manage).

Write a comment in the composer at the top of the panel. It shows up under a
**title** heading, and the same thread appears when you open the document in
Sanity Studio.

## Differences from the guide

- The guide hardcodes `YOUR_PROJECT_ID`, `production`, and the document
  `post-123` of type `post`. This example reads them from `.env` through
  `src/config.ts`.
- `src/App.tsx` also has a default export, because `sanity dev` renders the
  entry file's default export.
- `SANITY_APP_ORGANIZATION_ID` is only used by `sanity.cli.ts`, to choose the
  Dashboard that serves the app.
