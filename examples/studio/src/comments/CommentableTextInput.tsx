import {createContext, useContext} from 'react'
import {type ArrayOfObjectsInputProps, pathToString} from 'sanity'

// The Portable Text plugins slot doesn't get the field's path, so the input
// passes it down. That lets one `commentableText` type sit on any field.
const FieldPathContext = createContext<string | null>(null)

export function CommentableTextInput(props: ArrayOfObjectsInputProps) {
  return (
    <FieldPathContext.Provider value={pathToString(props.path)}>
      {props.renderDefault(props)}
    </FieldPathContext.Provider>
  )
}

export function useFieldPath(): string | null {
  return useContext(FieldPathContext)
}
