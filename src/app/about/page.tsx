import SafeImage from '@/components/ui/SafeImage'

export const metadata = {
  title: '关于',
  description: '关于我 - 童思源',
}

export default function AboutPage() {
  return (
    <div className="container-custom py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-warm-900 mb-8">关于我</h1>

      <div className="bg-white rounded-xl border border-cream-300 p-8">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-cream-300 overflow-hidden">
              <SafeImage
                src="/images/avatar.jpg"
                alt="童思源"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-warm-900 mb-2">童思源 / TSY</h2>
            <p className="text-warm-600 leading-relaxed">
              南京大学计算机学院本硕在读。致力于做一个能影响行业的人，星辰大海在脚下。
            </p>
          </div>
        </div>

        <div className="mb-10 rounded-xl overflow-hidden">
          <SafeImage
            src="/images/photo.jpg"
            alt="童思源"
            className="w-full object-cover max-h-[400px]"
            fallback=""
          />
        </div>

        <div className="space-y-10">
          <section>
            <h3 className="text-xl font-semibold text-warm-900 mb-4">关于这个博客</h3>
            <p className="text-warm-600 leading-relaxed">
              这里是我的个人空间，用来记录学习和成长的点滴。技术笔记、项目踩坑、日常碎碎念，都会出现在这里。
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-warm-900 mb-4">技术栈</h3>
            <p className="text-warm-600 leading-relaxed mb-4">
              未来主要方向是 AI Infra。底层功底也在持续打磨中。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-cream-50 rounded-lg p-4">
                <h4 className="font-semibold text-warm-800 mb-2">基础能力</h4>
                <div className="flex flex-wrap gap-2">
                  {['C++', '操作系统', '数据库', '计算机网络', '编译原理'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-cream-200 text-warm-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-cream-50 rounded-lg p-4">
                <h4 className="font-semibold text-warm-800 mb-2">AI 方向</h4>
                <div className="flex flex-wrap gap-2">
                  {['机器学习', '深度学习', '强化学习', 'AI Infra', '大模型系统'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-cream-200 text-warm-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-warm-900 mb-4">联系方式</h3>
            <div className="space-y-3 text-warm-600">
              <div className="flex items-center gap-3">
                <span className="text-warm-400">📧</span>
                <a href="mailto:qaq520131466@icloud.com" className="hover:text-warm-300 transition-colors">
                  qaq520131466@icloud.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-warm-400">💬</span>
                <span>微信：LSMGJC</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-warm-400">🐙</span>
                <a
                  href="https://github.com/ackerm0n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-warm-300 transition-colors"
                >
                  github.com/ackerm0n
                </a>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-warm-900 mb-4">关于这个网站</h3>
            <p className="text-warm-600 leading-relaxed">
              基于 Next.js 15 构建，Tailwind CSS 负责样式，Supabase 提供后端服务，部署在 Cloudflare Pages 上。源码托管在 GitHub。
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
