import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../contexts/AuthContext'
import { CartProvider } from '../contexts/CartContext'
import AIChatbot from '../components/AIChatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TAC-HUB - Climate Action Platform',
  description: 'Empowering Congo Basin communities with climate action tools, traditional knowledge sharing, and sustainable development solutions.',
  keywords: 'climate action, Congo Basin, traditional knowledge, forest conservation, community development, sustainability',
  authors: [{ name: 'TAC-HUB Team' }],
  creator: 'TAC-HUB',
  publisher: 'TAC-HUB',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tac-hub.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TAC-HUB - Climate Action Platform',
    description: 'Empowering Congo Basin communities with climate action tools and traditional knowledge sharing.',
    url: 'https://tac-hub.org',
    siteName: 'TAC-HUB',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TAC-HUB Climate Action Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAC-HUB - Climate Action Platform',
    description: 'Empowering Congo Basin communities with climate action tools and traditional knowledge sharing.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#059669" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TAC-HUB" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <AIChatbot />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
