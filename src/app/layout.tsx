import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Juan Fontalvo — Desarrollador Web',
    template: '%s | Juan Fontalvo',
  },
  description: 'Portafolio y blog de Juan Fontalvo, Desarrollador Web especializado en tecnologías modernas.',
  authors: [{ name: 'Juan Fontalvo' }],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Juan Fontalvo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="layout">
          <Sidebar />
          <main className="layout__main">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
