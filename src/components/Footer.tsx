import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site">
      <div className="brand-block">
        <span className="brand"><i />Vaportrails</span>
        <p>Neon drift. Underground network. 2099. A small studio above a soba shop in Neon East.</p>
        <div className="socials">
          {['X','YT','DC','TW','IG'].map(s => <span key={s}>{s}</span>)}
        </div>
      </div>
      <div className="col">
        <h4>Game</h4>
        <ul>
          <li><Link href="#play">Play</Link></li>
          <li><Link href="#">Features</Link></li>
          <li><Link href="#">System reqs</Link></li>
          <li><Link href="#">Roadmap</Link></li>
        </ul>
      </div>
      <div className="col">
        <h4>World</h4>
        <ul>
          <li><Link href="/lore">Lore</Link></li>
          <li><Link href="/lore">Characters</Link></li>
          <li><Link href="#">Map</Link></li>
          <li><Link href="#">Soundtrack</Link></li>
        </ul>
      </div>
      <div className="col">
        <h4>Studio</h4>
        <ul>
          <li><Link href="/lore">About</Link></li>
          <li><Link href="/news">News</Link></li>
          <li><Link href="#">Careers</Link></li>
          <li><Link href="#">Contact</Link></li>
        </ul>
      </div>
      <div className="bottom">
        <span>© 2099 VAPORTRAILS / All glitches reserved</span>
        <span>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">EULA</Link>
        </span>
      </div>
    </footer>
  )
}
