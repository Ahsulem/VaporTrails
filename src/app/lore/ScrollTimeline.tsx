'use client'
import { useEffect, useRef } from 'react'

const milestones = [
  { side: 'left', label: '// 03 · 18 · 2086 · record A-0001', yr: '2086', title: 'First neon bloom.', text: "Neon East's grid is brought online by a consortium of three corporations. Promotional film shows two children chasing a holographic koi through a rain-slick alley. The film loops on every public screen for 14 years." },
  { side: 'right', label: '// 11 · 02 · 2089 · record A-0117', yr: '2089', title: 'The Outage.', text: 'Without warning, the entire analog backbone of the eastern grid drops for 38 hours. No one claims responsibility. A new black-market communication standard called "trail" emerges in the dark, written on motorbike-mounted antennas.' },
  { side: 'left', label: '// 07 · 14 · 2092 · record A-0421', yr: '2092', title: 'Crash year.', text: 'Two of the three founding corps fold inside the same quarter. Neon East fragments into seven autonomous districts overnight. Half the population learns to read by brownout-light. The first courier gangs form to move data physically.' },
  { side: 'right', label: '// 02 · 22 · 2094 · record B-0014', yr: '2094', title: 'Vapor underground forms.', text: 'A loose collective of couriers, mechanics, and pirate broadcasters agree on a single shared protocol: leave a trail. Mark every route. Help the next rider through. By the end of the year, "vapor" is slang for the whole network.' },
  { side: 'left', label: '// 09 · 09 · 2096 · record C-0001', yr: '2096', title: 'The first trail run.', text: 'A 23-year-old courier named Hex carries an encrypted package from Spire 12 to the outer ring in 4 minutes 11 seconds — faster than the official grid could route a signal that night. The run is anonymously livestreamed. The legend starts here.' },
  { side: 'right', label: '// 04 · 30 · 2097 · record S-0001', yr: '2097', title: 'Project Vaportrails begins.', text: 'The studio is founded by three ex-couriers and a former audio engineer. They rent a garage above a soba shop in Neon East. Goal: make a game that captures the feel of running a trail, without anyone having to actually break a leg.' },
  { side: 'left', label: '// 12 · 12 · 2098 · record S-0418', yr: '2098', title: 'Beta network goes live.', text: 'Closed beta to 800 couriers. Server crashes in 11 minutes. Server crashes 14 more times that night. By morning, every player has signed the NDA in blood (figuratively) and asked when the next test is.' },
  { side: 'right', label: '// 05 · 12 · 2099 · YOU ARE HERE', yr: '2099', title: 'You arrive.', text: 'The grid is unstable. The bureau is watching. The trail is wide open. The garage is hiring. Pick your chassis, register a handle, and burn out. Welcome to Vaportrails.', now: true },
]

export default function ScrollTimeline() {
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const endcapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const milestoneEls = trackRef.current?.querySelectorAll<HTMLElement>('.milestone')
    const fill = fillRef.current
    const endcap = endcapRef.current
    const track = trackRef.current
    if (!milestoneEls || !fill || !endcap || !track) return

    let raf: number | null = null

    function update() {
      raf = null
      const vh = window.innerHeight
      const viewCenter = vh / 2
      const fullRange = vh * 0.30
      const fadeRange = vh * 0.28

      milestoneEls!.forEach(m => {
        const r = m.getBoundingClientRect()
        const c = r.top + r.height / 2
        const dist = Math.abs(c - viewCenter)
        let opacity: number
        if (dist <= fullRange) opacity = 1
        else opacity = Math.max(0, 1 - (dist - fullRange) / fadeRange)
        m.style.opacity = opacity.toFixed(3)
        const offset = (1 - opacity) * (c < viewCenter ? -14 : 14)
        m.style.transform = `translateY(${offset}px)`
      })

      const tr = track!.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (viewCenter - tr.top) / tr.height))
      fill!.style.height = (progress * 100).toFixed(1) + '%'

      const arr = Array.from(milestoneEls!)
      const last = arr[arr.length - 1].getBoundingClientRect()
      const lastCenter = last.top + last.height / 2
      if (lastCenter < viewCenter - 20) endcap!.classList.add('show')
      else endcap!.classList.remove('show')
    }

    function schedule() { if (raf == null) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="timeline" id="timeline-track" ref={trackRef}>
      <div className="scrubber">
        <div className="fill" ref={fillRef} />
        {[['0%','2086'],['25%','2092'],['50%','2094'],['75%','2097'],['100%','2099 / NOW']].map(([top, yr]) => (
          <div key={yr} className="tick" style={{ top }}><span>{yr}</span></div>
        ))}
      </div>

      {milestones.map(({ side, label, yr, title, text, now }) => (
        <article key={yr + title} className={`milestone ${side}${now ? ' now' : ''}`}>
          <span className="label" style={now ? { color: '#fff', opacity: .7 } : {}}>{label}</span>
          <div className="yr">{yr}</div>
          <h3 style={now ? { color: '#fff' } : {}}>{title}</h3>
          <p style={now ? { color: 'rgba(255,255,255,.85)' } : {}}>{text}</p>
        </article>
      ))}

      <div className="endcap" ref={endcapRef}>
        <i />
        <p>End of transmission · scroll up to rewind</p>
      </div>
    </div>
  )
}
