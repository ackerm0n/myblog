'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth'

export default function AdminPage() {
  const { user, loading, isAdmin, signInWithGitHub, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-warm-600 dark:text-warm-400">加载中...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-warm-900 dark:text-cream-100 mb-6 text-center">
            管理后台
          </h1>
          <p className="text-warm-600 dark:text-warm-400 text-center mb-6">
            请使用 GitHub 账号登录
          </p>
          <button
            onClick={signInWithGitHub}
            className="w-full px-6 py-3 bg-warm-900 dark:bg-warm-700 text-white rounded-lg hover:bg-warm-800 dark:hover:bg-warm-600 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            使用 GitHub 登录
          </button>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-warm-900 dark:text-cream-100 mb-4">权限不足</h1>
          <p className="text-warm-600 dark:text-warm-400 mb-6">
            你没有管理权限。只有管理员可以访问此页面。
          </p>
          <button
            onClick={signOut}
            className="px-6 py-3 bg-warm-300 dark:bg-warm-500 text-white rounded-lg hover:bg-warm-400 dark:hover:bg-warm-600 transition-colors font-medium"
          >
            退出登录
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-warm-900 dark:text-cream-100">管理后台</h1>
          <p className="text-warm-600 dark:text-warm-400 mt-1">
            欢迎回来，{user.user_metadata?.full_name || user.email}
          </p>
        </div>
        <button
          onClick={signOut}
          className="px-4 py-2 text-warm-600 hover:text-warm-900 dark:text-warm-400 dark:hover:text-cream-100 transition-colors"
        >
          退出登录
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/posts"
          className="bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 p-6 card-hover"
        >
          <h2 className="text-xl font-semibold text-warm-900 dark:text-cream-100 mb-2">文章管理</h2>
          <p className="text-warm-600 dark:text-warm-400">创建、编辑和删除文章</p>
        </Link>

        <Link
          href="/admin/comments"
          className="bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 p-6 card-hover"
        >
          <h2 className="text-xl font-semibold text-warm-900 dark:text-cream-100 mb-2">评论管理</h2>
          <p className="text-warm-600 dark:text-warm-400">审核和管理评论</p>
        </Link>

        <Link
          href="/admin/posts/new"
          className="bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 p-6 card-hover"
        >
          <h2 className="text-xl font-semibold text-warm-900 dark:text-cream-100 mb-2">写新文章</h2>
          <p className="text-warm-600 dark:text-warm-400">创建新的博客文章</p>
        </Link>
      </div>
    </div>
  )
}
