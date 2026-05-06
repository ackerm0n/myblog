import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export const metadata = {
  title: '文章',
  description: '所有博客文章列表',
}

export default function PostsPage() {
  const posts = getSortedPostsData()

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-warm-900 mb-8">所有文章</h1>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-600 text-lg">暂无文章</p>
          <p className="text-warm-500 mt-2">敬请期待...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl border border-cream-300 overflow-hidden card-hover"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-cream-200 text-warm-600 rounded-full text-sm">
                    {post.category}
                  </span>
                  {post.published_at && (
                    <time className="text-warm-500 text-sm">
                      {formatDate(post.published_at)}
                    </time>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-warm-900 mb-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:text-warm-300 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-warm-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="px-2 py-1 bg-cream-100 text-warm-500 rounded text-xs hover:bg-cream-200 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
