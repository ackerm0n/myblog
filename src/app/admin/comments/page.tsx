'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { getAllComments, updateCommentStatus, deleteComment } from '@/lib/comments'
import { formatDate } from '@/lib/utils'

interface Comment {
  id: string
  post_id: string
  nickname: string
  email: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export default function AdminCommentsPage() {
  const { user, loading: authLoading, isAdmin, signInWithGitHub } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  useEffect(() => {
    if (isAdmin) {
      loadComments()
    } else {
      setIsLoading(false)
    }
  }, [isAdmin])

  const loadComments = async () => {
    try {
      const data = await getAllComments()
      setComments(data)
    } catch (error) {
      console.error('加载评论失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      await updateCommentStatus(id, newStatus)
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, status: newStatus } : comment
        )
      )
    } catch (error) {
      alert('操作失败')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这条评论吗？')) return
    try {
      await deleteComment(id)
      setComments(comments.filter((comment) => comment.id !== id))
    } catch (error) {
      alert('删除失败')
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="text-center text-warm-600 dark:text-warm-400">加载中...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-warm-900 dark:text-cream-100 mb-6">请先登录</h1>
          <button
            onClick={signInWithGitHub}
            className="px-6 py-3 bg-warm-900 dark:bg-warm-700 text-white rounded-lg hover:bg-warm-800 dark:hover:bg-warm-600 transition-colors font-medium"
          >
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
          <p className="text-warm-600 dark:text-warm-400">只有管理员可以访问此页面。</p>
        </div>
      </div>
    )
  }

  const filteredComments =
    filter === 'all'
      ? comments
      : comments.filter((comment) => comment.status === filter)

  return (
    <div className="container-custom py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-warm-300 dark:text-warm-300 hover:text-warm-400 dark:hover:text-warm-400 mb-2 inline-block">
            ← 返回管理后台
          </Link>
          <h1 className="text-3xl font-bold text-warm-900 dark:text-cream-100">评论管理</h1>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === status
                ? 'bg-warm-300 dark:bg-warm-500 text-white'
                : 'bg-white dark:bg-warm-900/80 border border-cream-300 dark:border-warm-700 text-warm-700 dark:text-warm-300 hover:bg-cream-100 dark:hover:bg-warm-700'
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
          <p className="text-warm-600 dark:text-warm-400 text-lg">暂无评论</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-cream-200 dark:bg-warm-800 flex items-center justify-center">
                      <span className="text-warm-600 dark:text-warm-400 font-semibold">
                        {comment.nickname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-900 dark:text-cream-100">
                        {comment.nickname}
                      </h4>
                      <p className="text-sm text-warm-500 dark:text-warm-400">{comment.email}</p>
                    </div>
                  </div>
                  <p className="text-sm text-warm-500 dark:text-warm-400">
                    文章: {comment.post_id} · {formatDate(comment.created_at)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    comment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : comment.status === 'approved'
                      ? 'bg-sage-100 dark:bg-sage-900/30 text-sage-700 dark:text-sage-300'
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

              <p className="text-warm-700 dark:text-warm-300 mb-4 whitespace-pre-wrap">
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
