'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import '../forum.css'

export default function NewThreadPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [title, setTitle]     = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  // Guard: redirect to /auth if there is no active session
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/auth')
      } else {
        setUserId(session.user.id)
      }
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return

    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: insertError } = await supabase
      .from('threads')
      .insert({ title, content, user_id: userId })

    setLoading(false)

    if (insertError) {
      setError(insertError.message)
    } else {
      router.push('/forum')
    }
  }

  // Render a neutral loading gate while session resolves
  if (!userId) {
    return (
      <div className="forum-gate">
        Verifying secure connection...
      </div>
    )
  }

  return (
    <div className="page" style={{ paddingTop: '120px', maxWidth: '680px' }}>

      {/* Breadcrumb */}
      <Link href="/forum" className="forum-back">
        ← Forum feed
      </Link>

      {/* Eyebrow */}
      <span className="eyebrow" style={{ display: 'block', marginBottom: '12px' }}>
        // forum_os · new transmission
      </span>

      {/* Page title */}
      <h1 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '32px' }}>
        New <span style={{ color: 'var(--cyan)' }}>Thread</span>.
      </h1>

      {/* Form card — same panel treatment as auth-card */}
      <div className="panel cut" style={{ borderColor: 'var(--b-2)', boxShadow: '0 0 60px -20px rgba(76,201,240,.12)', overflow: 'hidden', position: 'relative' }}>

        {/* Cut-corner cyan accent — mirrors auth-corner-mark */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, right: 0,
          width: '16px', height: '16px',
          background: 'var(--cyan)', opacity: .3,
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <form
          onSubmit={handleSubmit}
          style={{ padding: '32px 36px 36px', display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative', zIndex: 1 }}
        >

          <div className="auth-mode-label" style={{
            fontFamily: 'var(--f-mono)', fontSize: '10px',
            letterSpacing: '.24em', textTransform: 'uppercase',
            color: 'var(--t-4)',
          }}>
            // establish new thread · fill all fields
          </div>

          {error && (
            <div className="forum-error" role="alert">
              <span className="forum-error-prefix">[ERR]</span> {error}
            </div>
          )}

          {/* Title field */}
          <div className="forum-field">
            <label className="forum-label" htmlFor="thread-title">Title</label>
            <div className="forum-input-wrap">
              <input
                id="thread-title"
                type="text"
                className="forum-input"
                placeholder="SUBJECT_LINE..."
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {/* Content body field */}
          <div className="forum-field">
            <label className="forum-label" htmlFor="thread-content">Content Body</label>
            <div className="forum-input-wrap">
              <textarea
                id="thread-content"
                className="forum-input"
                placeholder="ENTER_TRANSMISSION_PAYLOAD..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          {/* Submit — reuses .btn.primary + .forum-submit for full-width clip */}
          <button
            type="submit"
            className="btn primary forum-submit"
            disabled={loading}
          >
            {loading ? 'Transmitting...' : 'Submit Post'}
            {!loading && <span className="glyph">→</span>}
          </button>

        </form>
      </div>

      {/* Status strip — mirrors auth-status */}
      <div style={{
        marginTop: '18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        fontFamily: 'var(--f-mono)', fontSize: '9px', letterSpacing: '.28em',
        textTransform: 'uppercase', color: 'var(--t-4)',
      }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px rgba(35,209,139,.6)', flexShrink: 0 }} />
        Secure connection · AES-256 · TLS 1.3
      </div>

    </div>
  )
}
