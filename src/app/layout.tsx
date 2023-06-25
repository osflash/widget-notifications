import { Header } from '~/components/Header'
import './globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'
import { Footer } from '~/components/Footer'
import { Providers } from '~/providers'

const font = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'OsFlash - Notificações',
  description: 'Receba minhas notificações!'
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="pt-BR" className={font.variable}>
      <body>
        <Providers>
          <Header />

          <>{children}</>

          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
