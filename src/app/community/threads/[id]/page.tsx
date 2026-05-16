import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: thread } = await supabase
    .from('threads')
    .select('id, title, excerpt, category, replies_count, views_count, created_at, profiles(username, avatar_url)')
    .eq('id', params.id)
    .single()

  if (!thread) notFound()

  const author = (thread as any).profiles?.username ?? 'unknown'

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <header className="pagehead" data-reveal style={{ paddingTop: 80 }}>
        <Link
          href="/community"
          style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--t-3)', textDecoration: 'none' }}
        >
          ← Back to community
        </Link>
        <div style={{ marginTop: 24, fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--cyan)' }}>
          // {(thread as any).category}
        </div>
        <h1 style={{ fontSize: 48, fontFamily: 'var(--f-display)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-.01em', textTransform: 'uppercase', margin: '16px 0 0' }}>
          {(thread as any).title}
        </h1>
        <div style={{ marginTop: 20, display: 'flex', gap: 28, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--t-3)' }}>
          <span>by <b style={{ color: 'var(--cyan)' }}>{author}</b></span>
          <span><b style={{ color: 'var(--t-1)' }}>{(thread as any).replies_count ?? 0}</b> replies</span>
          <span><b style={{ color: 'var(--t-1)' }}>{((thread as any).views_count ?? 0).toLocaleString()}</b> views</span>
        </div>
      </header>

      <section style={{ padding: '60px 0', borderBottom: '1px solid var(--b-2)' }}>
        <p style={{ fontSize: 16, color: 'var(--t-2)', lineHeight: 1.6, maxWidth: '70ch' }}>
          {(thread as any).excerpt}
        </p>
      </section>

      <div style={{ padding: '40px 0', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--t-4)', letterSpacing: '.18em', textTransform: 'uppercase' }}>
        [THREAD_BODY] Full reply thread rendering not yet implemented.
      </div>
    </div>
  )
}
