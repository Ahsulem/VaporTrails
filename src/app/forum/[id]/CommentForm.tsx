'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface CommentFormProps {
  threadId: string
}

export function CommentForm({ threadId }: CommentFormProps) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      setError('You must be signed in to leave a comment.')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('comments')
      .insert({
        thread_id: threadId,
        content,
        user_id: session.user.id,
      })

    setLoading(false)

    if (insertError) {
      setError(insertError.message)
    } else {
      setContent('')
      // Re-run the Server Component so the new comment appears in the list
      router.refresh()
    }
  }

  return (
    <form className="forum-comment-form" onSubmit={handleSubmit}>
      <div style={{
        fontFamily: 'var(--f-mono)', fontSize: '10px',
        letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--t-4)',
      }}>
        // append transmission
      </div>

      {error && (
        <div className="forum-error" role="alert">
          <span className="forum-error-prefix">[ERR]</span> {error}
        </div>
      )}

      <div className="forum-input-wrap">
        <textarea
          className="forum-input"
          placeholder="ENTER_DATA_PACKET..."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn primary forum-comment-submit"
        disabled={loading}
      >
        {loading ? 'Transmitting...' : 'Post Comment'}
        {!loading && <span className="glyph">→</span>}
      </button>
    </form>
  )
}
