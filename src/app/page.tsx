import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import SafeImage from '@/components/ui/SafeImage'
import PostCard from '@/components/ui/PostCard'

export default function Home() {
  const recentPosts = getSortedPostsData().slice(0, 6)

  return (
    <div className="container-custom py-12">
      {/* Hero 区域 */}
      <section className="text-center mb-16 fade-in">
        <div className="glass-card rounded-3xl px-8 py-12 mb-8 mx-auto max-w-2xl">
          <div className="w-32 h-32 mx-auto rounded-full bg-cream-300 dark:bg-warm-700 overflow-hidden mb-6 ring-4 ring-white/50 dark:ring-warm-700/50">
            <SafeImage
              src="/images/avatar.jpg"
              alt="童思源"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-warm-900 dark:text-cream-100 mb-4">
            Hi, I&apos;m <span className="bg-gradient-to-r from-warm-300 via-purple-400 to-sage bg-clip-text text-transparent">TSY</span>
          </h1>
          <p className="text-lg text-warm-600 dark:text-warm-400 max-w-xl mx-auto leading-relaxed">
            南京大学计算机学院本硕在读。致力于做一个能影响行业的人，星辰大海在脚下。
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link
              href="/posts"
              className="px-6 py-3 bg-gradient-to-r from-warm-300 to-warm-400 dark:from-warm-500 dark:to-warm-600 text-white rounded-full hover:shadow-lg hover:shadow-warm-300/30 transition-all font-medium"
            >
              阅读文章
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 border-2 border-purple-300/50 dark:border-purple-500/50 text-purple-500 dark:text-purple-300 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all font-medium"
            >
              了解更多
            </Link>
          </div>
        </div>
      </section>

      {/* 最新文章 */}
      <section className="slide-up">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-warm-900 dark:text-cream-100">最新文章</h2>
          <Link
            href="/posts"
            className="text-purple-400 hover:text-purple-500 transition-colors font-medium"
          >
            查看全部 →
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <div className="text-center py-12 text-warm-600 dark:text-warm-400">暂无文章</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} variant="glass" />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
