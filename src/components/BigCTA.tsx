import type { ReactNode } from 'react'

interface Props {
  eyebrow?: string
  title: ReactNode
  sub?: string
  cta?: string
  ctaHref?: string
  note?: string
}

export default function BigCTA({ eyebrow = '// free · browser build · no install', title, sub = '/ 80mb · 60fps · webgl 2', cta = 'Play Vaportrails now', ctaHref = 'https://sevencrane.itch.io/vapor-trails', note = 'also on steam · ps · xbox' }: Readonly<Props>) {
  return (
    <section className="section" id="play">
      <div className="bigcta">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 style={{ marginTop: 18 }}>{title}</h2>
        </div>
        <div className="meta">
          <span className="sub">{sub}</span>
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn primary lg"><span className="glyph">▶</span> {cta}</a>
          <span className="sub" style={{ opacity: .6 }}>{note}</span>
        </div>
      </div>
    </section>
  )
}
