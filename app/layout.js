import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../contexts/AuthContext'
import { CartProvider } from '../contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: {
        default: 'TAC-HUB - Congo Basin Climate Action Platform',
        template: '%s | TAC-HUB'
    },
    description: 'Empowering Congo Basin communities with traditional knowledge and modern technology for climate action. Monitor forests, track weather, share knowledge, and connect with communities.',
    keywords: ['Congo Basin', 'climate action', 'traditional knowledge', 'forest monitoring', 'community platform', 'Africa', 'conservation', 'sustainability'],
    authors: [{ name: 'TAC-HUB Team' }],
    creator: 'TAC-HUB',
    publisher: 'TAC-HUB',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://tac-hub.vercel.app'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'TAC-HUB - Congo Basin Climate Action Platform',
        description: 'Empowering Congo Basin communities with traditional knowledge and modern technology for climate action.',
        url: 'https://tac-hub.vercel.app',
        siteName: 'TAC-HUB',
        images: [{
            url: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=1200&h=630&fit=crop',
            width: 1200,
            height: 630,
            alt: 'TAC-HUB - Congo Basin Climate Action Platform',
        }, ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TAC-HUB - Congo Basin Climate Action Platform',
        description: 'Empowering Congo Basin communities with traditional knowledge and modern technology for climate action.',
        images: ['https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=1200&h=630&fit=crop'],
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
    manifest: '/manifest.json',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
}

export default function RootLayout({ children }) {
    return ( <
        html lang = "en" >
        <
        head >
        <
        meta name = "viewport"
        content = "width=device-width, initial-scale=1" / >
        <
        meta name = "theme-color"
        content = "#059669" / >
        <
        meta name = "apple-mobile-web-app-capable"
        content = "yes" / >
        <
        meta name = "apple-mobile-web-app-status-bar-style"
        content = "default" / >
        <
        meta name = "apple-mobile-web-app-title"
        content = "TAC-HUB" / >
        <
        link rel = "apple-touch-icon"
        href = "/apple-touch-icon.png" / >
        <
        link rel = "manifest"
        href = "/manifest.json" / >
        <
        /head> <
        body className = { inter.className } >
        <
        AuthProvider >
        <
        CartProvider > { children } <
        /CartProvider> <
        /AuthProvider> <
        /body> <
        /html>
    )
}