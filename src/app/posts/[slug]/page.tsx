import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostData, getAllPostSlugs, getSortedPostsData } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { getApprovedComments } from '@/lib/comments'
import CommentSection from '@/components/blog/CommentSection'
import TableOfContents from '@/components/ui/TableOfContents'
import ReadingProgressBar from '@/components/ui/ReadingProgressBar'

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

  // 获取已审核的评论
  let comments: any[] = []
  try {
    comments = await getApprovedComments(slug)
  } catch {
    // 评论获取失败不影响页面显示
  }

  return (
    <article className="container-custom py-12 max-w-6xl mx-auto">
      <ReadingProgressBar />

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Link
            href={`/categories/${post.category}`}
            className="px-3 py-1 bg-cream-200 dark:bg-warm-800 text-warm-600 dark:text-warm-400 rounded-full text-sm hover:bg-cream-300 dark:hover:bg-warm-700 transition-colors"
          >
            {post.category}
          </Link>
          {post.published_at && (
            <time className="text-warm-500 text-sm">
              {formatDate(post.published_at)}
            </time>
          )}
          <span className="text-warm-400 dark:text-warm-500 text-sm">
            · {post.readingTime || 1} 分钟阅读
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-warm-900 dark:text-cream-100 mb-4">
          {post.title}
        </h1>
        <p className="text-xl text-warm-600 dark:text-warm-400">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-3 py-1 bg-cream-100 dark:bg-warm-800/60 text-warm-500 dark:text-warm-400 rounded-full text-sm hover:bg-cream-200 dark:hover:bg-warm-700 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      <div className="flex gap-8">
        {/* 文章主体 */}
        <div className="flex-1 min-w-0">
          <div
            className="prose prose-warm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />

          {/* 上下篇导航 */}
          <nav className="mt-12 pt-8 border-t border-cream-300 dark:border-warm-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prevPost && (
                <Link
                  href={`/posts/${prevPost.slug}`}
                  className="p-4 bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 hover:border-warm-300 dark:hover:border-warm-500 transition-colors"
                >
                  <span className="text-sm text-warm-500">← 上一篇</span>
                  <h3 className="text-lg font-semibold text-warm-900 dark:text-cream-100 mt-1">
                    {prevPost.title}
                  </h3>
                </Link>
              )}
              {nextPost && (
                <Link
                  href={`/posts/${nextPost.slug}`}
                  className="p-4 bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 hover:border-warm-300 dark:hover:border-warm-500 transition-colors md:text-right"
                >
                  <span className="text-sm text-warm-500">下一篇 →</span>
                  <h3 className="text-lg font-semibold text-warm-900 dark:text-cream-100 mt-1">
                    {nextPost.title}
                  </h3>
                </Link>
              )}
            </div>
          </nav>

          {/* 评论区 */}
          <CommentSection postId={slug} initialComments={comments} />
        </div>

        {/* 侧边栏目录 */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <TableOfContents headings={post.headings || []} />
          </div>
        </aside>
      </div>
    </article>
  )
}
