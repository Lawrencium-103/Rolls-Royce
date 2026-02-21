import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Rolls-Royce Spectre | Beyond Ordinary',
  description: 'Experience the pinnacle of luxury electric motoring. The Rolls-Royce Spectre represents a new chapter in the marque\'s illustrious history.',
  keywords: 'Rolls-Royce, Spectre, Luxury, Electric, Black Badge, Ultra-Luxury',
  openGraph: {
    title: 'Rolls-Royce Spectre | Beyond Ordinary',
    description: 'Experience the pinnacle of luxury electric motoring.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
