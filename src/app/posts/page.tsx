import { getSortedPostsData } from '@/lib/posts'
import PostCard from '@/components/ui/PostCard'

export const metadata = {
  title: '文章',
  description: '所有博客文章列表',
}

export default function PostsPage() {
  const posts = getSortedPostsData()

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-warm-900 dark:text-cream-100 mb-8">所有文章</h1>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-600 dark:text-warm-400 text-lg">暂无文章</p>
          <p className="text-warm-500 mt-2">敬请期待...</p>
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
