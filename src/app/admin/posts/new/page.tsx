'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w一-龥]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (!slug) {
      setSlug(generateSlug(newTitle))
    }
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setMessage('标题和内容不能为空')
      return
    }

    setIsSaving(true)
    setMessage('')

    try {
      // TODO: 保存到 Supabase
      // 同时保存为本地 Markdown 文件
      const postData = {
        title,
        slug,
        content,
        excerpt,
        category: category || '未分类',
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        status,
        published_at: status === 'published' ? new Date().toISOString() : undefined,
      }

      console.log('保存文章:', postData)

      // 模拟保存延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage('文章保存成功！')
      setTimeout(() => {
        router.push('/admin/posts')
      }, 1500)
    } catch (error) {
      setMessage('保存失败，请稍后重试')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container-custom py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/posts" className="text-warm-300 dark:text-warm-300 hover:text-warm-400 dark:hover:text-warm-400 mb-2 inline-block">
            ← 返回文章列表
          </Link>
          <h1 className="text-3xl font-bold text-warm-900 dark:text-cream-100">写新文章</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setStatus(status === 'draft' ? 'published' : 'draft')}
            className="px-4 py-2 border border-cream-300 dark:border-warm-700 rounded-lg hover:bg-cream-100 dark:hover:bg-warm-700 transition-colors"
          >
            {status === 'draft' ? '草稿' : '已发布'}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-warm-300 dark:bg-warm-500 text-white rounded-lg hover:bg-warm-400 dark:hover:bg-warm-600 transition-colors font-medium disabled:opacity-50"
          >
            {isSaving ? '保存中...' : '保存文章'}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.includes('成功')
              ? 'bg-sage-100 dark:bg-sage-900/30 text-sage-700 dark:text-sage-300'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 主要内容区域 */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">
              文章标题 *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent text-lg dark:bg-warm-800/50 dark:text-cream-100 dark:border-warm-700 dark:placeholder-warm-500"
              placeholder="输入文章标题"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">
              URL 别名 (slug)
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent dark:bg-warm-800/50 dark:text-cream-100 dark:border-warm-700 dark:placeholder-warm-500"
              placeholder="url-friendly-slug"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">
              文章摘要
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent resize-none dark:bg-warm-800/50 dark:text-cream-100 dark:border-warm-700 dark:placeholder-warm-500"
              placeholder="简短描述文章内容..."
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">
              文章内容 * (Markdown 格式)
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="w-full px-4 py-3 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent resize-y font-mono dark:bg-warm-800/50 dark:text-cream-100 dark:border-warm-700 dark:placeholder-warm-500"
              placeholder="使用 Markdown 格式编写文章内容..."
            />
          </div>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 p-6">
            <h3 className="text-lg font-semibold text-warm-900 dark:text-cream-100 mb-4">文章设置</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">
                  分类
                </label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent dark:bg-warm-800/50 dark:text-cream-100 dark:border-warm-700 dark:placeholder-warm-500"
                  placeholder="技术"
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1">
                  标签 (用逗号分隔)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-2 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-300 focus:border-transparent dark:bg-warm-800/50 dark:text-cream-100 dark:border-warm-700 dark:placeholder-warm-500"
                  placeholder="JavaScript, React, Next.js"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-warm-900/80 rounded-xl border border-cream-300 dark:border-warm-700 p-6">
            <h3 className="text-lg font-semibold text-warm-900 dark:text-cream-100 mb-4">Markdown 提示</h3>
            <div className="text-sm text-warm-600 dark:text-warm-400 space-y-2">
              <p><code className="bg-cream-100 dark:bg-warm-800/60 px-1 rounded"># 标题</code> - 一级标题</p>
              <p><code className="bg-cream-100 dark:bg-warm-800/60 px-1 rounded">## 标题</code> - 二级标题</p>
              <p><code className="bg-cream-100 dark:bg-warm-800/60 px-1 rounded">**粗体**</code> - <strong>粗体</strong></p>
              <p><code className="bg-cream-100 dark:bg-warm-800/60 px-1 rounded">*斜体*</code> - <em>斜体</em></p>
              <p><code className="bg-cream-100 dark:bg-warm-800/60 px-1 rounded">[链接](url)</code> - 链接</p>
              <p><code className="bg-cream-100 dark:bg-warm-800/60 px-1 rounded">![图片](url)</code> - 图片</p>
              <p><code className="bg-cream-100 dark:bg-warm-800/60 px-1 rounded">`代码`</code> - 行内代码</p>
              <p><code className="bg-cream-100 dark:bg-warm-800/60 px-1 rounded">```代码块```</code> - 代码块</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
