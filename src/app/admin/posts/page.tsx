'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  published_at?: string
  created_at: string
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: 从 Supabase 获取文章列表
    // 这里使用模拟数据
    setPosts([
      {
        id: '1',
        title: 'Hello World',
        slug: 'hello-world',
        status: 'published',
        published_at: '2026-05-06',
        created_at: '2026-05-06',
      },
    ])
    setIsLoading(false)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return
    // TODO: 实现删除功能
    setPosts(posts.filter((post) => post.id !== id))
  }

  const handleStatusChange = async (id: string, newStatus: 'draft' | 'published') => {
    // TODO: 实现状态切换功能
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, status: newStatus } : post
      )
    )
  }

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="text-center text-warm-600">加载中...</div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-warm-300 hover:text-warm-400 mb-2 inline-block">
            ← 返回管理后台
          </Link>
          <h1 className="text-3xl font-bold text-warm-900">文章管理</h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="px-6 py-3 bg-warm-300 text-white rounded-lg hover:bg-warm-400 transition-colors font-medium"
        >
          写新文章
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-600 text-lg mb-4">暂无文章</p>
          <Link
            href="/admin/posts/new"
            className="text-warm-300 hover:text-warm-400"
          >
            创建第一篇文章 →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-cream-300 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-300">
                <th className="px-6 py-4 text-left text-warm-900 font-semibold">标题</th>
                <th className="px-6 py-4 text-left text-warm-900 font-semibold">状态</th>
                <th className="px-6 py-4 text-left text-warm-900 font-semibold">发布时间</th>
                <th className="px-6 py-4 text-right text-warm-900 font-semibold">操作</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-cream-200 last:border-b-0">
                  <td className="px-6 py-4">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-warm-900 hover:text-warm-300 font-medium"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleStatusChange(
                          post.id,
                          post.status === 'published' ? 'draft' : 'published'
                        )
                      }
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        post.status === 'published'
                          ? 'bg-sage-100 text-sage-700'
                          : 'bg-cream-200 text-warm-600'
                      }`}
                    >
                      {post.status === 'published' ? '已发布' : '草稿'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-warm-600">
                    {post.published_at || '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="text-warm-300 hover:text-warm-400 mr-4"
                    >
                      编辑
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
