import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export const metadata = {
  title: '归档',
  description: '所有文章按时间归档',
}

export default function ArchivePage() {
  const posts = getSortedPostsData()

  // 按年份分组
  const postsByYear = posts.reduce((acc, post) => {
    if (post.published_at) {
      const year = new Date(post.published_at).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
    }
    return acc
  }, {} as Record<number, typeof posts>)

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-warm-900 dark:text-cream-100 mb-8">文章归档</h1>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-600 dark:text-warm-400 text-lg">暂无文章</p>
        </div>
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <section key={year}>
              <h2 className="text-2xl font-bold text-warm-900 dark:text-cream-100 mb-6 flex items-center gap-4">
                <span>{year}</span>
                <span className="text-warm-500 text-lg font-normal">
                  {postsByYear[Number(year)].length} 篇
                </span>
              </h2>
              <div className="space-y-4">
                {postsByYear[Number(year)].map((post) => (
                  <article
                    key={post.slug}
                    className="flex items-start gap-4 p-4 bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 card-hover"
                  >
                    {post.published_at && (
                      <time className="text-warm-500 text-sm whitespace-nowrap min-w-[100px]">
                        {formatDate(post.published_at)}
                      </time>
                    )}
                    <div className="flex-1">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="text-lg font-semibold text-warm-900 dark:text-cream-100 hover:text-warm-300 dark:hover:text-warm-400 transition-colors"
                      >
                        {post.title}
                      </Link>
                      <p className="text-warm-600 dark:text-warm-400 text-sm mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-cream-200 dark:bg-warm-800 text-warm-600 dark:text-warm-400 rounded text-xs">
                          {post.category}
                        </span>
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-cream-100 dark:bg-warm-800/60 text-warm-500 dark:text-warm-400 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
