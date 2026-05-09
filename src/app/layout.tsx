import type { Metadata } from 'next'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ParticleBackground from '@/components/ui/ParticleBackground'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'TSY Blog',
    template: '%s | TSY Blog',
  },
  description: '南京大学计算机学院 · AI Infra · 星辰大海在脚下',
  keywords: ['博客', '技术', 'AI', 'Infra', 'C++', 'blog', 'tech'],
  authors: [{ name: '童思源' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://myblog-apv.pages.dev',
    siteName: 'TSY Blog',
    title: 'TSY Blog',
    description: '南京大学计算机学院 · AI Infra · 星辰大海在脚下',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col relative">
        <ParticleBackground />
        <Header />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
