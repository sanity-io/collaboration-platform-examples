# Comments outside React

A Node script that reads and writes comments with `@sanity/sdk/collaboration`
and no React. It creates an instance with a token, reads a document's open
threads once, follows the list as it changes, waits for the current user,
writes a comment and resolves it, then groups the open comments from a query
into threads.

## Guides

- [Use the SDK outside React](https://www.sanity.io/docs/collaboration/sdk-outside-react)

Each guide section is one function in `src/index.ts`, named after the section,
and `main` runs them in order. `src/toMessage.ts` is the helper from
[Write comments](https://www.sanity.io/docs/collaboration/sdk-write-comments#write-a-message).

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/sdk-node my-app
cd my-app
cp .env.example .env
# Fill in your project ID, dataset, an API token and a document.
pnpm install
pnpm dev
```

`pnpm dev` runs `node --env-file=.env src/index.ts`. Node 24 runs the
TypeScript directly, so there is no build step.

The script needs an API token. Create one at
[sanity.io/manage](https://www.sanity.io/manage): open the project, go to
**API** > **Tokens**, and add a token with **Editor** permissions. Put it in
`SANITY_API_TOKEN`. Comments the script writes are attributed to the token.

The script writes a real comment on the `title` field of the document and
resolves it straight away.

## Differences from the guide

- The guide hardcodes `YOUR_PROJECT_ID`, `production` and `post-123`, and
  reads the token from `SANITY_TOKEN`. This example reads them all from
  `.env` through `src/config.ts`, with the token in `SANITY_API_TOKEN`.
- `rxjs` is a direct dependency, for the `filter` and `firstValueFrom` the
  guide imports in "Wait for the current user".
- `render` and `showStale`, which the guide leaves to you, log to the console.
- "Follow a list as it changes" reads the error state in the same function
  and returns one function that unsubscribes from both.
- Relative imports end in `.ts`, which Node's type stripping needs.
