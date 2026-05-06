import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostData, getAllPostSlugs, getSortedPostsData } from '@/lib/posts'
import { formatDate, calculateReadingTime } from '@/lib/utils'

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const post = await getPostData(slug)
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.published_at,
        tags: post.tags,
      },
    }
  } catch {
    return {
      title: '文章未找到',
    }
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post
  try {
    post = await getPostData(slug)
  } catch {
    notFound()
  }

  const allPosts = getSortedPostsData()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <article className="container-custom py-12 max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href={`/categories/${post.category}`}
            className="px-3 py-1 bg-cream-200 text-warm-600 rounded-full text-sm hover:bg-cream-300 transition-colors"
          >
            {post.category}
          </Link>
          {post.published_at && (
            <time className="text-warm-500 text-sm">
              {formatDate(post.published_at)}
            </time>
          )}
          <span className="text-warm-500 text-sm">
            · {calculateReadingTime(post.contentHtml || '')} 分钟阅读
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-warm-900 mb-4">
          {post.title}
        </h1>
        <p className="text-xl text-warm-600">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-3 py-1 bg-cream-100 text-warm-500 rounded-full text-sm hover:bg-cream-200 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      <div
        className="prose prose-warm max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
      />

      <nav className="mt-12 pt-8 border-t border-cream-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevPost && (
            <Link
              href={`/posts/${prevPost.slug}`}
              className="p-4 bg-white rounded-xl border border-cream-300 hover:border-warm-300 transition-colors"
            >
              <span className="text-sm text-warm-500">← 上一篇</span>
              <h3 className="text-lg font-semibold text-warm-900 mt-1">
                {prevPost.title}
              </h3>
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/posts/${nextPost.slug}`}
              className="p-4 bg-white rounded-xl border border-cream-300 hover:border-warm-300 transition-colors md:text-right"
            >
              <span className="text-sm text-warm-500">下一篇 →</span>
              <h3 className="text-lg font-semibold text-warm-900 mt-1">
                {nextPost.title}
              </h3>
            </Link>
          )}
        </div>
      </nav>

      <section className="mt-12 pt-8 border-t border-cream-300">
        <h2 className="text-2xl font-bold text-warm-900 mb-6">评论</h2>
        <div className="bg-white rounded-xl border border-cream-300 p-6">
          <p className="text-warm-600 text-center py-8">
            评论功能即将上线...
          </p>
        </div>
      </section>
    </article>
  )
}
