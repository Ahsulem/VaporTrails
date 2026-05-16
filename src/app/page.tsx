export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Footer from '@/components/Footer'
import BigCTA from '@/components/BigCTA'
import './home.css'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="frame">
          <video className="hero-video" autoPlay muted loop playsInline preload="auto">
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="vid-overlay" />
          <div className="glitch-a" />
          <div className="glitch-b" />
          <div className="grid-mesh" />
          <div className="vignette" />
          <div className="scanlines" />
        </div>

        <div className="topbar">
          <div className="cell">
            <b>// gameplay reel</b>
            loop · 4k · 00:42 / 00:42
          </div>
          <div className="cell r">
            <b>NEON EAST 2099</b>
            district 04 · grid status unstable
          </div>
        </div>

        <div className="play" aria-label="Play trailer">
          <span className="ring" />
        </div>

        <div className="content">
          <div className="eyebrow-row">
            <span className="eyebrow">// neon drift · 2099 · single player</span>
            <span className="stat"><b>v0.7.3</b> · open beta</span>
            <span className="stat"><b>42,108</b> riders online</span>
          </div>
          <h1 className="display">
            Vapor<br />
            <span className="neon glitch" data-text="Trails">Trails</span>
            <span className="accent" style={{ color: 'var(--cyan)' }}>.</span>
          </h1>
          <p className="tagline">Run the underground network through Neon East before the bureau catches up. Every drift leaves a trail. Every trail leaves a legend.</p>
          <div className="ctas">
            <Link href="/lore" className="btn lg"><span className="glyph">◇</span> About Vaportrails</Link>
            <Link href="#play" className="btn primary lg"><span className="glyph">▶</span> Play the game</Link>
          </div>
        </div>

        <div className="scroll-cue">SCROLL ↓ for transmission</div>
      </section>

      <div className="page" style={{ paddingTop: 0 }}>

      {/* FEATURES */}
      <section className="features">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 02 · what makes it tick</span>
            <h2>Two pillars.<br />One trail of <span className="accent">vapor</span>.</h2>
          </div>
          <Link href="/lore" className="btn cyan sm">Read the dossier <span className="glyph">→</span></Link>
        </div>

        <div className="grid">
          <article className="feat" data-reveal data-delay="1">
            <span className="corner">01</span>
            <span className="tag">// feature 01 · combat</span>
            <h3>Neon-drenched <span className="accent">combat</span>.</h3>
            <p>Real-time melee + ranged with a flow meter that rewards style chains. Slow-motion finishers, parry-into-trail mechanics, and the city itself as your third weapon.</p>
            <div className="media combat">
              <span className="lbl">// 04 · trail combo · style 5.4×</span>
            </div>
            <div className="specs">
              <div><small>moves</small><b>48</b></div>
              <div><small>chains</small><b>∞</b></div>
              <div><small>weapons</small><b>17</b></div>
            </div>
          </article>

          <article className="feat" data-reveal data-delay="2">
            <span className="corner">02</span>
            <span className="tag">// feature 02 · world</span>
            <h3>An open <span className="accent">neo-grid</span>.</h3>
            <p>Four interconnected districts you can run, climb, or carve through. Weather shifts the routes. Brownouts close highways. The city remembers what happened there last week.</p>
            <div className="media world">
              <span className="lbl">// 02 · district map · neon east</span>
            </div>
            <div className="specs">
              <div><small>districts</small><b>04</b></div>
              <div><small>routes</small><b>132</b></div>
              <div><small>hideouts</small><b>28</b></div>
            </div>
          </article>
        </div>
      </section>

      {/* NEWS */}
      <section className="news">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 03 · transmissions</span>
            <h2>Latest from <span className="accent">the wire</span>.</h2>
          </div>
          <Link href="/news" className="btn sm">All updates <span className="glyph">→</span></Link>
        </div>

        <div className="grid">
          <article className="post" data-reveal data-delay="1">
            <div className="thumb"><span className="pill">Patch 0.7.3</span></div>
            <div className="body">
              <div className="meta-row"><span>05 · 12 · 26</span><span>6 min read</span></div>
              <h3>Reflex netcode rewrite.</h3>
              <p>Rollback frame buffer, 38ms median latency. Tournament players asked for one frame; we shipped one and a half.</p>
              <div className="more"><span>Read transmission</span><span className="glyph">→</span></div>
            </div>
          </article>

          <article className="post" data-reveal data-delay="2">
            <div className="thumb"><span className="pill">Dev log</span></div>
            <div className="body">
              <div className="meta-row"><span>05 · 04 · 26</span><span>22 min read</span></div>
              <h3>Building the rain shader.</h3>
              <p>How we faked wet asphalt without bankrupting the GPU. Five iterations, two missteps, one breakthrough.</p>
              <div className="more"><span>Read transmission</span><span className="glyph">→</span></div>
            </div>
          </article>

          <article className="post" data-reveal data-delay="3">
            <div className="thumb"><span className="pill event">Event · live</span></div>
            <div className="body">
              <div className="meta-row"><span>05 · 17 · 26</span><span>register open</span></div>
              <h3>Midnight bracket #14.</h3>
              <p>72-hour single elim across 12 regions. Prizes include in-game decals and one (1) real motorcycle.</p>
              <div className="more"><span>Read transmission</span><span className="glyph">→</span></div>
            </div>
          </article>
        </div>

        <div className="readmore-row">
          <Link href="/news" className="btn">View all 184 transmissions <span className="glyph">↓</span></Link>
        </div>
      </section>

      <BigCTA
        eyebrow="// it's free · browser build · no install"
        title={<>Jack in.<br /><span className="accent">Burn rubber</span>.</>}
        cta="Play Vaportrails now"
        note="also on steam · ps · xbox"
      />

      <Footer />
    </div>
    </>
  )
}
