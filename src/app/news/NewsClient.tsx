'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

const ALL_POSTS = [
  { id: 1, cat: 'Dev log', date: '05 · 04 · 26', read: '22 min read', title: 'Building the rain shader.', body: 'How we faked wet asphalt without bankrupting the GPU. Devlog with shader graphs.', pillCls: '' },
  { id: 2, cat: 'Event', date: '05 · 17 · 26', read: 'register open', title: 'Midnight tournament.', body: '72-hour single elim. Prizes include in-game decals and a real motorcycle.', pillCls: 'event' },
  { id: 3, cat: 'Lore drop', date: '04 · 15 · 26', read: '9 min read', title: 'Who lit the first neon?', body: 'A short fiction piece from the studio\'s lore writer. Canon (mostly).', pillCls: 'lore' },
  { id: 4, cat: 'Patch notes', date: '04 · 08 · 26', read: '2 min read', title: 'Hotfix: trail vapor flicker.', body: 'That one weird bug where vapor disappeared at 144hz. Squashed.', pillCls: '' },
  { id: 5, cat: 'Community', date: '04 · 01 · 26', read: '5 min read', title: 'Decal contest winners.', body: 'Twelve community decals are now in the game. Full gallery + interviews.', pillCls: 'community' },
  { id: 6, cat: 'Dev log', date: '03 · 21 · 26', read: '14 min read', title: 'Audio: scoring the underground.', body: 'Conversation with composer about adaptive music + a streamable mixtape.', pillCls: '' },
  { id: 7, cat: 'Patch notes', date: '03 · 14 · 26', read: '8 min read', title: 'The garage update.', body: 'Custom paint, 14 new chassis kits, sticker layer rework.', pillCls: '' },
  { id: 8, cat: 'Event', date: '03 · 02 · 26', read: 'recap', title: 'Glitch festival recap.', body: 'What happened inside the 6-hour in-game underground rave. Spoiler: chaos.', pillCls: 'event' },
  { id: 9, cat: 'Lore drop', date: '02 · 18 · 26', read: '11 min read', title: 'The Bureau dossier.', body: 'Field notes on the neon bureau. Memos. Polaroids. Redactions.', pillCls: 'lore' },
  { id: 10, cat: 'Community', date: '02 · 05 · 26', read: '7 min read', title: 'Fan art round-up: January.', body: '40 pieces from the community. Some of the best work we\'ve seen.', pillCls: 'community' },
  { id: 11, cat: 'Dev log', date: '01 · 28 · 26', read: '18 min read', title: 'Combat system deep-dive.', body: 'How the flow meter works under the hood. Every frame matters.', pillCls: '' },
  { id: 12, cat: 'Patch notes', date: '01 · 15 · 26', read: '4 min read', title: 'Balance pass 0.6.8.', body: 'Nine weapons retuned, matchmaking improvements, ranked decay fixed.', pillCls: '' },
]

const CATEGORIES = ['All', 'Patch notes', 'Dev logs', 'Events', 'Lore drops', 'Community']

const catMap: Record<string, string> = {
  'Patch notes': 'Patch notes',
  'Dev logs': 'Dev log',
  'Events': 'Event',
  'Lore drops': 'Lore drop',
  'Community': 'Community',
}

const PAGE_SIZE = 9

export default function NewsClient() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let list = ALL_POSTS
    if (activeFilter !== 'All') {
      const match = catMap[activeFilter]
      list = list.filter(p => p.cat === match)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q))
    }
    return list
  }, [activeFilter, query])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  function handleFilter(cat: string) {
    setActiveFilter(cat)
    setPage(1)
  }

  return (
    <>
      {/* FILTER BAR */}
      <div className="filterbar">
        <div className="chips">
          {CATEGORIES.map(cat => (
            <button key={cat} className={`chip${activeFilter === cat ? ' on' : ''}`} onClick={() => handleFilter(cat)}>{cat}</button>
          ))}
        </div>
        <div className="search">
          <input
            placeholder="search transmissions…"
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(1) }}
          />
        </div>
      </div>

      {/* POST GRID */}
      <div className="section-head">
        <div className="left">
          <span className="eyebrow">// 02 · latest on the wire</span>
          <h2>Recent <span className="accent">transmissions</span>.</h2>
        </div>
        <span className="mono" style={{ color: 'var(--t-3)', fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase' }}>
          Showing {visible.length} of {filtered.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: '60px 0', textAlign: 'center', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--t-3)' }}>
          No transmissions match that signal.
        </div>
      ) : (
        <section className="posts">
          {visible.map(p => (
            <article key={p.id} className="post">
              <div className="thumb"><span className={`pill${p.pillCls ? ' ' + p.pillCls : ''}`}>{p.cat}</span></div>
              <div className="body">
                <div className="meta-row"><span>{p.date}</span><span>{p.read}</span></div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="more"><span>Read →</span></div>
              </div>
            </article>
          ))}
        </section>
      )}

      {hasMore && (
        <div className="loadmore">
          <button className="btn" onClick={() => setPage(p => p + 1)}>
            Load {Math.min(PAGE_SIZE, filtered.length - visible.length)} more transmissions <span className="glyph">↓</span>
          </button>
        </div>
      )}
    </>
  )
}
