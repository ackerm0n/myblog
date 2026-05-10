import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import SafeImage from '@/components/ui/SafeImage'

export default function Home() {
  const recentPosts = getSortedPostsData().slice(0, 6)

  return (
    <div className="container-custom py-12">
      {/* Hero 区域 */}
      <section className="text-center mb-16 fade-in">
        <div className="glass-card rounded-3xl px-8 py-12 mb-8 mx-auto max-w-2xl">
          <div className="w-32 h-32 mx-auto rounded-full bg-cream-300 overflow-hidden mb-6 ring-4 ring-white/50">
            <SafeImage
              src="/images/avatar.jpg"
              alt="童思源"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-4">
            Hi, I&apos;m <span className="bg-gradient-to-r from-warm-300 via-purple-400 to-sage bg-clip-text text-transparent">TSY</span>
          </h1>
          <p className="text-lg text-warm-600 max-w-xl mx-auto leading-relaxed">
            南京大学计算机学院本硕在读。致力于做一个能影响行业的人，星辰大海在脚下。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link
              href="/posts"
              className="px-6 py-3 bg-gradient-to-r from-warm-300 to-warm-400 text-white rounded-full hover:shadow-lg hover:shadow-warm-300/30 transition-all font-medium"
            >
              阅读文章
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 border-2 border-purple-300/50 text-purple-500 rounded-full hover:bg-purple-50 transition-all font-medium"
            >
              了解更多
            </Link>
          </div>
        </div>
      </section>

      {/* 最新文章 */}
      <section className="slide-up">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-warm-900">最新文章</h2>
          <Link
            href="/posts"
            className="text-purple-400 hover:text-purple-500 transition-colors font-medium"
          >
            查看全部 →
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <div className="text-center py-12 text-warm-600">暂无文章</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <article
                key={post.slug}
                className="glass-card rounded-xl overflow-hidden card-hover"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-100/60 text-purple-600 rounded-full text-sm">
                      {post.category}
                    </span>
                    {post.published_at && (
                      <time className="text-warm-500 text-sm">
                        {formatDate(post.published_at)}
                      </time>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-warm-900 mb-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:text-purple-500 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-warm-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-cream-100/60 text-warm-500 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
