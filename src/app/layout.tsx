import type { Metadata } from 'next'
import 'styles/globals.css';
import Navigation from 'app/ui/navigation';
import Footer from './ui/footer';
import {krub} from 'app/lib/fonts';
import ClientApplication from './ui/client-application';

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
    <html lang="en" className={krub.className}>
      <body className='bg-white grid'>
        <Navigation />
        <div style={{paddingTop:'90px'}}>
          <ClientApplication>
            {children}
          </ClientApplication>
        </div>
        <Footer />
      </body>
    </html>
  )
}
