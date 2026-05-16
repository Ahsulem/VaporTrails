'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [path])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/news', label: 'News' },
    { href: '/lore', label: 'Lore' },
    { href: '/community', label: 'Community' },
  ]

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
          <Link href="#" className="btn sm">Sign in</Link>
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
            <Link href="#" className="btn sm" onClick={() => setMenuOpen(false)}>Sign in</Link>
            <Link href="/#play" className="btn primary sm" onClick={() => setMenuOpen(false)}>▶ Play</Link>
          </div>
        </div>
      )}
    </>
  )
}
