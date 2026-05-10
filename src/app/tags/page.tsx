import Link from 'next/link'
import { getAllTags, getPostsByTag } from '@/lib/posts'

export const metadata = {
  title: '标签',
  description: '文章标签云',
}

const tagColors = [
  'bg-warm-100 text-warm-700 dark:bg-warm-800 dark:text-warm-300 border-warm-200 dark:border-warm-700',
  'bg-sage-50 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300 border-sage-200 dark:border-sage-800',
  'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  'bg-cream-100 text-warm-600 dark:bg-warm-800/60 dark:text-warm-400 border-cream-300 dark:border-warm-700',
]

function getTagSize(count: number, minCount: number, maxCount: number): string {
  if (maxCount === minCount) return 'text-lg'
  const ratio = (count - minCount) / (maxCount - minCount)
  if (ratio < 0.25) return 'text-sm'
  if (ratio < 0.5) return 'text-base'
  if (ratio < 0.75) return 'text-xl'
  return 'text-2xl'
}

export default function TagsPage() {
  const tags = getAllTags()
  const tagData = tags.map((tag, index) => ({
    name: tag,
    count: getPostsByTag(tag).length,
    colorIndex: index % tagColors.length,
  }))

  const maxCount = Math.max(...tagData.map(t => t.count), 1)
  const minCount = Math.min(...tagData.map(t => t.count), 0)

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-warm-900 dark:text-cream-100 mb-8">标签云</h1>

      {tags.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-600 dark:text-warm-400 text-lg">暂无标签</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 items-center justify-center py-8">
          {tagData.map((tag) => (
            <Link
              key={tag.name}
              href={`/tags/${tag.name}`}
              className={`inline-flex items-center px-4 py-2 rounded-full border transition-all duration-200 hover:scale-105 hover:shadow-md ${getTagSize(tag.count, minCount, maxCount)} ${tagColors[tag.colorIndex]}`}
            >
              #{tag.name}
              <span className="ml-1.5 opacity-60 text-xs">({tag.count})</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
