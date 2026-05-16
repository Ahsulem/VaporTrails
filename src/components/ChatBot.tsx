'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

type Message = { id: string; role: 'user' | 'assistant'; content: string }
type WinState = 'closed' | 'open' | 'minimized'

export default function ChatBot() {
  const [winState, setWinState] = useState<WinState>('closed')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const dragActive = useRef(false)
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 })
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setPos({
      x: Math.max(0, window.innerWidth - 444 - 24),
      y: Math.max(0, window.innerHeight - 560 - 24),
    })
  }, [])

  // Document-level listeners so drag continues even when pointer leaves the header
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragActive.current) return
      const dx = e.clientX - dragStart.current.mx
      const dy = e.clientY - dragStart.current.my
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 444, dragStart.current.px + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 48, dragStart.current.py + dy)),
      })
    }
    const onUp = () => { dragActive.current = false }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  // Scroll to bottom on every new message or when loading indicator appears
  useEffect(() => {
    if (winState === 'open' && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading, winState])

  useEffect(() => {
    if (winState === 'open') {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [winState])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
      })
      const data = await res.json() as { role: 'assistant'; content: string }
      setMessages(m => [...m, { id: crypto.randomUUID(), ...data }])
    } catch {
      setMessages(m => [...m, { id: crypto.randomUUID(), role: 'assistant', content: '[ERR] CONNECTION LOST — RETRY' }])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  // Capture drag origin — only fires on the bare header, not its buttons
  const onHeaderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragActive.current = true
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }
  }

  if (!mounted) return null

  const isMin = winState === 'minimized'
  const isVisible = winState === 'open' || isMin

  return (
    <>
      {winState === 'closed' && (
        <button
          className="vos-trigger"
          onClick={() => setWinState('open')}
          aria-label="Open VAPOR_OS terminal"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1L14.5 4.75V11.25L8 15L1.5 11.25V4.75L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M8 5.5L11 7.25V10.75L8 12.5L5 10.75V7.25L8 5.5Z" fill="currentColor" opacity="0.55"/>
          </svg>
          <span>VAPOR_OS</span>
        </button>
      )}

      {isVisible && (
        <div className="vos-outer" style={{ left: pos.x, top: pos.y }}>
          <div className={`vos-window${isMin ? ' vos-min' : ''}`}>

            <div className="vos-header" role="toolbar" aria-label="Window controls" onMouseDown={onHeaderMouseDown}>
              <div className="vos-header-l">
                <span className="vos-dot vos-dot-r" />
                <span className="vos-dot vos-dot-a" />
                <span className="vos-dot vos-dot-g" />
                <span className="vos-wname">{'// VAPOR_OS_CORE'}</span>
              </div>
              <div className="vos-header-r">
                <button
                  className="vos-hbtn"
                  onMouseDown={e => e.stopPropagation()}
                  onClick={() => setWinState(s => s === 'minimized' ? 'open' : 'minimized')}
                  aria-label={isMin ? 'Restore' : 'Minimize'}
                >
                  {isMin ? '□' : '—'}
                </button>
                <button
                  className="vos-hbtn vos-hbtn-x"
                  onMouseDown={e => e.stopPropagation()}
                  onClick={() => setWinState('closed')}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {!isMin && (
              <>
                <div className="vos-statusbar">
                  <span className="vos-live"><i />LIVE</span>
                  <span>LLAMA·3.3·70B</span>
                  <span>GROQ·NETWORK</span>
                </div>

                <div className="vos-msgs">
                  {messages.length === 0 && (
                    <div className="vos-boot">
                      <p>[SYS] VAPOR_OS_CORE v2.099 INITIALIZED</p>
                      <p>[SYS] GROQ INFERENCE ENGINE: ONLINE</p>
                      <p>[SYS] AWAITING INPUT_</p>
                    </div>
                  )}
                  {messages.map((m) => (
                    <div key={m.id} className={`vos-msg vos-msg-${m.role}`}>
                      <span className="vos-pfx">{m.role === 'user' ? '>' : '[CORE]'}</span>
                      <span className="vos-txt">{m.content}</span>
                    </div>
                  ))}
                  {loading && (
                    <div className="vos-msg vos-msg-assistant">
                      <span className="vos-pfx">[CORE]</span>
                      <span className="vos-blink">_</span>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                <div className="vos-input-row">
                  <span className="vos-arrow">▶</span>
                  <input
                    ref={inputRef}
                    className="vos-inp"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="ENTER COMMAND..."
                    disabled={loading}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <button
                    className="vos-sbtn"
                    onClick={send}
                    disabled={loading || !input.trim()}
                    aria-label="Send"
                  >
                    ⏎
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
