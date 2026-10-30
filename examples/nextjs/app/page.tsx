import {ClientApp} from './ClientApp'

// A server component. It renders around the client boundary.
export default function Page() {
  return (
    <main>
      <ClientApp />
    </main>
  )
}
