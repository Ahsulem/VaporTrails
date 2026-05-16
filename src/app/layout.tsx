import type { Metadata } from 'next'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import PageInit from '@/components/PageInit'
import ScrollReveal from '@/components/ScrollReveal'
import HolographicCursorTrail from '@/components/HolographicCursorTrail'
import ChatBot from '@/components/ChatBot'

export const metadata: Metadata = {
  title: 'Vaportrails — Neon drift · 2099',
  description: 'Run the underground network through Neon East before the bureau catches up.',
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HolographicCursorTrail />
        <PageInit />
        <ScrollReveal />
        <Nav />
        {children}
        <ChatBot />
      </body>
    </html>
  )
}
