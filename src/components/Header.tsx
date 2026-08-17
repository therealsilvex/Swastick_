import { useEffect, useState } from "react"

export function Header({ pathname }: { pathname: string }) {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // ------ Handlers ------
  useEffect(() => {
    setMenuOpen(false)
    
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const max = document.documentElement.scrollHeight - window.innerHeight
          setProgress(max > 0 ? window.scrollY / max : 0)
          setScrolled(window.scrollY > 12)
          ticking = false;
        });
        ticking = true;
      }
    }
    
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  return (
    <>
      <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} />
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          
          {/* ------ Branding ------ */}
          <a className="brand" href="/" data-astro-prefetch>
            <span className="brand-prompt">❯</span>
            Swastick
            <span className="brand-cursor">_</span>
          </a>

          {/* ------ Mobile Controls ------ */}
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* ------ Navigation ------ */}
          <nav aria-label="Primary navigation" className={menuOpen ? "open" : ""}>
            <a href="/" data-astro-prefetch className={pathname === "/" ? "active" : ""}>Home</a>
            <a href="/projects" data-astro-prefetch className={pathname.startsWith("/projects") ? "active" : ""}>Projects</a>
            <a href="/about" data-astro-prefetch className={pathname === "/about" ? "active" : ""}>About</a>
            <a className="mobile-only" href="mailto:swastickghosh2010@gmail.com">Let&apos;s talk ↗</a>
          </nav>
          
          <a className="talk-link desktop-only magnetic" href="mailto:swastickghosh2010@gmail.com">Let&apos;s talk <b>↗</b></a>
        </div>
      </header>
    </>
  )
}
