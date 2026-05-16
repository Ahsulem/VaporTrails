'use client'
import { useState } from 'react'

const LB_TABS = ['Weekly', 'All-time', 'Region', 'Friends']

const LB_DATA: Record<string, { trail: { rank: string; top: boolean; name: string; handle: string; score: string; delta: string; deltaDir: string }[]; rep: { rank: string; top: boolean; name: string; handle: string; score: string; label: string }[] }> = {
  Weekly: {
    trail: [
      { rank: '01', top: true, name: 'HexRunner', handle: '@hex.tx · jp', score: '3:42.118', delta: '−0.402', deltaDir: 'dn' },
      { rank: '02', top: true, name: 'Static.M', handle: '@static_m · us-w', score: '3:44.802', delta: '−0.118', deltaDir: 'dn' },
      { rank: '03', top: true, name: 'Halo.K', handle: '@halo.k · de', score: '3:46.211', delta: '+0.094', deltaDir: 'up' },
      { rank: '04', top: false, name: 'Cinder', handle: '@cinder_fm · br', score: '3:48.004', delta: '—', deltaDir: '' },
      { rank: '05', top: false, name: 'Nova-12', handle: '@nv12 · au', score: '3:49.502', delta: '+0.221', deltaDir: 'up' },
      { rank: '218', top: false, name: 'You', handle: '@your.handle · us-e', score: '4:14.018', delta: '↓ −12 spots', deltaDir: 'dn', },
    ],
    rep: [
      { rank: '01', top: true, name: 'TrailWalker.0', handle: 'anonymous · ?', score: '98,402 rep', label: 'FOUNDER' },
      { rank: '02', top: true, name: 'Mira H.', handle: '@mhale · jp', score: '82,118 rep', label: 'PARTNER' },
      { rank: '03', top: true, name: 'Dust', handle: '@dust · is', score: '74,809 rep', label: 'STUDIO' },
      { rank: '04', top: false, name: 'Kira V.', handle: '@k.voss · de', score: '68,201 rep', label: 'STUDIO' },
      { rank: '05', top: false, name: 'Beat.R', handle: '@beat.r · br', score: '52,118 rep', label: '—' },
      { rank: '412', top: false, name: 'You', handle: '@your.handle · us-e', score: '2,408 rep', label: '↑ +14 / week' },
    ],
  },
  'All-time': {
    trail: [
      { rank: '01', top: true, name: 'HexRunner', handle: '@hex.tx · jp', score: '3:38.002', delta: 'PB', deltaDir: 'up' },
      { rank: '02', top: true, name: 'Ghost404', handle: '@ghost · us-e', score: '3:39.441', delta: '—', deltaDir: '' },
      { rank: '03', top: true, name: 'Static.M', handle: '@static_m · us-w', score: '3:40.118', delta: '—', deltaDir: '' },
      { rank: '04', top: false, name: 'Nova-12', handle: '@nv12 · au', score: '3:41.780', delta: '—', deltaDir: '' },
      { rank: '05', top: false, name: 'Halo.K', handle: '@halo.k · de', score: '3:42.009', delta: '—', deltaDir: '' },
      { rank: '847', top: false, name: 'You', handle: '@your.handle · us-e', score: '4:01.227', delta: 'PB', deltaDir: 'up' },
    ],
    rep: [
      { rank: '01', top: true, name: 'TrailWalker.0', handle: 'anonymous · ?', score: '98,402 rep', label: 'FOUNDER' },
      { rank: '02', top: true, name: 'Mira H.', handle: '@mhale · jp', score: '82,118 rep', label: 'PARTNER' },
      { rank: '03', top: true, name: 'Kira V.', handle: '@k.voss · de', score: '74,201 rep', label: 'STUDIO' },
      { rank: '04', top: false, name: 'Beat.R', handle: '@beat.r · br', score: '68,118 rep', label: '—' },
      { rank: '05', top: false, name: 'Dust', handle: '@dust · is', score: '62,009 rep', label: 'STUDIO' },
      { rank: '412', top: false, name: 'You', handle: '@your.handle · us-e', score: '2,408 rep', label: '—' },
    ],
  },
  Region: {
    trail: [
      { rank: '01', top: true, name: 'Static.M', handle: '@static_m · us-w', score: '3:44.802', delta: 'REGION BEST', deltaDir: 'up' },
      { rank: '02', top: true, name: 'Nova-12', handle: '@nv12 · us-e', score: '3:46.001', delta: '—', deltaDir: '' },
      { rank: '03', top: true, name: 'Glow.X', handle: '@glowx · us-e', score: '3:48.229', delta: '—', deltaDir: '' },
      { rank: '04', top: false, name: 'Kay.R', handle: '@kayr · us-w', score: '3:52.114', delta: '—', deltaDir: '' },
      { rank: '05', top: false, name: 'Spark', handle: '@spark · us-e', score: '3:54.008', delta: '—', deltaDir: '' },
      { rank: '84', top: false, name: 'You', handle: '@your.handle · us-e', score: '4:14.018', delta: '↓ −3 spots', deltaDir: 'dn' },
    ],
    rep: [
      { rank: '01', top: true, name: 'Kira V.', handle: '@k.voss · de', score: '68,201 rep', label: 'STUDIO' },
      { rank: '02', top: true, name: 'Halo.K', handle: '@halo.k · de', score: '44,028 rep', label: 'PARTNER' },
      { rank: '03', top: true, name: 'Void.A', handle: '@voida · de', score: '38,114 rep', label: '—' },
      { rank: '04', top: false, name: 'Nacht', handle: '@nacht · at', score: '32,201 rep', label: '—' },
      { rank: '05', top: false, name: 'Drift.9', handle: '@drift9 · de', score: '28,009 rep', label: '—' },
      { rank: '—', top: false, name: 'You', handle: '@your.handle · us-e', score: 'not in region', label: '—' },
    ],
  },
  Friends: {
    trail: [
      { rank: '01', top: true, name: 'HexRunner', handle: '@hex.tx · jp', score: '3:42.118', delta: '−0.402', deltaDir: 'dn' },
      { rank: '02', top: true, name: 'Halo.K', handle: '@halo.k · de', score: '3:46.211', delta: '+0.094', deltaDir: 'up' },
      { rank: '03', top: false, name: 'Cinder', handle: '@cinder_fm · br', score: '3:48.004', delta: '—', deltaDir: '' },
      { rank: '04', top: false, name: 'You', handle: '@your.handle · us-e', score: '4:14.018', delta: '↓ −1 spot', deltaDir: 'dn' },
    ],
    rep: [
      { rank: '01', top: true, name: 'HexRunner', handle: '@hex.tx · jp', score: '12,408 rep', label: 'PARTNER' },
      { rank: '02', top: true, name: 'Halo.K', handle: '@halo.k · de', score: '8,201 rep', label: '—' },
      { rank: '03', top: false, name: 'Cinder', handle: '@cinder_fm · br', score: '4,118 rep', label: '—' },
      { rank: '04', top: false, name: 'You', handle: '@your.handle · us-e', score: '2,408 rep', label: '↑ +14 / week' },
    ],
  },
}

