import Link from 'next/link'
import Footer from '@/components/Footer'
import BigCTA from '@/components/BigCTA'
import CommunityClient from './CommunityClient'
import './community.css'

export const metadata = { title: 'Vaportrails — Community · The Network' }

export default function Community() {
  return (
    <div className="page" style={{ paddingTop: 0 }}>

      {/* HEADER */}
      <header className="pagehead" data-reveal>
        <span className="eyebrow">// section 05 · the network</span>
        <h1>Join the <span className="accent">network</span>.</h1>
        <p className="lede">Forty-two thousand riders. Twelve time zones. A frequency you can tune into wherever you are. Everything community lives here.</p>
        <div className="stats">
          <span>members<b>42,108</b></span>
          <span>online<b>4,221</b></span>
          <span>creators<b>318</b></span>
          <span>monthly tourneys<b>14</b></span>
        </div>
      </header>

      {/* LIVE TICKER */}
      <div className="ticker" data-reveal>
        <div className="label"><span className="dot" />Live now</div>
        <div className="scroll">
          <div className="line">
            {['47 streams broadcasting', 'Spire 12 climb · 4 racers entering final approach', 'Midnight bracket · quarter-finals in 38 min', 'Glitch Cult tag wave · Outer Ring', 'Sub-frequency · pirate radio · 18.2k tuned in',
              '47 streams broadcasting', 'Spire 12 climb · 4 racers entering final approach', 'Midnight bracket · quarter-finals in 38 min', 'Glitch Cult tag wave · Outer Ring', 'Sub-frequency · pirate radio · 18.2k tuned in'].map((t, i) => (
              <span key={i}><b>◉</b> {t}</span>
            ))}
          </div>
        </div>
        <div className="count">Online<b>4,221</b></div>
      </div>

      {/* STAT ROW */}
      <section className="statrow" data-reveal>
        <div><small>// members</small><b>42.1k</b><span>since open beta</span><span className="delta">▲ +1,802 / week</span></div>
        <div><small>// discord</small><b>28.4k</b><span>peak today: 4.7k</span><span className="delta">▲ +112 / day</span></div>
        <div><small>// creators</small><b>318</b><span>verified · partner program</span><span className="delta">▲ +6 this month</span></div>
        <div><small>// mod team</small><b>24</b><span>volunteers · 6 regions</span><span className="delta">covering 24/7</span></div>
      </section>

      {/* PLATFORMS */}
      <section className="platforms">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 01 · where we hang out</span>
            <h2>Three places to <span className="accent">tune in</span>.</h2>
          </div>
          <div style={{ fontSize: 14, color: 'var(--t-3)', maxWidth: '44ch', textAlign: 'right', lineHeight: 1.5 }}>Pick the channel that suits you. They all share the same backbone — your handle works everywhere.</div>
        </div>
        <div className="grid">
          {[
            { glyph: 'DC', label: 'Discord.', status: '4,221 online', desc: 'The real-time channel. Trail runners, garage chatter, bug reports, tournament VC. Voice rooms staffed by mods 24/7.', stat: '28.4k members', delay: '1' },
            { glyph: 'FM', label: 'Forum.', status: '312 reading', desc: 'Long-form. Build guides, route walkthroughs, lore theory, feedback threads. Search-friendly archive of every patch since 0.4.', stat: '12,408 threads', delay: '2' },
            { glyph: 'R/', label: 'r/Vaportrails.', status: 'always open', desc: 'The street. Clips, memes, paint shares, "look at this trail," and the occasional pile-on. Lightly modded — riders run it.', stat: '34.2k subs', delay: '3' },
          ].map(({ glyph, label, status, desc, stat, delay }) => (
            <article key={label} className="platform" data-reveal data-delay={delay}>
              <div className="top">
                <div className="glyph-box">{glyph}</div>
                <span className="live"><i />{status}</span>
              </div>
              <h3>{label}</h3>
              <p>{desc}</p>
              <div className="ftr"><b>{stat}</b><span className="arr">Join →</span></div>
            </article>
          ))}
        </div>
      </section>

      {/* CREATORS */}
      <section className="creators">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 02 · live now · featured creators</span>
            <h2>Eyes on <span className="accent">the trail</span>.</h2>
          </div>
          <Link href="#" className="btn cyan sm">See all 47 live <span className="glyph">→</span></Link>
        </div>
        <div className="grid">
          {[
            { name: 'HexRunner', who: '@hex.tx · jp', viewers: '1,204 watching', g1: 'game', v1: 'Vaportrails', g2: 'lang', v2: 'EN/JP', delay: '1' },
            { name: 'Static.M', who: '@static_m · us-w', viewers: '842 watching', g1: 'build', v1: 'Chassis tour', g2: 'lang', v2: 'EN', delay: '2' },
            { name: 'Cinder', who: '@cinder_fm · br', viewers: '412 watching', g1: 'route', v1: 'Spire 12', g2: 'lang', v2: 'PT', delay: '3' },
            { name: 'Halo.K', who: '@halo.k · de', viewers: '318 watching', g1: 'mode', v1: 'Ranked', g2: 'lang', v2: 'EN/DE', delay: '4' },
          ].map(({ name, who, viewers, g1, v1, g2, v2, delay }) => (
            <article key={name} className="creator" data-reveal data-delay={delay}>
              <div className="ph"><span className="live-badge"><i />Live</span><span className="viewers">{viewers}</span></div>
              <div className="body">
                <div className="top"><div className="av" /><div><h3>{name}</h3><div className="who">{who}</div></div></div>
                <div className="ftr"><span>{g1}<b>{v1}</b></span><span>{g2}<b>{v2}</b></span></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TOURNAMENTS */}
      <section className="tournaments" data-reveal>
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 03 · calendar</span>
            <h2>Tournaments + <span className="accent">events</span>.</h2>
          </div>
          <Link href="#" className="btn sm">Submit an event <span className="glyph">→</span></Link>
        </div>
        <div className="tour-layout">
          <article className="tour-feature">
            <div className="ph" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(183,9,76,.4), transparent 60%), linear-gradient(135deg, #14182a, #0a0c14)' }}>
              <div className="corners"><i /></div><div className="lbl">// MIDNIGHT BRACKET · 14</div>
            </div>
            <div className="body">
              <div className="when">Starts in 38 hours · May 17 — 19</div>
              <h3>Midnight Bracket <span className="accent">#14</span>.</h3>
              <p>72-hour single-elim across 12 regions. Custom decals, in-game cash, and the year&apos;s only real motorcycle prize. Open to all riders rank 4+.</p>
              <div className="specs">
                <div><small>format</small><b>Single elim</b></div>
                <div><small>map pool</small><b>4 districts</b></div>
                <div><small>slots</small><b>256/512</b></div>
                <div><small>prize</small><b>15k + 🏍</b></div>
              </div>
              <div className="ctas">
                <Link href="#" className="btn primary">Register →</Link>
                <Link href="#" className="btn">Bracket + rules <span className="glyph">→</span></Link>
              </div>
            </div>
          </article>
          <aside className="tour-list">
            <div className="h"><span>Upcoming + recent</span><span>this month</span></div>
            {[
              { date: '17 MAY', time: 'FRI · 21:00', name: 'Midnight Bracket #14', sub: 'SINGLE ELIM · 256 SLOTS', badge: 'open', bdg: 'Register' },
              { date: '22 MAY', time: 'WED · 19:00', name: 'Glitch Cult Tag Wave', sub: 'OUTER RING · CASUAL', badge: 'open', bdg: 'Register' },
              { date: '29 MAY', time: 'WED · 20:00', name: 'Substrate Speedrun Showcase', sub: 'SOLO · LEADERBOARD', badge: '', bdg: 'Soon' },
              { date: '04 JUN', time: 'TUE · 18:00', name: 'Garage Wars #6 (decals)', sub: 'VOTE-IN · COMMUNITY', badge: '', bdg: 'Soon' },
              { date: '02 MAY', time: 'FRI · ENDED', name: 'Spire 12 Climb · Open', sub: 'RECAP + BRACKET ARCHIVE', badge: 'done', bdg: 'Recap →' },
              { date: '21 APR', time: 'SUN · ENDED', name: 'Neon East Endurance 200', sub: '2-HOUR · TEAMS OF 4', badge: 'done', bdg: 'Recap →' },
            ].map(({ date, time, name, sub, badge, bdg }) => (
              <div key={name} className="tour-row">
                <div className="date">{date}<small>{time}</small></div>
                <div className="name">{name}<small>{sub}</small></div>
                <div className={`badge ${badge}`}>{bdg}</div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" data-reveal>
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 04 · fan creations · this week</span>
            <h2>From the <span className="accent">network</span>.</h2>
          </div>
          <Link href="#" className="btn cyan sm">Submit yours <span className="glyph">→</span></Link>
        </div>
        <div className="grid">
          <div className="gcell big crimson"><div className="info"><b>@hex.tx</b> · ART · 218 likes</div></div>
          <div className="gcell"><div className="info"><b>@cinder</b> · DECAL</div></div>
          <div className="gcell"><div className="info"><b>@nova</b> · CLIP</div></div>
          <div className="gcell tall amber"><div className="info"><b>@halo.k</b> · BUILD</div></div>
          <div className="gcell"><div className="info"><b>@static</b> · ART</div></div>
          <div className="gcell wide"><div className="info"><b>@m_park</b> · COMIC · 3 pages</div></div>
          <div className="gcell"><div className="info"><b>@oki</b> · DECAL</div></div>
          <div className="gcell"><div className="info"><b>@dust</b> · CLIP</div></div>
          <div className="gcell wide crimson"><div className="info"><b>@trail.w</b> · ROUTE GUIDE</div></div>
          <div className="gcell"><div className="info"><b>@cinder</b> · ART</div></div>
          <div className="gcell"><div className="info"><b>@beat.r</b> · MUSIC</div></div>
          <div className="gcell amber"><div className="info"><b>@ghost</b> · DECAL</div></div>
          <div className="gcell"><div className="info"><b>@kira</b> · CLIP</div></div>
        </div>
      </section>

      {/* LEADERBOARDS — interactive via client component */}
      <CommunityClient />

      {/* FORUM */}
      <section className="forum" data-reveal>
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">// 05 · the thread</span>
            <h2>Forums<span className="accent">.</span></h2>
          </div>
          <div className="forum-meta">
            <span><b>12,408</b> threads</span>
            <span><b>84,201</b> posts</span>
            <span><b>312</b> reading now</span>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="forum-cats">
          {[
            { glyph: '→', label: 'Trail Routes', desc: 'Optimal lines, district shortcuts, speedrun strats', threads: '4,821', color: 'cyan' },
            { glyph: '⚙', label: 'Garage Builds', desc: 'Chassis configs, paint theory, decal showcases', threads: '2,103', color: 'amber' },
            { glyph: '◈', label: 'World Lore', desc: 'Faction theory, NPC lore, hidden transmissions', threads: '1,842', color: 'crimson' },
            { glyph: '◉', label: 'Events', desc: 'Tournament threads, bracket posts, recaps', threads: '892', color: 'green' },
            { glyph: '⌘', label: 'Feedback', desc: 'Bug reports, feature requests, balance discussion', threads: '1,204', color: '' },
            { glyph: '≋', label: 'Off-Grid', desc: 'Everything else — music, art, community stuff', threads: '1,546', color: '' },
          ].map(({ glyph, label, desc, threads, color }) => (
            <article key={label} className={`forum-cat${color ? ` cat-${color}` : ''}`}>
              <div className="cat-glyph">{glyph}</div>
              <div className="cat-body">
                <h4>{label}</h4>
                <p>{desc}</p>
              </div>
              <div className="cat-count"><b>{threads}</b><small>threads</small></div>
            </article>
          ))}
        </div>

        {/* PINNED */}
        <div className="forum-pinned">
          <div className="pin-head">// pinned</div>
          {[
            { title: '[MEGATHREAD] Patch 0.7.3 Feedback & Bug Reports', cat: 'Feedback', catColor: '', replies: 284, hot: true },
            { title: '[WELCOME] Network rules + code of conduct — read before posting', cat: 'Community', catColor: 'cyan', replies: 12, hot: false },
          ].map(({ title, cat, catColor, replies, hot }) => (
            <div key={title} className="pin-row">
              <span className="pin-icon">📌</span>
              <span className="pin-title">{title}</span>
              <span className={`pin-cat${catColor ? ` cat-${catColor}` : ''}`}>{cat}</span>
              <span className="pin-replies"><b>{replies}</b> replies</span>
              {hot && <span className="pin-badge hot">Hot</span>}
            </div>
          ))}
        </div>

        {/* RECENT THREADS */}
        <div className="forum-threads">
          <div className="thread-head">
            <span>Thread</span><span>Category</span><span>Replies</span><span>Views</span><span>Last post</span>
          </div>
          {[
            { title: 'Spire 12 optimal exit — the cut everyone misses at the bridge', excerpt: 'Found a 0.4s save at the bridge strut. Full breakdown with timestamps.', cat: 'Trail Routes', catColor: 'cyan', author: 'HexRunner', replies: 42, views: '1.2k', last: '14m ago' },
            { title: 'Strider chassis vs Halo for ranked — full comparison v0.7.3', excerpt: 'Tested both for 80 hours post-patch. Numbers inside.', cat: 'Garage Builds', catColor: 'amber', author: 'Static.M', replies: 91, views: '3.4k', last: '38m ago' },
            { title: 'The Glitch Cult signal — decoded? (lore theory)', excerpt: 'Found three hidden transmissions that spell something out.', cat: 'World Lore', catColor: 'crimson', author: 'Cinder_FM', replies: 28, views: '842', last: '1h ago' },
            { title: 'Rollback netcode — is 38ms actually achievable on JP servers?', excerpt: 'Testing from Tokyo. Results not matching patch notes.', cat: 'Feedback', catColor: '', author: 'Halo.K', replies: 67, views: '2.1k', last: '2h ago' },
            { title: 'Midnight Bracket #14 — team looking for fourth rider (rank 6+)', excerpt: 'We have three locked. Need a trail specialist, not a brawler.', cat: 'Events', catColor: 'green', author: 'dust.r', replies: 18, views: '412', last: '3h ago' },
            { title: 'Custom soundtrack sync mod — does it violate ToS?', excerpt: 'Read the ToS three times, still unclear. Anyone got an official answer?', cat: 'Off-Grid', catColor: '', author: 'beat.r', replies: 34, views: '901', last: '4h ago' },
            { title: 'District 04 brownout mechanic — intentional or bug?', excerpt: 'Two routes close randomly every few minutes. Is this a feature?', cat: 'Feedback', catColor: '', author: 'm_park', replies: 55, views: '1.8k', last: '5h ago' },
            { title: 'Sharing my Neon East watercolor series — 12 pieces', excerpt: 'Took a month. All hand-painted, scanned at 600dpi.', cat: 'Off-Grid', catColor: '', author: 'trail.w', replies: 21, views: '634', last: '7h ago' },
          ].map(({ title, excerpt, cat, catColor, author, replies, views, last }) => (
            <div key={title} className="thread-row">
              <div className="thread-info">
                <div className="thread-av" />
                <div>
                  <div className="thread-title">{title}</div>
                  <div className="thread-excerpt">{excerpt}</div>
                  <div className="thread-author">by <b>{author}</b></div>
                </div>
              </div>
              <span className={`thread-cat${catColor ? ` cat-${catColor}` : ''}`}>{cat}</span>
              <span className="thread-stat">{replies}<small>replies</small></span>
              <span className="thread-stat">{views}<small>views</small></span>
              <span className="thread-last">{last}</span>
            </div>
          ))}
        </div>

        <div className="forum-footer">
          <Link href="#" className="btn cyan">Browse all 12,408 threads <span className="glyph">→</span></Link>
          <Link href="#" className="btn primary">New thread <span className="glyph">+</span></Link>
        </div>
      </section>

      {/* CREATOR CTA */}
      <section className="creator-cta">
        <div className="left">
          <span className="eyebrow">// partner program · open applications</span>
          <h2>Got a signal? Become a <span className="accent">creator</span>.</h2>
          <p>Sub-frequency partners get early builds, monthly drops, a custom decal slot, and a cut of cosmetics. Submit a 60-second reel; we read every one within two weeks.</p>
        </div>
        <div className="right">
          <Link href="#" className="btn primary lg">Apply →</Link>
          <Link href="#" className="btn cyan sm">Program details <span className="glyph">→</span></Link>
          <span className="next">next review window: <b>may 28</b></span>
        </div>
      </section>

      <BigCTA
        eyebrow="// stay loud · stay on the wire"
        title={<>Get on<br />the <span className="accent">wire</span>.</>}
        sub="/ free · browser build"
        cta="Play Vaportrails now"
        note="no install · ~80mb"
      />

      <Footer />
    </div>
  )
}
