import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CommentForm } from './CommentForm'
import '../forum.css'

export default async function ThreadDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient()

  // ── 1. Fetch the thread ─────────────────────────────────────────────────
  const { data: thread } = await supabase
    .from('threads')
    .select('id, title, content, user_id, created_at')
    .eq('id', params.id)
    .single()

  if (!thread) notFound()

  // ── 2. Fetch the author profile (separate query — no direct FK to profiles) ─
  const { data: authorProfile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', thread.user_id)
    .single()

  const authorName = authorProfile?.username ?? 'ghost_rider'

  // ── 3. Fetch all comments for this thread ───────────────────────────────
  const { data: comments } = await supabase
    .from('comments')
    .select('id, content, user_id, created_at')
    .eq('thread_id', params.id)
    .order('created_at', { ascending: true })

  // ── 4. Batch-fetch commenter profiles in one round-trip ─────────────────
  const commenterIds = Array.from(new Set(comments?.map((c) => c.user_id) ?? []))

  const { data: commenterProfiles } = await supabase
    .from('profiles')
    .select('id, username')
    .in(
      'id',
      commenterIds.length
        ? commenterIds
        : ['00000000-0000-0000-0000-000000000000'],
    )

  const profileMap: Record<string, string> = {}
  for (const p of commenterProfiles ?? []) {
    profileMap[p.id] = p.username ?? 'ghost_rider'
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    })

  return (
    <div className="page" style={{ paddingTop: '120px', maxWidth: '800px' }}>

      {/* ── Breadcrumb ────────────────────────────────────────────────── */}
      <Link href="/forum" className="forum-back">
        ← Forum feed
      </Link>

      {/* ── Focal thread card ─────────────────────────────────────────── */}
      <article className="forum-thread-card">
        <div className="forum-thread-inner">

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '28px',
          }}>
            <span className="eyebrow">
              Author //{' '}
              <span style={{ color: 'var(--cyan)' }}>{authorName}</span>
            </span>
            <span className="eyebrow dim">{formatDate(thread.created_at)}</span>
          </div>

          <h1 className="forum-thread-title">{thread.title}</h1>

          <div className="forum-thread-body">{thread.content}</div>

        </div>
      </article>

      {/* ── Comments section ──────────────────────────────────────────── */}
      <section>

        <div className="forum-section-label">
          <i aria-hidden="true" />
          <h2>Transmissions</h2>
          {comments && comments.length > 0 && (
            <span style={{
              fontFamily: 'var(--f-mono)', fontSize: '10px',
              letterSpacing: '.22em', color: 'var(--t-3)',
            }}>
              [{comments.length}]
            </span>
          )}
        </div>

        {/* Client island — comment input */}
        <CommentForm threadId={params.id} />

        {/* Existing comments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {!comments || comments.length === 0 ? (
            <p className="forum-empty">
              // No transmissions yet. Start the signal.
            </p>
          ) : (
            comments.map((comment, idx) => (
              <div key={comment.id} className="forum-comment">

                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span className="eyebrow">
                    <span style={{ color: 'var(--t-4)', marginRight: '8px' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    User //{' '}
                    <span style={{ color: 'var(--cyan)' }}>
                      {profileMap[comment.user_id] ?? 'ghost_rider'}
                    </span>
                  </span>
                  <span className="eyebrow dim">{formatDate(comment.created_at)}</span>
                </div>

                <div className="forum-comment-body">{comment.content}</div>

              </div>
            ))
          )}
        </div>

      </section>
    </div>
  )
}
