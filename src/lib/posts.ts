import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostData {
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  status: 'draft' | 'published'
  published_at?: string
  cover_image?: string
  contentHtml?: string
}

/**
 * 获取所有文章的排序列表
 */
export function getSortedPostsData(): PostData[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      // 处理日期：YAML 中未加引号的日期会被解析为 Date 对象
      let published_at: string | undefined
      if (data.published_at) {
        if (data.published_at instanceof Date) {
          published_at = data.published_at.toISOString().split('T')[0]
        } else {
          published_at = String(data.published_at)
        }
      }

      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || '',
        category: data.category || '未分类',
        tags: data.tags || [],
        status: data.status || 'draft',
        published_at,
        cover_image: data.cover_image,
      }
    })

  // 只返回已发布的文章，按发布日期排序
  return allPostsData
    .filter((post) => post.status === 'published')
    .sort((a, b) => {
      if (a.published_at && b.published_at) {
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      }
      return 0
    })
}

/**
 * 获取所有文章的 slug（用于动态路由）
 */
export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ''),
    }))
}

/**
 * 获取单篇文章的详细内容
 */
export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // 将 Markdown 转换为 HTML
  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .process(content)
  const contentHtml = processedContent.toString()

  // 处理日期：YAML 中未加引号的日期会被解析为 Date 对象
  let published_at: string | undefined
  if (data.published_at) {
    if (data.published_at instanceof Date) {
      published_at = data.published_at.toISOString().split('T')[0]
    } else {
      published_at = String(data.published_at)
    }
  }

  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || '',
    category: data.category || '未分类',
    tags: data.tags || [],
    status: data.status || 'draft',
    published_at,
    cover_image: data.cover_image,
    contentHtml,
  }
}

/**
 * 获取所有分类
 */
export function getAllCategories(): string[] {
  const posts = getSortedPostsData()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories)
}

/**
 * 获取所有标签
 */
export function getAllTags(): string[] {
  const posts = getSortedPostsData()
  const tags = new Set(posts.flatMap((post) => post.tags))
  return Array.from(tags)
}

/**
 * 按分类获取文章
 */
export function getPostsByCategory(category: string): PostData[] {
  const posts = getSortedPostsData()
  return posts.filter((post) => post.category === category)
}

/**
 * 按标签获取文章
 */
export function getPostsByTag(tag: string): PostData[] {
  const posts = getSortedPostsData()
  return posts.filter((post) => post.tags.includes(tag))
}
