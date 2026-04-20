import '@/styles/global.css'
import '@/styles/theme.css'
import '@/styles/typography.css'
//-- Dependancies --
import { cookies } from 'next/headers'

//-- Font --
import { Roboto } from 'next/font/google'

//-- Components --
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const roboto = Roboto({
  subsets: ['latin'],
  weight: 'variable',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value === 'light' ? 'light-theme' : ''

  return (
    <html lang="fr" className={`${roboto.className} ${theme}`}>
      <head>
        <link rel="icon" href="/img/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <div className="container">
          <Header />

          <main>{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  )
}
