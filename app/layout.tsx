import './styles/globals.scss'
import { ClerkProvider } from '@clerk/nextjs/app-beta'
import { dark } from '@clerk/themes'
import Navigation from "./(navigation)"
import Head from './head'
import RootStyleRegistry from './emotion'

// export const metadata = {
//   title: 'Decider',
//   description: 'app',
// }

export default function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <Head />
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
