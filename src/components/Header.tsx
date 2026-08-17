import { useEffect, useState } from "react"

export function Header({ pathname }: { pathname: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // ------ Handlers ------
  useEffect(() => {
    setMenuOpen(false)

    let ticking = false
    let frameId = 0
    let maxScroll = 1

    const progressBar = document.querySelector<HTMLElement>(".progress-bar")

    const updateMetrics = () => {
      maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
    }

    const onScroll = () => {
      if (ticking) return

      ticking = true
      frameId = window.requestAnimationFrame(() => {
        const y = window.scrollY

        // Update the progress bar directly instead of causing a React
        // render on every scroll frame.
        progressBar?.style.setProperty(
          "transform",
          `scaleX(${Math.min(1, Math.max(0, y / maxScroll))})`
        )

        // React only re-renders when the header crosses the threshold.
        const nextScrolled = y > 12
        setScrolled((current) =>
          current === nextScrolled ? current : nextScrolled
        )

        ticking = false
      })
    }

    updateMetrics()
    onScroll()

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", updateMetrics, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", updateMetrics)

      if (ticking) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [pathname])

  return (
    <>
      <div className="progress-bar" />
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
