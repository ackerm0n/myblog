# TSY Blog

个人技术博客网站，使用 Next.js 15 + Tailwind CSS + Supabase + Cloudflare Pages 构建。

## 功能特性

- ✅ 响应式设计，支持移动端
- ✅ 暖色调主题设计
- ✅ Markdown 文章渲染，支持代码高亮
- ✅ 文章分类和标签系统
- ✅ 文章归档页面
- ✅ 管理后台（GitHub OAuth 登录）
- ✅ 评论系统（支持审核）
- ✅ SEO 优化

## 技术栈

- **前端框架**：Next.js 15 (App Router)
- **样式**：Tailwind CSS
- **数据库**：Supabase (PostgreSQL)
- **认证**：Supabase Auth (GitHub OAuth)
- **邮件**：Resend
- **部署**：Cloudflare Pages

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/ackerm0n/myblog.git
cd myblog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.local.example` 为 `.env.local`，填入你的配置：

```bash
cp .env.local.example .env.local
```

### 4. 设置 Supabase

1. 访问 [supabase.com](https://supabase.com) 创建项目
2. 在 SQL Editor 中执行 `supabase/migrations/001_initial_schema.sql`
3. 获取项目的 URL 和 Anon Key，填入 `.env.local`

### 5. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

## 项目结构

```
myblog/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # 公开页面路由
│   ├── admin/                   # 管理后台
│   └── layout.tsx               # 根布局
├── components/                  # React 组件
├── content/                     # Markdown 文章
├── lib/                         # 工具函数
├── public/                      # 静态资源
└── supabase/                    # 数据库配置
```

## 部署

### Cloudflare Pages

1. 将代码推送到 GitHub
2. 在 Cloudflare Pages 中连接仓库
3. 配置构建设置：
   - 构建命令：`npm run build`
   - 输出目录：`out`
4. 添加环境变量
5. 配置自定义域名（可选）

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
