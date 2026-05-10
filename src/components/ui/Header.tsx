'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import SearchModal from './SearchModal'

const navItems = [
  { name: '首页', href: '/' },
  { name: '文章', href: '/posts' },
  { name: '分类', href: '/categories' },
  { name: '标签', href: '/tags' },
  { name: '归档', href: '/archive' },
  { name: '关于', href: '/about' },
]

interface SearchItem {
  title: string
  excerpt: string
  tags: string[]
  category: string
  slug: string
  published_at?: string
}

interface HeaderProps {
  searchData?: SearchItem[]
}

export default function Header({ searchData = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Cmd/Ctrl+K 快捷键打开搜索
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <header className="bg-white/60 dark:bg-warm-900/60 backdrop-blur-xl border-b border-cream-300/50 dark:border-warm-700/50 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-warm-900 dark:text-cream-100">
                个人<span className="text-warm-300 dark:text-warm-400">博客</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-warm-700 dark:text-warm-300 hover:text-warm-300 dark:hover:text-warm-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side: Search + Theme + Mobile Menu */}
            <div className="flex items-center gap-1">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-cream-200 dark:hover:bg-warm-800 transition-colors"
                aria-label="搜索"
              >
                <svg className="w-5 h-5 text-warm-700 dark:text-warm-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-cream-200 dark:hover:bg-warm-800 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6 text-warm-700 dark:text-warm-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-cream-300 dark:border-warm-700">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-warm-700 dark:text-warm-300 hover:text-warm-300 dark:hover:text-warm-400 transition-colors duration-200 font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchData={searchData}
      />
    </>
  )
}
