import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Qynce - Jouw AI Team',
  description: 'Krijg toegang tot 8+ AI-assistenten voor slechts €12 per maand. Van email schrijven tot data analyse - jouw virtuele team staat klaar.',
  keywords: 'AI, assistenten, automatisering, productiviteit, Nederland, goedkoop, agents',
  openGraph: {
    title: 'Qynce - Jouw AI Team',
    description: 'Krijg toegang tot 8+ AI-assistenten voor slechts €12 per maand.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
