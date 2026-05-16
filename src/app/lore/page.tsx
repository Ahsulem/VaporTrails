import Link from 'next/link'
import Footer from '@/components/Footer'
import BigCTA from '@/components/BigCTA'
import ScrollTimeline from './ScrollTimeline'
import './lore.css'

export const metadata = { title: 'Vaportrails — Lore · The World of 2099' }

export default function Lore() {
  return (
    <div className="page" style={{ paddingTop: 0 }}>

      {/* HERO */}
      <section className="lorehero">
        <div className="moon" />
        <div className="silhouette" />
        <div className="vignette" />
        <div className="scanlines" />
        <div className="topbar">
          <span>// dossier · 04-A · neon east</span>
          <span>frequency open · <b>0.7.3</b> ● <b>RECORDED</b></span>
        </div>
        <div className="stack">
          <span className="eyebrow">// the world of vaportrails</span>
          <h1>It started<br />with a <span className="accent">glitch</span>.</h1>
          <p className="lede">Earth, 2099. The grid is older than anyone remembers and still hungry. The streets are wet, the sky is a screen, and a small underground of riders carries data between districts the algorithm forgot. This is where Vaportrails takes place.</p>
        </div>
      </section>

      {/* SNAPSHOT */}
      <section className="snapshot">
        <div><small>// setting</small><b>2099</b><span>13 years after the Outage</span></div>
        <div><small>// region</small><b>Neon East</b><span>Pacific archipelago · district 04</span></div>
        <div><small>// population</small><b>42 M</b><span>recorded · the rest run dark</span></div>
        <div><small>// grid status</small><b style={{ color: 'var(--crimson)' }}>Unstable</b><span>nightly brownouts since 2096</span></div>
      </section>

      {/* MISSIONS */}
      <section className="missions">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 02 · what we&apos;re making</span>
            <h2>Studio <span className="accent">mission</span>.</h2>
          </div>
          <div style={{ fontSize: 14, color: 'var(--t-3)', maxWidth: '42ch', textAlign: 'right', lineHeight: 1.5 }}>Four rules we keep above the door at the studio. Every meeting checks against them.</div>
        </div>
        <div className="grid">
          <article className="mission" data-num="01">
            <span className="tag">// pillar · feel</span>
            <h3>Style is a <span className="accent">vital sign</span>.</h3>
            <p>Movement carries personality. If a player can&apos;t tell from twelve frames of footage that someone is good, we failed. Every system bends toward expression first, optimization second.</p>
            <div className="quote">&ldquo;if it looks cool, it works.&rdquo;<small>— studio rule #1</small></div>
          </article>
          <article className="mission" data-num="02">
            <span className="tag">// pillar · world</span>
            <h3>The grid is a <span className="accent">character</span>.</h3>
            <p>The city is the third player in every match. Weather changes routes. Brownouts close highways. The neon district remembers what happened there last week. The world should never feel like wallpaper.</p>
            <div className="quote">&ldquo;the map has a mood.&rdquo;<small>— studio rule #2</small></div>
          </article>
          <article className="mission" data-num="03">
            <span className="tag">// pillar · signature</span>
            <h3>Trails are <span className="accent">signatures</span>.</h3>
            <p>Every action leaves something visible. Decals, vapor, scorch marks, scratched paint — they all persist. Other players see your record before they meet you. The game writes you down.</p>
            <div className="quote">&ldquo;never erase the player.&rdquo;<small>— studio rule #3</small></div>
          </article>
          <article className="mission" data-num="04">
            <span className="tag">// pillar · community</span>
            <h3>Underground over <span className="accent">algorithm</span>.</h3>
            <p>Discovery happens through people, not feeds. We hide leaderboards behind reputation, route discovery through guides, and surface community content over engagement metrics. Slow burn over hype loop.</p>
            <div className="quote">&ldquo;build worth haunting.&rdquo;<small>— studio rule #4</small></div>
          </article>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timelinewrap" id="timeline">
        <div className="inner">
          <div className="head">
            <span className="eyebrow">// section 03 · how we got here</span>
            <h2>Thirteen years<br />of <span className="accent">trouble</span>.</h2>
            <p className="lede">Scroll through. Each milestone surfaces as it enters the frame and fades when it passes. The grid only shows you what you&apos;re looking at.</p>
          </div>
          <ScrollTimeline />
        </div>
      </section>

      {/* FACTIONS */}
      <section className="factions">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 04 · who&apos;s in the field</span>
            <h2>Four factions, one <span className="accent">frequency</span>.</h2>
          </div>
          <Link href="#" className="btn cyan sm">Full dossier <span className="glyph">→</span></Link>
        </div>
        <div className="grid">
          <article className="faction">
            <div className="crest">G·C</div>
            <div className="body">
              <div className="meta"><span>founded <b>2090</b></span><span>members <b>~4k</b></span><span>tag <b>chaos</b></span></div>
              <h3>The Glitch Cult.</h3>
              <p>Anarchist artists who tag the grid with running code. They consider the city a canvas and the bureau their patron. Friendly to riders who don&apos;t snitch.</p>
              <div className="stance">stance · <span className="ally">chaotic ally</span></div>
            </div>
          </article>
          <article className="faction hostile">
            <div className="crest">N·B</div>
            <div className="body">
              <div className="meta"><span>founded <b>2068</b></span><span>members <b>classified</b></span><span>tag <b>corp</b></span></div>
              <h3>Neon Bureau.</h3>
              <p>The last remaining corporate enforcement arm. Wear a lot of gold. Patrol the gridlight corridors. Bribe before fight, but they always remember a face.</p>
              <div className="stance">stance · <span className="hostile-txt">hostile</span></div>
            </div>
          </article>
          <article className="faction">
            <div className="crest">T·W</div>
            <div className="body">
              <div className="meta"><span>founded <b>2092</b></span><span>members <b>unknown</b></span><span>tag <b>courier</b></span></div>
              <h3>Trail Walkers.</h3>
              <p>Anonymous courier network. No leaders, no logo, only protocols. If you know the right whistle at the right wall, a Walker will move anything for you. Once.</p>
              <div className="stance">stance · <span className="neutral">neutral</span></div>
            </div>
          </article>
          <article className="faction">
            <div className="crest">S·F</div>
            <div className="body">
              <div className="meta"><span>founded <b>2094</b></span><span>members <b>~900</b></span><span>tag <b>music</b></span></div>
              <h3>Sub-Frequency.</h3>
              <p>Pirate radio collective. Run the underground music scene. Throw illegal raves in drained pools. They&apos;ll boost your trail&apos;s signal if you boost theirs.</p>
              <div className="stance">stance · <span className="ally">friendly</span></div>
            </div>
          </article>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="places">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 05 · where it happens</span>
            <h2>Four districts to <span className="accent">outrun</span>.</h2>
          </div>
          <Link href="#" className="btn sm">Open the map <span className="glyph">⛶</span></Link>
        </div>
        <div className="grid">
          <article className="place">
            <div className="ph" style={{ height: 240 }}><div className="corners"><i /></div><div className="lbl">// 04 · NEON EAST · HUB</div></div>
            <div className="body"><div className="coord">// 35.6N 139.7E · district 04</div><h3>Neon East.</h3><p>Where you&apos;re starting. Wet streets, holographic koi, a soba shop above your garage. The grid here is loudest, the bureau thickest.</p><div className="tags"><span>HUB</span><span>TUTORIAL</span><span>BUREAU</span></div></div>
          </article>
          <article className="place">
            <div className="ph" style={{ height: 240, background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,.4), #060810)' }}><div className="corners"><i /></div><div className="lbl">// −2 · SUBSTRATE · DARK</div></div>
            <div className="body"><div className="coord">// sublvl −2 · subliminal · DARK</div><h3>The Substrate.</h3><p>The tunnels under everything. Drained subway, server farms, lost neon. The grid can&apos;t see down here. Walkers know the way; nobody else does.</p><div className="tags"><span>DARK</span><span>NO-GRID</span><span>WALKERS</span></div></div>
          </article>
          <article className="place">
            <div className="ph" style={{ height: 240, background: 'radial-gradient(ellipse 40% 100% at 50% 100%, rgba(76,201,240,.25), transparent 70%), linear-gradient(180deg, #11142a, #0a0c14)' }}><div className="corners"><i /></div><div className="lbl">// 412M · SPIRE 12 · VERTICAL</div></div>
            <div className="body"><div className="coord">// 412m elevation · vertical run</div><h3>Spire 12.</h3><p>The last functioning corp tower. 412m of glass, lights, helipads. Bureau HQ at the top. Climb it if you must; the elevators don&apos;t take riders.</p><div className="tags"><span>VERTICAL</span><span>BUREAU</span><span>HEIST</span></div></div>
          </article>
        </div>
        <div className="endgame">
          <div><div className="tag">// 04 · outer ring · endgame zone</div><h3>The Outer Ring.</h3><p>The badlands beyond the grid. Highways without lights, weather without forecast. Endgame zone — bring a chassis you don&apos;t mind losing.</p></div>
          <Link href="#" className="btn primary">Endgame brief <span className="glyph">→</span></Link>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="inner">
          <div className="mark" />
          <p className="quote">&ldquo;The trail is the <span className="accent">message</span>.<br />If you can read it, you&apos;re in.&rdquo;</p>
          <div className="by">— Hex / first courier · <b>signal recovered 2096</b></div>
        </div>
      </section>

      <BigCTA
        eyebrow="// pick a chassis · register a handle"
        title={<>Leave a<br /><span className="accent">trail</span>.</>}
        sub="/ free · browser build"
        cta="Enter the grid"
        note="no install · ~80mb"
      />

      <Footer />
    </div>
  )
}
