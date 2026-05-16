'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import './play.css'

type Phase = 'drawing' | 'filling' | 'body' | 'done'

const GLYPHS = '01アイウカキクコサシスセタチツテナニヌ//\\∆§ΩΨ◇◈░▒▓>_'
const NUM_STREAMS = 14
const STREAM_LEN = 24

export default function PlayWelcome({ username }: { readonly username: string }) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('drawing')

  const [streams, setStreams] = useState<string[]>([])
  useEffect(() => {
    setStreams(
      Array.from({ length: NUM_STREAMS }, () =>
        Array.from({ length: STREAM_LEN }, () =>
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ).join('\n')
      )
    )
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('filling'), 2000)
    const t2 = setTimeout(() => setPhase('body'), 3000)
    const t3 = setTimeout(() => setPhase('done'), 7000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    if (phase === 'done') router.push('/')
  }, [phase, router])

  const isFilled = phase !== 'drawing'
  const hasBody = phase === 'body' || phase === 'done'

  return (
    <div className="ps-screen">
      <div className="ps-glitch-a" />
      <div className="ps-glitch-b" />
      <div className="ps-grid" />
      <div className="ps-scanlines" />

      <div className="ps-streams" aria-hidden="true">
        {streams.map((chars, i) => (
          <div
            key={i}
            className="ps-stream"
            style={{ '--si': i } as React.CSSProperties}
          >
            {chars}
          </div>
        ))}
      </div>

      <div className="ps-content">
        <div className="ps-title-wrap">
          <h1 className="ps-title-stroke">
            Welcome <span>{username}</span>
          </h1>
          <h1
            className={`ps-title-fill${isFilled ? ' visible' : ''}`}
            aria-hidden="true"
          >
            Welcome <span className="ps-accent">{username}</span>
          </h1>
          <div className="ps-mask" />
        </div>

        <p className={`ps-body${hasBody ? ' zapping' : ''}`}>
          The cold trails left in the legion&apos;s wake await{' '}
          <span className="ps-accent">thee</span>.
        </p>
      </div>

      <div className="ps-corner tl" />
      <div className="ps-corner tr" />
      <div className="ps-corner bl" />
      <div className="ps-corner br" />
    </div>
  )
}
