import Link from 'next/link'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import PostCard from '@/components/ui/PostCard'

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((name) => ({ name }))
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  return {
    title: `标签：${name}`,
    description: `查看所有带有 ${name} 标签的文章`,
  }
}

export default async function TagPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const posts = getPostsByTag(name)

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <Link href="/tags" className="text-warm-300 hover:text-warm-400 mb-4 inline-block">
          ← 返回标签
        </Link>
        <h1 className="text-3xl font-bold text-warm-900 dark:text-cream-100">
          标签：#{name}
        </h1>
        <p className="text-warm-600 dark:text-warm-400 mt-2">共 {posts.length} 篇文章</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-600 dark:text-warm-400 text-lg">该标签下暂无文章</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} variant="solid" />
          ))}
        </div>
      )}
    </div>
  )
}
