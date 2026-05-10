'use client'

import { useState } from 'react'

interface CommentFormProps {
  postId: string
  onSubmit: (data: { nickname: string; email: string; content: string }) => Promise<void>
}

export default function CommentForm({ postId, onSubmit }: CommentFormProps) {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('') // Honeypot field for anti-spam

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      setMessage('提交成功！')
      return
    }

    // Validation
    if (!nickname.trim() || !email.trim() || !content.trim()) {
      setMessage('请填写所有必填字段')
      return
    }

    if (content.length < 10) {
      setMessage('评论内容至少需要 10 个字符')
      return
    }

    if (content.length > 1000) {
      setMessage('评论内容不能超过 1000 个字符')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage('请输入有效的邮箱地址')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      await onSubmit({ nickname, email, content })
      setMessage('评论已提交，等待审核！')
      setNickname('')
      setEmail('')
      setContent('')
    } catch (error) {
      setMessage('提交失败，请稍后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field - hidden from humans */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">
            昵称 *
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-4 py-2 border border-cream-300 dark:bg-warm-800/50 dark:text-cream-100 dark:border-warm-700 dark:placeholder-warm-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-300 dark:focus:ring-warm-500 focus:border-transparent"
            placeholder="你的昵称"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">
            邮箱 *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-cream-300 dark:bg-warm-800/50 dark:text-cream-100 dark:border-warm-700 dark:placeholder-warm-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-300 dark:focus:ring-warm-500 focus:border-transparent"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">
          评论内容 *
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-cream-300 dark:bg-warm-800/50 dark:text-cream-100 dark:border-warm-700 dark:placeholder-warm-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-300 dark:focus:ring-warm-500 focus:border-transparent resize-none"
          placeholder="写下你的评论..."
          required
        />
        <p className="text-sm text-warm-500 mt-1">
          {content.length}/1000 字符
        </p>
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg ${
            message.includes('成功') || message.includes('提交')
              ? 'bg-sage-100 dark:bg-sage-900/30 text-sage-700 dark:text-sage-300'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 bg-warm-300 dark:bg-warm-500 text-white rounded-lg hover:bg-warm-400 dark:hover:bg-warm-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '提交中...' : '提交评论'}
      </button>

      <p className="text-sm text-warm-500">
        评论将在审核后显示。请勿提交恶意内容。
      </p>
    </form>
  )
}
