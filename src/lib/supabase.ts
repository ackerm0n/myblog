import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库类型定义
export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image?: string
  category: string
  tags: string[]
  status: 'draft' | 'published'
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  post_id: string
  nickname: string
  email: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  ip_address?: string
  user_agent?: string
  created_at: string
}

export interface SiteConfig {
  id: string
  key: string
  value: any
}
