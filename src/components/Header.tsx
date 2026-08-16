import { useEffect, useState } from "react"

export function Header() {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState("/")

  useEffect(() => {
    // Read the current URL to highlight the active nav link
    setCurrentPath(window.location.pathname)
    
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      setProgress(max > 0 ? scrollY / max : 0)
      setScrolled(scrollY > 12)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} />
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          
          <a className="brand" href="/">
            <span className="brand-prompt">❯</span>
            Swastick
            <span className="brand-cursor">_</span>
          </a>

          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav aria-label="Primary navigation" className={menuOpen ? "open" : ""}>
            <a href="/" className={currentPath === "/" ? "active" : ""}>Home</a>
            <a href="/projects" className={currentPath.startsWith("/projects") ? "active" : ""}>Projects</a>
            <a href="/about" className={currentPath === "/about" ? "active" : ""}>About</a>
            <a className="mobile-only" href="mailto:swastickghosh2010@gmail.com">Let&apos;s talk ↗</a>
          </nav>
          
          <a className="talk-link desktop-only" href="mailto:swastickghosh2010@gmail.com">Let&apos;s talk <b>↗</b></a>
        </div>
      </header>
    </>
  )
}

