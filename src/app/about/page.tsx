export const metadata = {
  title: '关于',
  description: '关于我',
}

export default function AboutPage() {
  return (
    <div className="container-custom py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-warm-900 mb-8">关于我</h1>

      <div className="bg-white rounded-xl border border-cream-300 p-8">
        <div className="prose prose-warm max-w-none">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-cream-300 flex items-center justify-center">
                <span className="text-5xl">👨‍💻</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-warm-900 mb-2">Hi, I&apos;m TSY</h2>
              <p className="text-warm-600">
                一个热爱技术、热爱生活的程序员。
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-warm-900 mb-4">关于这个博客</h3>
          <p className="text-warm-600 mb-6">
            这个博客是我用来记录学习和成长的地方。在这里，我会分享：
          </p>
          <ul className="list-disc list-inside text-warm-600 mb-6 space-y-2">
            <li>技术笔记和学习心得</li>
            <li>项目开发经验</li>
            <li>编程最佳实践</li>
            <li>日常生活感悟</li>
          </ul>

          <h3 className="text-xl font-semibold text-warm-900 mb-4">技术栈</h3>
          <p className="text-warm-600 mb-6">
            我主要使用以下技术：
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Docker', 'Git'].map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 bg-cream-100 rounded-lg text-center text-warm-700"
              >
                {tech}
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-warm-900 mb-4">联系方式</h3>
          <p className="text-warm-600 mb-4">
            如果你有任何问题或建议，欢迎通过以下方式联系我：
          </p>
          <ul className="list-disc list-inside text-warm-600 space-y-2">
            <li>
              GitHub:{' '}
              <a
                href="https://github.com/ackerm0n"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage hover:text-sage-hover"
              >
                ackerm0n
              </a>
            </li>
            <li>邮箱: your-email@example.com</li>
          </ul>

          <h3 className="text-xl font-semibold text-warm-900 mb-4 mt-8">关于这个网站</h3>
          <p className="text-warm-600">
            这个网站使用 Next.js 15 构建，采用 Tailwind CSS 进行样式设计，
            部署在 Cloudflare Pages 上。源代码托管在 GitHub，
            所有内容使用 Markdown 格式编写。
          </p>
        </div>
      </div>
    </div>
  )
}
