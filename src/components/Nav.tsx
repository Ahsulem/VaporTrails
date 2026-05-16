'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

function resolveUsername(user: User | null): string | null {
  if (!user) return null
  return (
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split('@')[0] ??
    null
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [path])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsername(resolveUsername(session?.user ?? null))
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsername(resolveUsername(session?.user ?? null))
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    // onAuthStateChange clears username state automatically
  }

  const handleSwitchAccount = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth')
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/news', label: 'News' },
    { href: '/lore', label: 'Lore' },
    { href: '/community', label: 'Community' },
  ]

  const userSlot = username ? (
    <div className="nav-user-wrap">
      <span className="nav-user">// {username} ▾</span>
      <div className="nav-user-drop">
        <span className="nav-drop-label">// {username}</span>
        <button className="nav-drop-item" onClick={handleSignOut}>Sign out</button>
        <button className="nav-drop-item danger" onClick={handleSwitchAccount}>
          Sign in with a different account
        </button>
      </div>
    </div>
  ) : (
    <Link href="/auth" className="btn sm">Sign in</Link>
  )

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" className="brand">
          <i /><span>Vaportrails</span>
          <span className="accent">// vpr.trl</span>
        </Link>
        <ul className="links">
          {links.map(({ href, label }) => (
            <li key={label}>
              <Link href={href} className={path === href ? 'current' : ''}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="actions">
          <span className="lang">EN ▾</span>
          {userSlot}
          <Link href="/#play" className="btn primary sm">▶ Play</Link>
        </div>
        <button
          className={`burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {links.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={path === href ? 'current' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-actions">
            {username ? (
              <>
                <span className="nav-user">// {username}</span>
                <button className="btn sm" onClick={handleSignOut}>Sign out</button>
                <button className="btn sm ghost" onClick={handleSwitchAccount}>Switch account</button>
              </>
            ) : (
              <Link href="/auth" className="btn sm" onClick={() => setMenuOpen(false)}>Sign in</Link>
            )}
            <Link href="/#play" className="btn primary sm" onClick={() => setMenuOpen(false)}>▶ Play</Link>
          </div>
        </div>
      )}
    </>
  )
}
