import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-custom py-16 text-center">
      <h1 className="text-6xl font-bold text-warm-900 dark:text-cream-100 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-warm-700 dark:text-warm-300 mb-4">页面未找到</h2>
      <p className="text-warm-600 dark:text-warm-400 mb-8">
        抱歉，你访问的页面不存在。
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-warm-300 dark:bg-warm-500 text-white rounded-lg hover:bg-warm-400 dark:hover:bg-warm-600 transition-colors font-medium"
      >
        返回首页
      </Link>
    </div>
  )
}
