// "Use the SDK outside React", top to bottom. Each function is one guide
// section; `main` runs them in order.
import {
  createSanityInstance,
  getCurrentUserState,
  type SanityInstance,
} from '@sanity/sdk'
import {
  buildCommentThreads,
  type CommentThread,
  createComment,
  getCommentsErrorState,
  getCommentThreadsState,
  resolveCommentsQuery,
  resolveCommentThreads,
  setCommentStatus,
} from '@sanity/sdk/collaboration'
import {filter, firstValueFrom} from 'rxjs'

import {config} from './config.ts'
import {toMessage} from './toMessage.ts'

const handle = {
  documentId: config.documentId,
  documentType: config.documentType,
}

// Create an instance
function createInstance(): SanityInstance {
  return createSanityInstance({
    projectId: config.projectId,
    dataset: config.dataset,
    auth: {token: config.token},
  })
}

// Read once
async function readOnce(instance: SanityInstance) {
  const threads = await resolveCommentThreads(instance, {
    ...handle,
    status: 'open',
  })
  console.log(`Read once: ${threads.length} open threads.`)
}

// Follow a list as it changes. Returns a function that stops following.
function followAList(instance: SanityInstance): () => void {
  const threads = getCommentThreadsState(instance, handle)

  const unsubscribe = threads.subscribe(() => {
    const current = threads.getCurrent()
    if (current) render(current)
  })

  // Read beside the subscribed list: it does not hold the list open itself.
  const error = getCommentsErrorState(instance, handle)
  const unsubscribeError = error.subscribe(() =>
    showStale(error.getCurrent() !== undefined),
  )

  return () => {
    unsubscribeError()
    unsubscribe()
  }
}

function render(threads: CommentThread[]) {
  console.log(`Following: ${threads.length} threads.`)
}

function showStale(stale: boolean) {
  if (stale) console.log('Following: comments are not up to date.')
}

// Wait for the current user
async function waitForTheCurrentUser(instance: SanityInstance) {
  await firstValueFrom(
    getCurrentUserState(instance).observable.pipe(filter(Boolean)),
  )
}

// Write with the instance
async function writeWithTheInstance(instance: SanityInstance) {
  const comment = await createComment(instance, {
    ...handle,
    fieldPath: 'title',
    message: toMessage('Flagged by the nightly check.'),
  })
  console.log(`Wrote comment ${comment.id}.`)

  await setCommentStatus(instance, {commentId: comment.id, status: 'resolved'})
  console.log(`Resolved comment ${comment.id}.`)
}

// Group a flat list into threads
async function groupAFlatList(instance: SanityInstance) {
  const comments = await resolveCommentsQuery(instance, {
    filter: 'status == "open"',
  })
  const threads = buildCommentThreads(comments)
  console.log(
    `Query: ${comments.length} open comments in ${threads.length} threads, across the organization.`,
  )
}

async function main() {
  const instance = createInstance()
  try {
    await readOnce(instance)
    const stopFollowing = followAList(instance)
    await waitForTheCurrentUser(instance)
    await writeWithTheInstance(instance)
    await groupAFlatList(instance)
    stopFollowing()
  } finally {
    instance.dispose()
  }
}

await main()
