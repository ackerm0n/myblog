'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface SearchItem {
  title: string
  excerpt: string
  tags: string[]
  category: string
  slug: string
  published_at?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  searchData: SearchItem[]
}

export default function SearchModal({ isOpen, onClose, searchData }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // 简单模糊搜索（不依赖 Fuse.js，减少 bundle 体积）
  const search = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([])
      return
    }
    const lower = q.toLowerCase()
    const matched = searchData.filter(item =>
      item.title.toLowerCase().includes(lower) ||
      item.excerpt.toLowerCase().includes(lower) ||
      item.tags.some(tag => tag.toLowerCase().includes(lower)) ||
      item.category.toLowerCase().includes(lower)
    )
    setResults(matched)
    setSelectedIndex(0)
  }, [searchData])

  useEffect(() => {
    search(query)
  }, [query, search])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        router.push(`/posts/${results[selectedIndex].slug}`)
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose, router])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 搜索框 */}
      <div className="relative mx-auto mt-[15vh] w-full max-w-2xl px-4">
        <div className="bg-white dark:bg-warm-900 rounded-2xl shadow-2xl overflow-hidden border border-cream-300 dark:border-warm-700">
          {/* 输入框 */}
          <div className="flex items-center px-4 border-b border-cream-200 dark:border-warm-700">
            <svg className="w-5 h-5 text-warm-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="搜索文章标题、内容、标签..."
              className="w-full px-3 py-4 bg-transparent text-warm-900 dark:text-cream-100 placeholder-warm-400 dark:placeholder-warm-500 outline-none text-lg"
            />
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-warm-400 bg-cream-100 dark:bg-warm-800 rounded border border-cream-300 dark:border-warm-600">
              ESC
            </kbd>
          </div>

          {/* 搜索结果 */}
          <div className="max-h-[50vh] overflow-y-auto">
            {query && results.length === 0 && (
              <div className="px-4 py-8 text-center text-warm-500">
                没有找到相关文章
              </div>
            )}
            {results.map((item, index) => (
              <button
                key={item.slug}
                className={`w-full text-left px-4 py-3 transition-colors
                  ${index === selectedIndex
                    ? 'bg-purple-50 dark:bg-purple-900/20'
                    : 'hover:bg-cream-50 dark:hover:bg-warm-800/50'
                  }`}
                onClick={() => {
                  router.push(`/posts/${item.slug}`)
                  onClose()
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="font-medium text-warm-900 dark:text-cream-100">
                  {item.title}
                </div>
                <div className="text-sm text-warm-500 mt-1 line-clamp-1">
                  {item.excerpt}
                </div>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-purple-500">{item.category}</span>
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs text-warm-400">#{tag}</span>
                  ))}
                </div>
              </button>
            ))}
            {!query && (
              <div className="px-4 py-6 text-center text-warm-400 text-sm">
                输入关键词搜索文章...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
