'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeContext'

// 鬼灭之刃风格的动态背景：樱花、水之呼吸波纹、紫藤花粒子
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let w = 0, h = 0
    const c = ctx // shorthand alias, non-null since we checked above

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ========== 樱花花瓣 ==========
    class Petal {
      x: number; y: number; size: number
      speedX: number; speedY: number
      rotation: number; rotationSpeed: number
      opacity: number
      color: string

      constructor() {
        this.x = Math.random() * w
        this.y = Math.random() * h - h
        this.size = Math.random() * 12 + 6
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 0.8 + 0.3
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.03
        this.opacity = Math.random() * 0.4 + 0.2
        const pinks = [
          `rgba(255, 183, 197, ${this.opacity})`,
          `rgba(255, 192, 203, ${this.opacity})`,
          `rgba(255, 218, 225, ${this.opacity})`,
          `rgba(248, 170, 183, ${this.opacity})`,
        ]
        this.color = pinks[Math.floor(Math.random() * pinks.length)]
      }

      update() {
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3
        this.y += this.speedY
        this.rotation += this.rotationSpeed
        if (this.y > h + 20) {
          this.y = -20
          this.x = Math.random() * w
        }
        if (this.x > w + 20) this.x = -20
        if (this.x < -20) this.x = w + 20
      }

      draw() {
        c.save()
        c.translate(this.x, this.y)
        c.rotate(this.rotation)
        c.beginPath()
        // 花瓣形状
        c.moveTo(0, 0)
        c.bezierCurveTo(
          this.size * 0.4, -this.size * 0.6,
          this.size, -this.size * 0.4,
          this.size, 0
        )
        c.bezierCurveTo(
          this.size, this.size * 0.4,
          this.size * 0.4, this.size * 0.6,
          0, 0
        )
        c.fillStyle = this.color
        c.fill()
        c.restore()
      }
    }

    // ========== 水之呼吸波纹 ==========
    class WaterRipple {
      x: number; y: number
      radius: number; maxRadius: number
      opacity: number; speed: number

      constructor() {
        this.x = Math.random() * w
        this.y = h * 0.6 + Math.random() * h * 0.4
        this.radius = 0
        this.maxRadius = Math.random() * 80 + 40
        this.opacity = 0.15
        this.speed = Math.random() * 0.3 + 0.2
      }

      update() {
        this.radius += this.speed
        this.opacity = 0.15 * (1 - this.radius / this.maxRadius)
        if (this.radius > this.maxRadius) {
          this.radius = 0
          this.x = Math.random() * w
          this.y = h * 0.6 + Math.random() * h * 0.4
          this.opacity = 0.15
        }
      }

      draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.strokeStyle = `rgba(100, 180, 220, ${this.opacity})`
        c.lineWidth = 1.5
        c.stroke()
      }
    }

    // ========== 紫藤花粒子 ==========
    class WisteriaParticle {
      x: number; y: number
      size: number; opacity: number
      pulse: number; pulseSpeed: number
      color: string

      constructor() {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.size = Math.random() * 3 + 1.5
        this.opacity = Math.random() * 0.3 + 0.1
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        const purples = [
          'rgba(180, 130, 220,',
          'rgba(160, 120, 210,',
          'rgba(200, 160, 240,',
          'rgba(140, 100, 190,',
        ]
        this.color = purples[Math.floor(Math.random() * purples.length)]
      }

      update() {
        this.pulse += this.pulseSpeed
        this.x += Math.sin(this.pulse) * 0.2
        this.y += Math.cos(this.pulse * 0.7) * 0.15
      }

      draw() {
        const glow = Math.sin(this.pulse) * 0.15 + this.opacity
        c.beginPath()
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        c.fillStyle = `${this.color} ${glow})`
        c.fill()
        // 光晕
        c.beginPath()
        c.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2)
        c.fillStyle = `${this.color} ${glow * 0.2})`
        c.fill()
      }
    }

    // ========== 日轮刀光粒子 ==========
    class BladeSpark {
      x: number; y: number
      vx: number; vy: number
      life: number; maxLife: number
      size: number

      constructor() {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.life = 0
        this.maxLife = Math.random() * 120 + 60
        this.size = Math.random() * 2 + 0.5
      }

      update() {
        this.life++
        this.x += this.vx * 0.3
        this.y += this.vy * 0.3
        this.vx *= 0.99
        this.vy *= 0.99
        if (this.life > this.maxLife) {
          this.life = 0
          this.x = Math.random() * w
          this.y = Math.random() * h
          this.vx = (Math.random() - 0.5) * 2
          this.vy = (Math.random() - 0.5) * 2
        }
      }

      draw() {
        const progress = this.life / this.maxLife
        const alpha = progress < 0.3
          ? progress / 0.3
          : progress > 0.7
            ? (1 - progress) / 0.3
            : 1
        // 金色刀光
        c.beginPath()
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        c.fillStyle = `rgba(255, 200, 80, ${alpha * 0.35})`
        c.fill()
      }
    }

    // 初始化所有元素
    const petals: Petal[] = Array.from({ length: 35 }, () => {
      const p = new Petal()
      p.y = Math.random() * h // 初始随机分布
      return p
    })
    const ripples: WaterRipple[] = Array.from({ length: 5 }, () => new WaterRipple())
    const wisteriaParticles: WisteriaParticle[] = Array.from({ length: 50 }, () => new WisteriaParticle())
    const bladeSparks: BladeSpark[] = Array.from({ length: 20 }, () => new BladeSpark())

    const animate = () => {
      c.clearRect(0, 0, w, h)

      // 水之呼吸波纹（底层）
      ripples.forEach((r) => { r.update(); r.draw() })

      // 紫藤花粒子（中层）
      wisteriaParticles.forEach((p) => { p.update(); p.draw() })

      // 日轮刀光（中层）
      bladeSparks.forEach((s) => { s.update(); s.draw() })

      // 樱花花瓣（顶层）
      petals.forEach((p) => { p.update(); p.draw() })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: theme === 'dark' ? 0.6 : 1 }}
    />
  )
}
