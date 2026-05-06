# 博客网站搭建指南

## 一、创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com) 并注册账号
2. 创建新项目，选择免费套餐
3. 记录项目的 URL 和 Anon Key（在 Settings > API 中）

## 二、配置环境变量

1. 复制 `.env.local.example` 为 `.env.local`
2. 填入你的 Supabase URL 和 Anon Key：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 三、创建数据库表

在 Supabase 控制台的 SQL Editor 中执行以下 SQL：

```sql
-- 创建文章表
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  cover_image TEXT,
  category TEXT DEFAULT '未分类',
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建评论表
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建站点配置表
CREATE TABLE site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB
);

-- 创建索引
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_status ON comments(status);

-- 设置 RLS (Row Level Security)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- 公开读取已发布文章
CREATE POLICY "Public can read published posts" ON posts
  FOR SELECT USING (status = 'published');

-- 公开读取已审核评论
CREATE POLICY "Public can read approved comments" ON comments
  FOR SELECT USING (status = 'approved');

-- 公开插入评论
CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);

-- 管理员可以管理所有内容（需要配置 Supabase Auth）
-- 这部分需要在配置好 GitHub OAuth 后再设置
```

## 四、安装依赖

```bash
npm install
```

## 五、启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

## 六、配置 GitHub OAuth（管理后台）

1. 在 Supabase 控制台的 Authentication > Providers 中启用 GitHub
2. 创建 GitHub OAuth App：
   - 访问 GitHub Settings > Developer settings > OAuth Apps
   - 创建新的 OAuth App
   - 设置 Authorization callback URL 为 Supabase 提供的 URL
3. 将 GitHub Client ID 和 Secret 填入 Supabase

## 七、配置 Resend 邮件通知（可选）

1. 访问 [resend.com](https://resend.com) 并注册账号
2. 获取 API Key
3. 填入 `.env.local` 的 `RESEND_API_KEY`

## 八、部署到 Cloudflare Pages

1. 将代码推送到 GitHub 仓库
2. 在 Cloudflare Pages 中连接 GitHub 仓库
3. 配置构建设置：
   - 构建命令：`npm run build`
   - 输出目录：`out`
4. 添加环境变量
5. 配置自定义域名（可选）

## 九、购买域名（可选）

推荐在 Cloudflare Registrar 购买域名，价格便宜且与 Cloudflare Pages 集成最好。
