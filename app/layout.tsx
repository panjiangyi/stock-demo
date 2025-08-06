import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Header from './search-bar'
import { queryStockInfo } from '@/api'
import { Suspense } from 'react'
import StatementsPageSkeleton from '@/skeleton/stock-skeleton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '台美股票查詢',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const stocks = await queryStockInfo()
  return (
    <html lang="en" className="bg-gray-100 min-h-screen">
      <body className={inter.className}>
        <Header stocks={stocks} />
        <div className="max-w-6xl mx-auto p-4">
          <Suspense fallback={<StatementsPageSkeleton />}>{children}</Suspense>
        </div>
      </body>
    </html>
  )
}
