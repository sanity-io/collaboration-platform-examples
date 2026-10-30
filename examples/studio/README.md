# Use comments in Sanity Studio

A Sanity Studio with a **Comments** view on every post. The view renders the
comments panel inside `StudioCommentsProvider`, which takes identity from the
studio's current user and user store. The studio's own comments are switched
to the Comments API with `beta.comments.v2`, so a thread started in either
place shows up in both.

## Guides

- [Use comments in Sanity Studio](https://www.sanity.io/docs/collaboration/use-in-studio)

| Guide section                             | File                                                 |
| ----------------------------------------- | ---------------------------------------------------- |
| What a studio already provides            | `src/CommentsView.tsx` (no theme or stylesheet)      |
| Supply identity from the studio           | `src/StudioCommentsProvider.tsx`                     |
| Comments are shared with the studio's own | `sanity.config.ts` (`beta.comments.v2`)              |
| The custom document view                  | `src/defaultDocumentNode.ts`, `src/CommentsView.tsx` |

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/studio my-studio
cd my-studio
cp .env.example .env
# Fill in your project ID and dataset.
pnpm install
pnpm dev
```

Open `http://localhost:3333`, create a post, and switch to its **Comments**
tab. Add `http://localhost:3333` as a CORS origin on the project (with
credentials allowed) at [sanity.io/manage](https://www.sanity.io/manage).

## Differences from the guide

- The guide doesn't say which panel to render inside
  `StudioCommentsProvider`. This example renders `SDKCommentsPanel` from
  `@sanity/collaboration/sdk`, which reads and writes through the SDK resource
  the studio mounts. So, unlike the guide says, the view does import from
  `/sdk`.
- `beta.comments.v2` is not in the guide. Without it the studio's built-in
  comments don't use the Comments API, and threads aren't shared with the
  view.
- The view passes `getPublishedId(documentId)` to the panel, so comments
  attach to the published ID even if the view is handed a draft or version ID.
