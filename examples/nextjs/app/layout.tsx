import '@sanity/ui/styles.css'

import {StyledComponentsRegistry} from './StyledComponentsRegistry'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
