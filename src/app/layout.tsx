import type { Metadata } from 'next'
import 'styles/globals.css';
import Navigation from 'app/ui/navigation';
import Footer from './ui/footer';
import fonts from 'app/lib/fonts';

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
      <body className='bg-white'>
        <Navigation />
        <div style={{paddingTop:'90px'}}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
