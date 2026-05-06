'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface Comment {
  id: string
  post_id: string
  post_title?: string
  nickname: string
  email: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  useEffect(() => {
    // TODO: 从 Supabase 获取评论列表
    // 这里使用模拟数据
    setComments([
      {
        id: '1',
        post_id: '1',
        post_title: 'Hello World',
        nickname: '访客',
        email: 'visitor@example.com',
        content: '写得很好，期待更多文章！',
        status: 'pending',
        created_at: '2026-05-06',
      },
    ])
    setIsLoading(false)
  }, [])

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    // TODO: 更新 Supabase 中的评论状态
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, status: newStatus } : comment
      )
    )
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这条评论吗？')) return
    // TODO: 从 Supabase 删除评论
    setComments(comments.filter((comment) => comment.id !== id))
  }

  const filteredComments =
    filter === 'all'
      ? comments
      : comments.filter((comment) => comment.status === filter)

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
          <h1 className="text-3xl font-bold text-warm-900">评论管理</h1>
        </div>
      </div>

      {/* 筛选器 */}
      <div className="flex gap-4 mb-6">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === status
                ? 'bg-warm-300 text-white'
                : 'bg-white border border-cream-300 text-warm-700 hover:bg-cream-100'
            }`}
          >
            {status === 'all'
              ? '全部'
              : status === 'pending'
              ? '待审核'
              : status === 'approved'
              ? '已通过'
              : '已拒绝'}
          </button>
        ))}
      </div>

      {filteredComments.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-600 text-lg">暂无评论</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-xl border border-cream-300 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center">
                      <span className="text-warm-600 font-semibold">
                        {comment.nickname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-900">
                        {comment.nickname}
                      </h4>
                      <p className="text-sm text-warm-500">{comment.email}</p>
                    </div>
                  </div>
                  <p className="text-sm text-warm-500">
                    评论于{' '}
                    <Link
                      href={`/posts/${comment.post_id}`}
                      className="text-warm-300 hover:text-warm-400"
                    >
                      {comment.post_title || '文章'}
                    </Link>
                    {' · '}
                    {formatDate(comment.created_at)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    comment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : comment.status === 'approved'
                      ? 'bg-sage-100 text-sage-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {comment.status === 'pending'
                    ? '待审核'
                    : comment.status === 'approved'
                    ? '已通过'
                    : '已拒绝'}
                </span>
              </div>

              <p className="text-warm-700 mb-4 whitespace-pre-wrap">
                {comment.content}
              </p>

              <div className="flex gap-2">
                {comment.status !== 'approved' && (
                  <button
                    onClick={() => handleStatusChange(comment.id, 'approved')}
                    className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage-hover transition-colors text-sm"
                  >
                    通过
                  </button>
                )}
                {comment.status !== 'rejected' && (
                  <button
                    onClick={() => handleStatusChange(comment.id, 'rejected')}
                    className="px-4 py-2 bg-warm-200 text-warm-700 rounded-lg hover:bg-warm-300 transition-colors text-sm"
                  >
                    拒绝
                  </button>
                )}
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
