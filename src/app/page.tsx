import Link from 'next/link'

// 临时文章数据，后续会从 Supabase 获取
const recentPosts = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    excerpt: '这是我的第一篇博客文章，欢迎来到我的个人空间。',
    date: '2026-05-06',
    category: '日常',
    tags: ['博客', '开始'],
  },
]

export default function Home() {
  return (
    <div className="container-custom py-12">
      {/* Hero 区域 */}
      <section className="text-center mb-16 fade-in">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-cream-300 flex items-center justify-center mb-6">
            <span className="text-5xl">👋</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-4">
            Hi, I&apos;m <span className="text-warm-300">TSY</span>
          </h1>
          <p className="text-xl text-warm-600 max-w-2xl mx-auto leading-relaxed">
            欢迎来到我的个人博客！这里记录我的编程学习历程、技术分享和日常生活。
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Link
            href="/posts"
            className="px-6 py-3 bg-warm-300 text-white rounded-lg hover:bg-warm-400 transition-colors font-medium"
          >
            阅读文章
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border-2 border-warm-300 text-warm-300 rounded-lg hover:bg-warm-300 hover:text-white transition-colors font-medium"
          >
            了解更多
          </Link>
        </div>
      </section>

      {/* 最新文章 */}
      <section className="slide-up">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-warm-900">最新文章</h2>
          <Link
            href="/posts"
            className="text-warm-300 hover:text-warm-400 transition-colors font-medium"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl border border-cream-300 overflow-hidden card-hover"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-cream-200 text-warm-600 rounded-full text-sm">
                    {post.category}
                  </span>
                  <time className="text-warm-500 text-sm">{post.date}</time>
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:text-warm-300 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-warm-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-cream-100 text-warm-500 rounded text-xs"
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
    </div>
  )
}