export default function CommunityClient() {
  const [tab, setTab] = useState('Weekly')
  const data = LB_DATA[tab]

  return (
    <section className="leaderboards">
      <div className="section-head">
        <div className="left">
          <span className="eyebrow">// 05 · standings</span>
          <h2>Top of <span className="accent">the trail</span>.</h2>
        </div>
        <div className="chips">
          {LB_TABS.map(t => (
            <button key={t} className={`chip${tab === t ? ' on' : ''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="lb-layout">
        <article className="lb">
          <div className="h"><h3>Trail time — {tab === 'Region' ? 'EU' : 'global'}</h3><small>{tab === 'Weekly' ? 'top 6 · week 19' : tab === 'All-time' ? 'all-time records' : tab === 'Region' ? 'region: EU/DACH' : 'friends only'}</small></div>
          {data.trail.map((r, i) => (
            <div key={i} className={`row${r.name === 'You' ? ' you' : ''}`}>
              <div className={`rank${r.top ? ' top' : ''}`}>{r.rank}</div>
              <div className="av" />
              <div className="who">{r.name}<small>{r.handle}</small></div>
              <div className="score">{r.score}<small className={r.deltaDir}>{r.delta}</small></div>
            </div>
          ))}
        </article>

        <article className="lb">
          <div className="h"><h3>Trail reputation</h3><small>{tab === 'Weekly' ? 'top 6 · all-time' : tab === 'All-time' ? 'all-time' : tab === 'Region' ? 'region: EU/DACH' : 'friends only'}</small></div>
          {data.rep.map((r, i) => (
            <div key={i} className={`row${r.name === 'You' ? ' you' : ''}`}>
              <div className={`rank${r.top ? ' top' : ''}`}>{r.rank}</div>
              <div className="av" />
              <div className="who">{r.name}<small>{r.handle}</small></div>
              <div className="score">{r.score}<small>{r.label}</small></div>
            </div>
          ))}
        </article>
      </div>
    </section>
  )
}
