'use client'

import { useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { submitComment } from '@/lib/comments'

interface Comment {
  id: string
  nickname: string
  content: string
  created_at: string
}

interface CommentSectionProps {
  postId: string
  initialComments: Comment[]
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (data: { nickname: string; email: string; content: string }) => {
    await submitComment({
      postId,
      ...data,
    })
    setSubmitSuccess(true)
  }

  return (
    <section className="mt-12 pt-8 border-t border-cream-300">
      <h2 className="text-2xl font-bold text-warm-900 mb-6">评论</h2>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-sage-100 text-sage-700 rounded-lg">
          评论已提交，等待审核后显示。
        </div>
      )}

      <div className="bg-white rounded-xl border border-cream-300 p-6 mb-8">
        <h3 className="text-lg font-semibold text-warm-900 mb-4">发表评论</h3>
        <CommentForm postId={postId} onSubmit={handleSubmit} />
      </div>

      <CommentList comments={comments} />
    </section>
  )
}
