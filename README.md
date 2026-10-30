# Collaboration platform examples

Small apps you can run for each guide in the
[`@sanity/collaboration` docs](https://www.sanity.io/docs/collaboration). Each
folder under `examples/` is self-contained: most are [Sanity App SDK](https://www.sanity.io/docs/app-sdk)
apps, plus a Next.js app. You can copy one out and run it by itself.

## Examples

| Example                                             | What it shows                                   | Guides                                                                                                                                                                         |
| --------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [\`get-started\`](examples/get-started)             | The comments panel on one document              | [Get started with comments](https://www.sanity.io/docs/collaboration/get-started)                                                                                              |
| [\`nextjs\`](examples/nextjs)                       | The panel in a Next.js App Router app           | [Use comments in Next.js](https://www.sanity.io/docs/collaboration/use-in-nextjs)                                                                                              |
| [\`link-to-a-comment\`](examples/link-to-a-comment) | Shareable links to a comment, with React Router | [Link to a comment](https://www.sanity.io/docs/collaboration/link-to-a-comment)                                                                                                |
| [\`mentions\`](examples/mentions)                   | @-mentions and a mentions inbox                 | [Enable mentions](https://www.sanity.io/docs/collaboration/enable-mentions)                                                                                                    |
| [\`document-list\`](examples/document-list)         | Comment counts and previews across documents    | [Show comment counts](https://www.sanity.io/docs/collaboration/show-comment-counts), [Show a comment preview](https://www.sanity.io/docs/collaboration/show-a-comment-preview) |
| [\`translate\`](examples/translate)                 | The UI in three languages, picked live          | [Translate the UI text](https://www.sanity.io/docs/collaboration/translate-the-ui)                                                                                             |

## Run an example

Each example's README covers its setup. The short version:

```sh
cd examples/get-started
cp .env.example .env   # fill in your project, dataset, organization and document
pnpm install
pnpm dev
```

## Checks

From the repository root:

```sh
pnpm install
pnpm check:types
pnpm check:lint
pnpm check:format
pnpm build
```
