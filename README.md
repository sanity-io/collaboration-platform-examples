# Collaboration platform examples

Small apps you can run for each guide in the
[`@sanity/collaboration` docs](https://www.sanity.io/docs/collaboration). Each
folder under `examples/` is self-contained: most are [Sanity App SDK](https://www.sanity.io/docs/app-sdk)
apps, plus a Next.js app, a studio and a Node script. You can copy one out and
run it by itself.

## Examples

| Example                                                 | What it shows                                   | Guides                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [\`get-started\`](examples/get-started)                 | The comments panel on one document              | [Get started with comments](https://www.sanity.io/docs/collaboration/get-started)                                                                                                                                                                                                                                                        |
| [\`nextjs\`](examples/nextjs)                           | The panel in a Next.js App Router app           | [Use comments in Next.js](https://www.sanity.io/docs/collaboration/use-in-nextjs)                                                                                                                                                                                                                                                        |
| [\`studio\`](examples/studio)                           | The panel in a Sanity Studio document view      | [Use comments in Sanity Studio](https://www.sanity.io/docs/collaboration/use-in-studio)                                                                                                                                                                                                                                                  |
| [\`link-to-a-comment\`](examples/link-to-a-comment)     | Shareable links to a comment, with React Router | [Link to a comment](https://www.sanity.io/docs/collaboration/link-to-a-comment)                                                                                                                                                                                                                                                          |
| [\`mentions\`](examples/mentions)                       | @-mentions and a mentions inbox                 | [Enable mentions](https://www.sanity.io/docs/collaboration/enable-mentions)                                                                                                                                                                                                                                                              |
| [\`portable-text\`](examples/portable-text)             | Inline comments on a Portable Text field        | [Comment on Portable Text](https://www.sanity.io/docs/collaboration/comment-on-portable-text), [Customize inline comments](https://www.sanity.io/docs/collaboration/inline-comment-patterns)                                                                                                                                             |
| [\`document-list\`](examples/document-list)             | Comment counts and previews across documents    | [Show comment counts](https://www.sanity.io/docs/collaboration/show-comment-counts), [Show a comment preview](https://www.sanity.io/docs/collaboration/show-a-comment-preview)                                                                                                                                                           |
| [\`custom-comment\`](examples/custom-comment)           | A custom comment card and its actions           | [Build a custom comment](https://www.sanity.io/docs/collaboration/build-a-custom-comment), [Customize comment actions](https://www.sanity.io/docs/collaboration/customize-comment-actions)                                                                                                                                               |
| [\`theme-and-translate\`](examples/theme-and-translate) | A branded, dark, translated panel               | [Theme the components](https://www.sanity.io/docs/collaboration/theme-the-components), [Translate the UI text](https://www.sanity.io/docs/collaboration/translate-the-ui)                                                                                                                                                                |
| [\`sdk-hooks\`](examples/sdk-hooks)                     | The SDK hooks without the UI components         | [Read comments](https://www.sanity.io/docs/collaboration/sdk-read-comments), [Query comments](https://www.sanity.io/docs/collaboration/sdk-query-comments), [Write comments](https://www.sanity.io/docs/collaboration/sdk-write-comments), [Anchor inline comments](https://www.sanity.io/docs/collaboration/sdk-anchor-inline-comments) |
| [\`sdk-node\`](examples/sdk-node)                       | A Node script that reads and writes comments    | [Use the SDK outside React](https://www.sanity.io/docs/collaboration/sdk-outside-react)                                                                                                                                                                                                                                                  |

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
