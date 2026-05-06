import { format, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'

/**
 * 格式化日期为中文格式
 */
export function formatDate(dateString: string): string {
  const date = parseISO(dateString)
  return format(date, 'yyyy年MM月dd日', { locale: zhCN })
}

/**
 * 计算阅读时间（分钟）
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * 生成 URL 友好的 slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w一-龥]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * 截取文章摘要
 */
export function excerpt(content: string, maxLength: number = 150): string {
  if (content.length <= maxLength) return content
  return content.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}
