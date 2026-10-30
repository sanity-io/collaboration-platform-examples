import type {DefaultDocumentNodeResolver} from 'sanity/structure'

import {CommentsView} from './CommentsView'

// Posts get a "Comments" view next to the form: the custom document view the
// guide mounts the panel in.
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  {schemaType},
) => {
  if (schemaType !== 'post') return S.document()
  return S.document().views([
    S.view.form(),
    S.view.component(CommentsView).title('Comments'),
  ])
}
