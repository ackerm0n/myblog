import Link from 'next/link'
import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((name) => ({ name }))
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  return {
    title: `分类：${name}`,
    description: `查看所有 ${name} 分类的文章`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const posts = getPostsByCategory(name)

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <Link href="/categories" className="text-warm-300 hover:text-warm-400 mb-4 inline-block">
          ← 返回分类
        </Link>
        <h1 className="text-3xl font-bold text-warm-900">
          分类：{name}
        </h1>
        <p className="text-warm-600 mt-2">共 {posts.length} 篇文章</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-600 text-lg">该分类下暂无文章</p>
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
