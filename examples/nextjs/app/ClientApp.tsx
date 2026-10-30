'use client'

import dynamic from 'next/dynamic'

// `SanityApp` reads `window` while it renders, so the SDK tree can't be
// server-rendered. Load it in the browser only. `ssr: false` is only allowed in
// a client component, which is why this wrapper exists.
export const ClientApp = dynamic(() => import('./App').then((m) => m.App), {
  ssr: false,
  loading: () => <p>Starting…</p>,
})
