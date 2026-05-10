import Link from 'next/link'

const footerLinks = [
  { name: '首页', href: '/' },
  { name: '文章', href: '/posts' },
  { name: '关于', href: '/about' },
]

export default function Footer() {
  return (
    <footer className="bg-white/60 backdrop-blur-xl border-t border-cream-300/50 relative z-10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-warm-900">
              TSY<span className="text-warm-300">Blog</span>
            </Link>
            <p className="mt-4 text-warm-600 text-sm leading-relaxed">
              南京大学计算机学院<br />
              AI Infra · 星辰大海在脚下
            </p>
          </div>

          <div>
            <h3 className="text-warm-900 font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-600 hover:text-warm-300 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-warm-900 font-semibold mb-4">联系我</h3>
            <div className="space-y-2 text-sm text-warm-600">
              <a
                href="https://github.com/ackerm0n"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-warm-300 transition-colors"
              >
                GitHub: ackerm0n
              </a>
              <a
                href="mailto:qaq520131466@icloud.com"
                className="block hover:text-warm-300 transition-colors"
              >
                Email: qaq520131466@icloud.com
              </a>
              <span>微信：LSMGJC</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream-300">
          <p className="text-center text-warm-500 text-sm">
            © {new Date().getFullYear()} 童思源. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
