-- 创建文章表
CREATE TABLE IF NOT EXISTS posts (
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
CREATE TABLE IF NOT EXISTS comments (
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
CREATE TABLE IF NOT EXISTS site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);

-- 设置 RLS (Row Level Security)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- 删除已存在的策略（如果存在）
DROP POLICY IF EXISTS "Public can read published posts" ON posts;
DROP POLICY IF EXISTS "Public can read approved comments" ON comments;
DROP POLICY IF EXISTS "Anyone can insert comments" ON comments;

-- 公开读取已发布文章
CREATE POLICY "Public can read published posts" ON posts
  FOR SELECT USING (status = 'published');

-- 公开读取已审核评论
CREATE POLICY "Public can read approved comments" ON comments
  FOR SELECT USING (status = 'approved');

-- 公开插入评论
CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 插入示例文章
INSERT INTO posts (title, slug, content, excerpt, category, tags, status, published_at)
VALUES (
  'Hello World',
  'hello-world',
  '# Hello World

欢迎来到我的个人博客！这是我发布的第一篇文章。

## 关于这个博客

这个博客是我用来记录学习和成长的地方。在这里，我会分享：

- **技术笔记**：编程语言、框架、工具的使用心得
- **项目经验**：参与或独立完成的项目总结
- **日常记录**：生活中的思考和感悟

## 技术栈

这个博客使用以下技术构建：

- **Next.js 15**：React 框架，支持静态生成
- **Tailwind CSS**：实用优先的 CSS 框架
- **Supabase**：后端即服务，提供数据库和认证
- **Cloudflare Pages**：全球 CDN 托管

## 代码示例

下面是一个简单的 JavaScript 示例：

```javascript
function greet(name) {
  return `Hello, ${name}!`
}

console.log(greet("World"))
```

## 未来计划

我计划在博客中分享更多关于：

1. 前端开发的最佳实践
2. 后端架构设计思路
3. DevOps 工具和流程
4. 学习资源推荐

## 联系我

如果你有任何问题或建议，欢迎通过以下方式联系我：

- GitHub: [ackerm0n](https://github.com/ackerm0n)
- 邮箱: your-email@example.com

感谢你的访问，希望你能在这里找到有价值的内容！

---

*发布于 2026年05月06日*',
  '这是我的第一篇博客文章，欢迎来到我的个人空间。',
  '日常',
  ARRAY['博客', '开始'],
  'published',
  '2026-05-06T00:00:00Z'
)
ON CONFLICT (slug) DO NOTHING;
