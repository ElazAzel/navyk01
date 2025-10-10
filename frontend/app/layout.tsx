import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'NAVYK',
  description: 'Career & Education Platform',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
