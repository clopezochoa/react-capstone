import type { Metadata } from 'next'
import './globals.css'
import { Krub } from 'next/font/google'

const krub = Krub({
  weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-krub',
})

import Navbar from '@/Navbar/Navbar';

export const metadata: Metadata = {
  title: 'Stay Healthy',
  description: 'Medical appointment service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={`${krub.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
