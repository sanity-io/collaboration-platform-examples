# Use comments in Sanity Studio

A Sanity Studio with a `commentableText` field type: the studio's own Portable
Text editor with this library's inline comments added. The post's **Body**
uses it (`type: 'commentableText'`), and everything else is a default studio.
Select words in **Body** and a **Comment** button opens the
inline composer; each open thread is highlighted under its words. The
**Comments** inspector beside the form (the comment icon in the document
header) is the comments panel, and it stays open while you edit. Click a
highlight and its thread is selected in the panel; click a thread and its
highlight is selected. Identity comes from the studio's current user and user
store, and the comments are read and written through the SDK resource the
studio mounts.

## Guides

- [Use comments in Sanity Studio](https://www.sanity.io/docs/collaboration/use-in-studio)

| Guide section                   | File                                                                                               |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| What a studio already provides  | `src/comments/CommentsInspector.tsx`, `src/comments/InlineCommentsPlugin.tsx` (no theme or styles) |
| Supply identity from the studio | `src/comments/StudioCommentsProvider.tsx`, mounted in `src/comments/CommentsLayout.tsx`            |
| (Mount point) Field type        | `src/schemaTypes/commentableText.ts`, used by `body` in `src/schemaTypes/post.ts`                  |
| (Mount point) Studio plugin     | `src/comments/CommentsInspector.tsx`, `sanity.config.ts` (`document.inspectors`)                   |

The field type adds the inline comments through the Portable Text plugins slot
(`components.portableText.plugins`), so they render inside the studio's own
editor, and the toolbar, presence, validation and patches work as usual. Its
input (`CommentableTextInput`) only passes the field's path down, so any field
can use the type. See [Comment on Portable Text](https://www.sanity.io/docs/collaboration/comment-on-portable-text)
for the same component in an app.

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/studio my-studio
cd my-studio
cp .env.example .env
# Fill in your project ID and dataset.
pnpm install
pnpm dev
```

Open `http://localhost:3333`, create a post, write something in **Body**, and
select a few words. Add `http://localhost:3333` as a CORS origin on the
project (with credentials allowed) at
[sanity.io/manage](https://www.sanity.io/manage).

## Sharing with Studio's own comments

This example turns the studio's built-in comments off
(`document.comments.enabled: false` in `sanity.config.ts`), so only this
library's UI shows. To keep both, remove that line and set
`beta: {comments: {v2: true}}`: the studio's comments then use the same
Comments API, and a thread started in either UI shows up in the other. Both
options are marked internal in the `sanity` typings, so check them against
your studio version.

## Differences from the guide

- The guide shows no mount point. This example mounts the panel as a document
  inspector, beside the form, and the inline comments through a
  `commentableText` field type.
- `StudioCommentsProvider` wraps the whole studio, through
  `studio.components.layout`, rather than the panel alone. The form and the
  inspector sit in different parts of the document pane, and one provider
  above both is what shares the active comment between them.
- The panel and the inline comments are `SDKCommentsPanel` and
  `SDKPortableTextComments` from `@sanity/collaboration/sdk`: they read and
  write through the SDK resource the studio mounts. So, unlike what the guide
  says, the example imports from `/sdk`.
- The studio's built-in comments are off (`document.comments.enabled: false`),
  and `beta.comments.v2` isn't set, so "Comments are shared with the studio's
  own" doesn't apply here. See above.
- The panel passes `getPublishedId(documentId)`, so comments attach to the
  published ID whatever version is open. The inline comments pass the form's
  own `_id` (the draft while there is one), so their anchors follow the text
  being edited.
