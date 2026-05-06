import type { Metadata } from 'next'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'TSY Blog',
    template: '%s | TSY Blog',
  },
  description: '个人技术博客，分享编程经验与日常记录',
  keywords: ['博客', '技术', '编程', 'blog', 'tech'],
  authors: [{ name: 'TSY' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://tsy.dev',
    siteName: 'TSY Blog',
    title: 'TSY Blog',
    description: '个人技术博客，分享编程经验与日常记录',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
