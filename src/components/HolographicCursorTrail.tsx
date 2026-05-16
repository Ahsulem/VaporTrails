'use client'
import { useEffect, useRef } from 'react'

interface TrailPoint {
  x: number
  y: number
  alpha: number
}

const TRAIL_MAX = 80
const ALPHA_DECAY = 0.028
const CYAN = '#4cc9f0'

export default function HolographicCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const trail: TrailPoint[] = []
    let rafId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const onPointerMove = (e: PointerEvent) => {
      trail.push({ x: e.clientX, y: e.clientY, alpha: 1 })
      if (trail.length > TRAIL_MAX) trail.shift()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (trail.length > 1) {
        const pulse = 8 + 6 * Math.sin(Date.now() / 280)
        ctx.strokeStyle = CYAN
        ctx.shadowColor = CYAN
        ctx.shadowBlur = pulse
        ctx.lineWidth = 1.5
        ctx.lineCap = 'butt'
        ctx.lineJoin = 'round'

        for (let i = 1; i < trail.length; i++) {
          const pt = trail[i]
          ctx.globalAlpha = pt.alpha
          ctx.beginPath()
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
          ctx.lineTo(pt.x, pt.y)
          ctx.stroke()
        }

        ctx.globalAlpha = 1
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].alpha -= ALPHA_DECAY
        if (trail[i].alpha <= 0) {
          trail.splice(0, i + 1)
          break
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
      aria-hidden="true"
    />
  )
}
