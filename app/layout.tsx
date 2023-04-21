import './styles/globals.scss'
import { ClerkProvider } from '@clerk/nextjs/app-beta'
import { dark } from '@clerk/themes'
import Navigation from "./(navigation)"
import RootStyleRegistry from './emotion'

export const metadata = {
  title: 'Decider',
  description: 'Let others decide for you',
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  other: {
    HandheldFriendly: "true"
  }
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <ClerkProvider
          appearance={{
            baseTheme: dark
          }}
        >
          <RootStyleRegistry>
            <Navigation />
            {children}
          </RootStyleRegistry>
        </ClerkProvider>
      </body>
    </html >
  )
}
