import Link from 'next/link'
import { getAllTags, getPostsByTag } from '@/lib/posts'

export const metadata = {
  title: '标签',
  description: '文章标签云',
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-warm-900 mb-8">标签云</h1>

      {tags.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-600 text-lg">暂无标签</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => {
            const posts = getPostsByTag(tag)
            return (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="px-4 py-2 bg-white rounded-full border border-cream-300 text-warm-700 hover:border-warm-300 hover:text-warm-300 transition-colors"
              >
                #{tag}
                <span className="ml-2 text-warm-500 text-sm">({posts.length})</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
