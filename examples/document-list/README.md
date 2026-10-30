# Document list

A list of documents with a comment count on each row, and a detail view for
the selected document: a badge per field, a hover preview of the field's
newest thread, and the threads below. A switch turns the threads into a
read-only `CommentsPanel`. Counts come from one read per surface, never one
per row.

## Guides

- [Show comment counts](https://www.sanity.io/docs/collaboration/show-comment-counts)
- [Show a comment preview](https://www.sanity.io/docs/collaboration/show-a-comment-preview)

| Guide                  | Section                                       | File                                           |
| ---------------------- | --------------------------------------------- | ---------------------------------------------- |
| Show comment counts    | Count the threads on one document             | `src/DocumentComments.tsx`                     |
| Show comment counts    | Count across documents                        | `src/DocumentTable.tsx`                        |
| Show comment counts    | Render the empty, unread, and resolved states | `src/DocumentComments.tsx` (`FieldBadge`)      |
| Show comment counts    | Open a thread from a badge                    | `src/DocumentComments.tsx` (`list` ref)        |
| Show a comment preview | Render the preview, Clamp the message         | `src/CommentPreview.tsx`, `src/FieldBadge.tsx` |
| Show a comment preview | Make the panel read-only                      | `src/ReadOnlyPanel.tsx`                        |

## How to use

```sh
npx degit sanity-io/collaboration-platform-examples/examples/document-list my-app
cd my-app
cp .env.example .env
# Fill in your project ID, dataset, organization ID and the document type to list.
pnpm install
pnpm dev
```

Add `http://localhost:3333` as a CORS origin on the project (with credentials
allowed) at [sanity.io/manage](https://www.sanity.io/manage).

Pick a document. Click the `title` badge to start a thread on it, then hover
the badge to see the preview. The row's count in the list updates too.

## Differences from the guide

- The guide reads `useCommentThreads({...handle, status: 'open'})`. This
  example reads both statuses and filters to open threads itself, because the
  resolved badge state needs the resolved threads and `CommentsPanel` takes
  threads of both statuses.
- `openPanel('title')` in the guide becomes: scroll the list to the field if it
  has open threads, otherwise open a composer for the first one (a field with
  no threads has no group to scroll to).
- `unread` is not shown: nothing in the SDK tracks read state.
- The guide's `YOUR_PROJECT_ID` and `production` in the dataset prefix come
  from `.env`.
- Rows show the document ID rather than a title, to keep the example about
  comments.
- The preview opens on hover, via a small `FieldBadge` wrapper around
  `CommentBadge` and `CommentPreview`. The guide leaves the trigger open.
