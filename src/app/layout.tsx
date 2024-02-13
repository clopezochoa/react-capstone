import type { Metadata } from 'next'
import 'styles/globals.css';
import Navigation from 'app/ui/navigation';
import Footer from './ui/footer';
import {krub} from 'app/lib/fonts';
import ClientApplication from './ui/client-application';
import { Providers } from './provider';

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
        <Providers>
          <Navigation />
          <div style={{paddingTop:'90px', backgroundColor:"white"}}>
            <ClientApplication>
              {children}
            </ClientApplication>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
