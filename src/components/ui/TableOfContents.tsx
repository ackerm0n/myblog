'use client'

import { useState, useEffect } from 'react'
import type { Heading } from '@/lib/posts'

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // 找到进入视口的最高标题
        const visibleEntries = entries.filter(entry => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="space-y-1" aria-label="文章目录">
      <h4 className="text-sm font-semibold text-warm-900 dark:text-cream-100 mb-3 uppercase tracking-wider">
        目录
      </h4>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block py-1 text-sm transition-all duration-200 border-l-2
                ${heading.level === 3 ? 'pl-6' : 'pl-3'}
                ${activeId === heading.id
                  ? 'text-warm-900 dark:text-cream-100 font-semibold border-purple-400 dark:border-purple-500'
                  : 'text-warm-500 dark:text-warm-500 hover:text-warm-700 dark:hover:text-warm-300 border-transparent hover:border-warm-300 dark:hover:border-warm-600'
                }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
