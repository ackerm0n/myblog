import Link from 'next/link'
import { getAllCategories, getPostsByCategory } from '@/lib/posts'

export const metadata = {
  title: '分类',
  description: '文章分类列表',
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-warm-900 dark:text-cream-100 mb-8">文章分类</h1>

      {categories.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-600 dark:text-warm-400 text-lg">暂无分类</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const posts = getPostsByCategory(category)
            return (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 p-6 card-hover"
              >
                <h2 className="text-xl font-semibold text-warm-900 dark:text-cream-100 mb-2">
                  {category}
                </h2>
                <p className="text-warm-600 dark:text-warm-400">
                  {posts.length} 篇文章
                </p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
