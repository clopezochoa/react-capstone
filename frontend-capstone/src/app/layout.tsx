import type { Metadata } from 'next'
import '../styles/globals.css';
import Navigation from './ui/navigation';
import fonts from './lib/fonts';

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
    <html lang="en" className={`${fonts[0].variable}`}>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
