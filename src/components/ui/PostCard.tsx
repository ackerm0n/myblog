import Link from 'next/link'
import SafeImage from './SafeImage'
import { formatDate } from '@/lib/utils'
import type { PostData } from '@/lib/posts'

interface PostCardProps {
  post: PostData
  variant?: 'glass' | 'solid'
  showTags?: boolean
  showReadingTime?: boolean
}

export default function PostCard({
  post,
  variant = 'solid',
  showTags = true,
  showReadingTime = true,
}: PostCardProps) {
  const cardClass = variant === 'glass'
    ? 'glass-card rounded-xl overflow-hidden card-hover'
    : 'bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 overflow-hidden card-hover'

  return (
    <article className={cardClass}>
      {/* 封面图区域 */}
      <div className="relative h-48 overflow-hidden">
        {post.cover_image ? (
          <SafeImage
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-warm-200 via-purple-100 to-sage-100 dark:from-warm-800 dark:via-purple-900/30 dark:to-sage-900/30 flex items-center justify-center">
            <span className="text-4xl opacity-30 dark:opacity-20">
              {post.category === '技术' ? '💻' : post.category === '日常' ? '📝' : '📄'}
            </span>
          </div>
        )}
      </div>

      {/* 卡片内容 */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100/60 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-sm">
            {post.category}
          </span>
          {post.published_at && (
            <time className="text-warm-500 text-sm">
              {formatDate(post.published_at)}
            </time>
          )}
          {showReadingTime && post.readingTime && (
            <span className="text-warm-400 dark:text-warm-500 text-sm">
              · {post.readingTime} 分钟
            </span>
          )}
        </div>
        <h2 className="text-xl font-semibold text-warm-900 dark:text-cream-100 mb-2">
          <Link
            href={`/posts/${post.slug}`}
            className="hover:text-purple-500 dark:hover:text-purple-300 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-warm-600 dark:text-warm-400 mb-4 line-clamp-3">{post.excerpt}</p>
        {showTags && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="px-2 py-1 bg-cream-100/60 dark:bg-warm-800/40 text-warm-500 dark:text-warm-400 rounded text-xs hover:bg-cream-200 dark:hover:bg-warm-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
