# Collaboration platform examples

Small apps you can run for each guide in the
[`@sanity/collaboration` docs](https://www.sanity.io/docs/collaboration). Each
folder under `examples/` is a standalone
[Sanity App SDK](https://www.sanity.io/docs/app-sdk) app. You can copy one out
and run it by itself.

## Examples

| Example                                           | Guides                                                                                                                                                                                     | Status |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| [`get-started`](examples/get-started)             | [Get started with comments](https://www.sanity.io/docs/collaboration/get-started)                                                                                                          | Ready  |
| `use-in-nextjs`                                   | [Use comments in Next.js](https://www.sanity.io/docs/collaboration/use-in-nextjs)                                                                                                          | Coming |
| `use-in-studio`                                   | [Use comments in Sanity Studio](https://www.sanity.io/docs/collaboration/use-in-studio)                                                                                                    | Coming |
| [`link-to-a-comment`](examples/link-to-a-comment) | [Link to a comment](https://www.sanity.io/docs/collaboration/link-to-a-comment)                                                                                                            | Ready  |
| [`mentions`](examples/mentions)                   | [Enable mentions](https://www.sanity.io/docs/collaboration/enable-mentions)                                                                                                                | Ready  |
| `comment-on-portable-text`                        | [Comment on Portable Text](https://www.sanity.io/docs/collaboration/comment-on-portable-text)                                                                                              | Coming |
| `inline-comment-patterns`                         | [Customize inline comments](https://www.sanity.io/docs/collaboration/inline-comment-patterns)                                                                                              | Coming |
| [`document-list`](examples/document-list)         | [Show comment counts](https://www.sanity.io/docs/collaboration/show-comment-counts), [Show a comment preview](https://www.sanity.io/docs/collaboration/show-a-comment-preview)             | Ready  |
| [`custom-comment`](examples/custom-comment)       | [Build a custom comment](https://www.sanity.io/docs/collaboration/build-a-custom-comment), [Customize comment actions](https://www.sanity.io/docs/collaboration/customize-comment-actions) | Ready  |
| `theme-the-components`                            | [Theme the components](https://www.sanity.io/docs/collaboration/theme-the-components)                                                                                                      | Coming |
| `translate-the-ui`                                | [Translate the UI text](https://www.sanity.io/docs/collaboration/translate-the-ui)                                                                                                         | Coming |
| `sdk-read-comments`                               | [Read comments](https://www.sanity.io/docs/collaboration/sdk-read-comments)                                                                                                                | Coming |
| `sdk-query-comments`                              | [Query comments](https://www.sanity.io/docs/collaboration/sdk-query-comments)                                                                                                              | Coming |
| `sdk-write-comments`                              | [Write comments](https://www.sanity.io/docs/collaboration/sdk-write-comments)                                                                                                              | Coming |
| `sdk-anchor-inline-comments`                      | [Anchor inline comments](https://www.sanity.io/docs/collaboration/sdk-anchor-inline-comments)                                                                                              | Coming |
| `sdk-outside-react`                               | [Use the SDK outside React](https://www.sanity.io/docs/collaboration/sdk-outside-react)                                                                                                    | Coming |

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
