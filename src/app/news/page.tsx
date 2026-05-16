import Link from 'next/link'
import Footer from '@/components/Footer'
import BigCTA from '@/components/BigCTA'
import NewsClient from './NewsClient'
import './news.css'

export const metadata = { title: 'Vaportrails — Transmissions' }

export default function News() {
  return (
    <div className="page" style={{ paddingTop: 0 }}>

      {/* PAGE HEADER */}
      <header className="pagehead" data-reveal>
        <span className="eyebrow">// section 03 · the wire</span>
        <h1>Trans<span className="accent">missions</span>.</h1>
        <p className="lede">Patch notes, devlogs, world events. Everything echoing out of the underground. Tune your antenna.</p>
        <div className="stats">
          <span>posts<b>184</b></span>
          <span>subscribers<b>42,108</b></span>
          <span>last update<b>05·12·26</b></span>
          <span>rss<b style={{ color: 'var(--green)' }}>available</b></span>
        </div>
      </header>

      {/* FEATURED */}
      <article className="featured" data-reveal>
        <div className="ph"><div className="corners"><i /></div><div className="lbl">// FEATURED · 16:10 · NETCODE</div></div>
        <div className="body">
          <div className="tags"><span className="tag cta">Featured</span><span className="tag">Patch 0.7.3</span><span className="tag hot">Hot</span></div>
          <div className="date">May 12, 2026 · 6 min read</div>
          <h2>Reflex netcode <span className="accent">rewrite</span> — 38ms median, no input clipping.</h2>
          <p className="desc">We rebuilt the netcode from scratch on a rollback-style frame buffer. Tournament players asked for one frame; we gave them one and a half. Full breakdown inside, with graphs.</p>
          <div className="byline">
            <div className="av" />
            <div className="who">Kira Voss<small>Lead Engineer · @k.voss</small></div>
            <Link href="#" className="btn cyan sm" style={{ marginLeft: 'auto' }}>Read post <span className="glyph">→</span></Link>
          </div>
        </div>
      </article>

      {/* INTERACTIVE: Filter + Post Grid + Load More */}
      <NewsClient />

      {/* PATCH NOTES */}
      <section className="patches">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 03 · version history</span>
            <h2>Patch notes <span className="accent">archive</span>.</h2>
          </div>
          <Link href="#" className="btn sm">View all 47 versions <span className="glyph">→</span></Link>
        </div>

        {[
          { date: '05.12.26', ver: '0.7.3', badge: 'hot', badgeTxt: 'Hot', title: 'Reflex netcode rewrite', items: [{ t: '+', txt: 'Rollback-style frame buffer — 38ms median latency' }, { t: '+', txt: 'Input ring-buffer increased to 12 frames' }, { t: '~', txt: 'Fixed: ghosting on rivals during high-ping bursts' }, { t: '~', txt: 'Fixed: vapor trails clipping at 144hz' }, { t: '-', txt: 'Removed: legacy lockstep mode (RIP)' }], dl: '1.2M', size: '820 MB', req: true, delay: '1' },
          { date: '04.08.26', ver: '0.7.2', badge: '', badgeTxt: 'Hotfix', title: 'Trail vapor + decal fixes', items: [{ t: '~', txt: 'Fixed: vapor invisible at 144hz' }, { t: '~', txt: 'Fixed: decals stretching on curved chassis' }, { t: '~', txt: 'Fixed: garage paint preview wrong on metallic' }], dl: '840K', size: '180 MB', req: true, delay: '2' },
          { date: '03.14.26', ver: '0.7.0', badge: 'major', badgeTxt: 'Major', title: 'The garage update', items: [{ t: '+', txt: '14 new chassis kits — Strider, Halo, Cinder, etc.' }, { t: '+', txt: 'Custom paint with metallic + matte layer system' }, { t: '+', txt: 'Sticker layer rework — 8 layers, full transform' }, { t: '+', txt: 'New garage hub: Neon East workshop' }, { t: '~', txt: 'Fixed: 142 reported bugs (full list inside)' }], dl: '2.4M', size: '3.1 GB', req: true, delay: '3' },
        ].map(p => (
          <article key={p.ver} className="patch" data-reveal data-delay={p.delay}>
            <div className="ver"><small>{p.date}</small><b>{p.ver}</b><span className={`badge ${p.badge}`}>{p.badgeTxt}</span></div>
            <div className="changes">
              <h4>{p.title}</h4>
              <ul>
                {p.items.map((item, i) => (
                  <li key={i} className={item.t === '-' ? 'minus' : item.t === '~' ? 'fix' : ''}>{item.txt}</li>
                ))}
              </ul>
            </div>
            <div className="stats"><span>downloads<b>{p.dl}</b></span><span>size<b>{p.size}</b></span><span>required<b style={{ color: 'var(--crimson)' }}>YES</b></span></div>
          </article>
        ))}
      </section>

      {/* DEVLOGS */}
      <section className="devlogs">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 04 · under the hood</span>
            <h2>Dev logs, <span className="accent">long form</span>.</h2>
          </div>
          <Link href="#" className="btn cyan sm">Subscribe to devlogs <span className="glyph">→</span></Link>
        </div>

          <article className="devlog" data-reveal data-delay="1">
            <div className="ph"><div className="corners"><i /></div><div className="lbl">// DEVLOG 014 · AUDIO</div></div>
            <div className="body">
              <span className="tag">// devlog 014 · audio</span>
              <h3>Scoring the <span className="accent">underground</span>.</h3>
              <p>An hour with composer Mira Hale on adaptive music, layered drum machines, and the moment a song decides to stop existing. Includes a streamable mixtape and three deleted tracks the team kept on a thumb drive.</p>
              <p>Topics: tempo locking the chase, &ldquo;scary key&rdquo; theory, why the menu music is in 7/8.</p>
              <div className="ftr"><span>read<b>14 min</b></span><span>by<b>M. Hale</b></span><span>refs<b>12</b></span></div>
            </div>
          </article>
          <article className="devlog flip" data-reveal data-delay="2">
            <div className="ph"><div className="corners"><i /></div><div className="lbl">// DEVLOG 013 · RENDERING</div></div>
            <div className="body">
              <span className="tag">// devlog 013 · rendering</span>
              <h3>Building the <span className="accent">rain shader</span>.</h3>
              <p>How we faked wet asphalt without bankrupting the GPU. A walk through five shader iterations, two missteps, and the breakthrough that came from staring at a coffee spill at 2am.</p>
              <p>Includes interactive shader graph, performance budget, and a frame-by-frame teardown.</p>
              <div className="ftr"><span>read<b>22 min</b></span><span>by<b>D. Ortega</b></span><span>refs<b>27</b></span></div>
            </div>
          </article>
          <article className="devlog" data-reveal data-delay="3">
            <div className="ph"><div className="corners"><i /></div><div className="lbl">// DEVLOG 012 · NARRATIVE</div></div>
            <div className="body">
              <span className="tag">// devlog 012 · world</span>
              <h3>How a district <span className="accent">gets its name</span>.</h3>
              <p>The narrative team&apos;s process for naming neighborhoods, gangs, and small shops. Real graffiti references, a poetry generator we threw out, and the cardinal rule of never naming anything &ldquo;Neo-&rdquo;.</p>
              <div className="ftr"><span>read<b>9 min</b></span><span>by<b>L. Park</b></span><span>refs<b>5</b></span></div>
            </div>
          </article>
      </section>

      {/* SIGNUP */}
      <section className="signup" data-reveal>
        <div className="left">
          <span className="eyebrow">// transmission service · no spam</span>
          <h2>Get on the <span className="accent">wire</span>.</h2>
          <p>Devlogs, patch notes, and the occasional lore drop — straight to your inbox. Unsub anytime.</p>
        </div>
        <form className="form" action="#">
          <input type="email" placeholder="you@signal.net" />
          <button type="submit">Subscribe →</button>
        </form>
      </section>

      <BigCTA
        eyebrow="// free · browser build · no install"
        title={<>Jack in.<br /><span className="accent">Burn rubber</span>.</>}
        cta="Play Vaportrails now"
        note="also on steam · ps · xbox"
      />

      <Footer />
    </div>
  )
}
