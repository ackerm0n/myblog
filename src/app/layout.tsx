import type { Metadata } from 'next'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ParticleBackground from '@/components/ui/ParticleBackground'
import BackToTop from '@/components/ui/BackToTop'
import { ThemeProvider } from '@/components/ui/ThemeContext'
import { getSortedPostsData } from '@/lib/posts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '个人博客',
    template: '%s | 个人博客',
  },
  description: '南京大学计算机学院 · AI Infra · 星辰大海在脚下',
  keywords: ['博客', '技术', 'AI', 'Infra', 'C++', 'blog', 'tech'],
  authors: [{ name: '童思源' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://myblog-apv.pages.dev',
    siteName: '个人博客',
    title: '个人博客',
    description: '南京大学计算机学院 · AI Infra · 星辰大海在脚下',
  },
}

// 防闪烁脚本：在页面渲染前读取 localStorage 设置主题
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })()
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const posts = getSortedPostsData()
  const searchData = posts.map(p => ({
    title: p.title,
    excerpt: p.excerpt,
    tags: p.tags,
    category: p.category,
    slug: p.slug,
    published_at: p.published_at,
  }))

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col relative">
        <ThemeProvider>
          <ParticleBackground />
          <Header searchData={searchData} />
          <main className="flex-1 relative z-10">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
