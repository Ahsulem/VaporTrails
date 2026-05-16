'use client'
import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import './auth.css'

type Mode = 'SIGN_IN' | 'SIGN_UP'

function resolveCallbackError(code: string | null): string | null {
  if (!code) return null
  if (code === 'callback_failed') return 'Authentication failed. Please try again.'
  if (code === 'missing_code') return 'Invalid auth link. Please try again.'
  return 'Something went wrong.'
}

function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackError = searchParams.get('error')

  const [mode, setMode] = useState<Mode>('SIGN_IN')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // redirect already-signed-in users away
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/')
    })
  }, [router])

  const switchMode = (next: Mode) => {
    setMode(next)
    setError(null)
  }

  const handleGoogle = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${globalThis.location.origin}/auth/callback`,
        queryParams: { prompt: 'select_account' },
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const supabase = createClient()

    if (mode === 'SIGN_IN') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/play')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/play')
    }

    setLoading(false)
  }

  const displayError = error ?? resolveCallbackError(callbackError)

  return (
    <div className="auth-shell">
      <div className="auth-wrap">

        <span className="eyebrow auth-eyebrow">// access terminal · vaportrails</span>

        <div className="auth-card panel cut">
          <div className="auth-corner-mark" aria-hidden="true" />

          <div className="auth-tabs" role="tablist">
            <button
              className={`auth-tab${mode === 'SIGN_IN' ? ' active' : ''}`}
              role="tab"
              aria-selected={mode === 'SIGN_IN'}
              onClick={() => switchMode('SIGN_IN')}
            >
              Sign In
            </button>
            <button
              className={`auth-tab${mode === 'SIGN_UP' ? ' active' : ''}`}
              role="tab"
              aria-selected={mode === 'SIGN_UP'}
              onClick={() => switchMode('SIGN_UP')}
            >
              Sign Up
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>

            <button
              type="button"
              className="btn auth-google-btn"
              onClick={handleGoogle}
              disabled={loading}
            >
              <span className="auth-google-glyph">G</span>
              Continue with Google
            </button>

            <div className="auth-divider">
              <span className="auth-divider-line" />
              <span className="auth-divider-text">or authorize via term</span>
              <span className="auth-divider-line" />
            </div>

            <div className="auth-mode-label">
              {mode === 'SIGN_IN' ? '// authenticate · enter credentials' : '// register · create identity'}
            </div>

            {displayError && (
              <div className="auth-error" role="alert">
                <span className="auth-error-prefix">[ERR]</span>{' '}{displayError}
              </div>
            )}

            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-email">Email</label>
              <div className="auth-input-wrap">
                <input
                  id="auth-email"
                  type="email"
                  className="auth-input"
                  placeholder="you@signal.net"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-password">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="auth-password"
                  type="password"
                  className="auth-input"
                  placeholder="············"
                  autoComplete={mode === 'SIGN_IN' ? 'current-password' : 'new-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {mode === 'SIGN_UP' && (
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-confirm">Confirm Password</label>
                <div className="auth-input-wrap">
                  <input
                    id="auth-confirm"
                    type="password"
                    className="auth-input"
                    placeholder="············"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button type="submit" className="btn primary auth-submit" disabled={loading}>
              {loading ? 'Processing...' : mode === 'SIGN_IN' ? 'Access terminal' : 'Create identity'}
              {!loading && <span className="glyph">→</span>}
            </button>

            <div className="auth-footer-link">
              {mode === 'SIGN_IN' ? (
                <button type="button" className="auth-link">
                  Forgot password?
                </button>
              ) : (
                <button type="button" className="auth-link" onClick={() => switchMode('SIGN_IN')}>
                  Already have an account?
                </button>
              )}
            </div>

          </form>
        </div>

        <div className="auth-status">
          <span className="auth-status-dot" />
          <span>Secure connection · AES-256 · TLS 1.3</span>
        </div>

      </div>
    </div>
  )
}

export default function AuthPageWrapper() {
  return (
    <Suspense fallback={null}>
      <AuthPage />
    </Suspense>
  )
}
