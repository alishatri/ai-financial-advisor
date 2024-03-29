import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WallStreetBetsGPT',
  description: 'AI Financial Advisor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
