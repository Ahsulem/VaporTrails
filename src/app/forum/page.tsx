import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import './forum.css'

export default async function ForumPage() {
  const supabase = createClient()

  // Fetch all threads ordered by newest first
  const { data: threads } = await supabase
    .from('threads')
    .select('id, title, user_id, created_at')
    .order('created_at', { ascending: false })

  // Batch-fetch comment counts per thread
  const threadIds = threads?.map((t) => t.id) ?? []

  // Fetch comment counts in a single query using the thread_id list
  const { data: commentRows } = await supabase
    .from('comments')
    .select('thread_id')
    .in('thread_id', threadIds.length ? threadIds : ['00000000-0000-0000-0000-000000000000'])

  // Build a lookup map:  threadId → count
  const replyCount: Record<string, number> = {}
  for (const row of commentRows ?? []) {
    replyCount[row.thread_id] = (replyCount[row.thread_id] ?? 0) + 1
  }

  // Fetch usernames for every unique user_id in one round-trip
  const uniqueUserIds = Array.from(new Set(threads?.map((t) => t.user_id) ?? []))
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, username')
    .in('id', uniqueUserIds.length ? uniqueUserIds : ['00000000-0000-0000-0000-000000000000'])

  const profileMap: Record<string, string> = {}
  for (const p of profiles ?? []) {
    profileMap[p.id] = p.username ?? 'ghost_rider'
  }

  const formatRelative = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const mins  = Math.floor(diff / 60_000)
    const hours = Math.floor(diff / 3_600_000)
    const days  = Math.floor(diff / 86_400_000)
    if (mins  < 60)  return `${mins || 1} min ago`
    if (hours < 24)  return `${hours} hr ago`
    return `${days} day${days !== 1 ? 's' : ''} ago`
  }

  return (
    <div className="page" style={{ paddingTop: '120px' }}>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="forum-header">
        <div>
          <span className="eyebrow">// community network</span>
          <h1 className="display" style={{ fontSize: 'clamp(32px, 5vw, 54px)', margin: '12px 0 0' }}>
            Forum <span style={{ color: 'var(--cyan)' }}>Feed</span>.
          </h1>
        </div>
        <Link href="/forum/new" className="btn cyan sm">
          New Thread <span className="glyph">+</span>
        </Link>
      </div>

      {/* ── Thread list ──────────────────────────────────────────── */}
      {!threads || threads.length === 0 ? (
        <p className="forum-empty">// No transmissions yet. Be the first to broadcast.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {threads.map((thread) => (
            <Link key={thread.id} href={`/forum/${thread.id}`} className="forum-card">

              <div className="forum-card-meta">
                <span className="eyebrow">
                  User //{' '}
                  <span style={{ color: 'var(--t-1)' }}>
                    {profileMap[thread.user_id] ?? 'ghost_rider'}
                  </span>
                </span>
                <span className="eyebrow dim">{formatRelative(thread.created_at)}</span>
              </div>

              <h2 className="forum-card-title">{thread.title}</h2>

              <div className="forum-card-footer">
                <span>View Transmission</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--t-3)' }}>
                    [{replyCount[thread.id] ?? 0} replies]
                  </span>
                  <span className="glyph">→</span>
                </span>
              </div>

            </Link>
          ))}
        </div>
      )}

    </div>
  )
}
