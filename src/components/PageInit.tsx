'use client'
import { useEffect, useRef } from 'react'

export default function PageInit() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Unblock interaction when fade starts; remove from DOM after animation
    const unblock = setTimeout(() => { if (el) el.style.pointerEvents = 'none' }, 850)
    const hide    = setTimeout(() => { if (el) el.style.display = 'none' }, 1300)
    return () => { clearTimeout(unblock); clearTimeout(hide) }
  }, [])

  return (
    <div className="page-init" ref={ref} aria-hidden="true">
      <div className="scanlines" />
      <div className="boot-content">
        <div className="boot-eyebrow">// VAPORTRAILS · v0.7.3</div>
        <div className="boot-title">NEON EAST</div>
        <div className="boot-status">connecting to grid...</div>
        <div className="boot-bar"><div className="boot-fill" /></div>
        <div className="boot-note">district 04 · 2099</div>
      </div>
    </div>
  )
}
