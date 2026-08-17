import { useState, useEffect } from "react"
import { roles, projects, interests } from "../data/content"

export function Home() {
  const longestRole = roles.reduce((a, b) => a.length > b.length ? a : b, "")
  const [typedText, setTypedText] = useState("")
  const [isBlinking, setIsBlinking] = useState(false)

  // ------ Typing Sequence ------
  useEffect(() => {
    let roleIdx = 0
    let currentText = ""
    let isDeleting = false
    let timeoutId: ReturnType<typeof setTimeout>

    const typeLoop = () => {
      const currentRole = roles[roleIdx]
      if (!currentRole) return

      const typeSpeed = 70 + Math.random() * 30
      const deleteSpeed = 30

      if (!isDeleting && currentText === currentRole) {
        setIsBlinking(true)
        timeoutId = setTimeout(() => {
          isDeleting = true
          setIsBlinking(false)
          typeLoop()
        }, 2500)
        return
      }

      if (isDeleting && currentText === "") {
        setIsBlinking(true)
        timeoutId = setTimeout(() => {
          isDeleting = false
          roleIdx = (roleIdx + 1) % roles.length
          setIsBlinking(false)
          typeLoop()
        }, 500)
        return
      }

      currentText = isDeleting
        ? currentRole.slice(0, currentText.length - 1)
        : currentRole.slice(0, currentText.length + 1)

      setTypedText(currentText)
      timeoutId = setTimeout(typeLoop, isDeleting ? deleteSpeed : typeSpeed)
    }

    timeoutId = setTimeout(typeLoop, 500)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="home-page">
      
      {/* ------ Hero Section ------ */}
      <section className="hero section-pad">
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-copy scroll-reveal">
          <div className="status-pill">
            <span className="status-dot"></span> Available for new opportunities
          </div>

          <h1>
            Hi, I&apos;m Swastick.<br />
            <span style={{ display: "inline-grid", gridTemplateColumns: "1fr", alignItems: "start", textAlign: "left" }}>
              <span style={{ gridArea: "1 / 1", visibility: "hidden", opacity: 0, pointerEvents: "none", userSelect: "none" }}>
                <em className="typed">{longestRole}</em>
                <span className="cursor">|</span>
              </span>

              <span style={{ gridArea: "1 / 1" }}>
                <em className="typed shimmer-text">{typedText}</em>
                <span className={`cursor ${isBlinking ? "blinking" : ""}`}>|</span>
              </span>
            </span>
          </h1>

          <p className="intro">
            I write clean, efficient code and learn how complex systems work
            under the hood — from data manipulation and automation scripts to
            Python web backends.
          </p>

          <div className="hero-actions" style={{ marginTop: "32px", display: "flex", gap: "24px", alignItems: "center" }}>
            <a className="primary-button magnetic" data-astro-prefetch href="/projects" style={{ display: "inline-block" }}>
              See my work <b>↓</b>
            </a>
            <a className="text-button magnetic" data-astro-prefetch href="/about">
              About Me <b>↗</b>
            </a>
          </div>
        </div>

        <div className="scroll-reveal delay-1" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "362px", marginTop: "39px" }}>
          <aside className="code-window float" aria-label="Developer profile" style={{ marginTop: 0 }}>
            <div className="code-top">
              <span className="dots"><i /><i /><i /></span>
              <span>swastick.py</span>
              <span className="live-pill">● live</span>
            </div>

            <div className="code-content">
              <p className="comment"># the short version</p>
              <p><b className="purple">class</b> <b className="blue">Developer</b>:</p>
              <p className="indent"><b className="purple">def</b> <span className="blue">focus</span>(self):</p>
              <p className="indent2"><b className="purple">return</b> <span className="yellow">&quot;Python + problem<br />solving&quot;</span></p>
              <p className="indent"><b className="purple">def</b> <span className="blue">mindset</span>(self):</p>
              <p className="indent2"><b className="purple">return</b> <span className="pink">&quot;always<br />learning&quot;</span><span className="cursor blinking">_</span></p>
            </div>

            <div className="code-footer">
              ›_ &nbsp; Python · Linux · Developer tooling
            </div>
          </aside>
        </div>
      </section>

      {/* ------ Interests Ticker ------ */}
      <section className="ticker scroll-reveal delay-1" aria-label="Interests">
        <div className="ticker-track">
          {[0, 1].map(copy => (
            <div className="ticker-group" key={copy} aria-hidden={copy === 1}>
              {interests.map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ------ Featured Projects ------ */}
      <section className="section-pad work-section scroll-reveal delay-1">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured projects</p>
            <h2>Small tools. <em>Real thinking.</em></h2>
          </div>
          <p>Each project is a chance to turn an idea into working code, then improve the details that make it dependable.</p>
        </div>

        <div className="project-grid">
          {projects.slice(0, 3).map(([number, type, title, text, tags]) => (
            <article className="project-card" key={number as string}>
              <div className="card-top">
                <span>{number as string}</span>
                <a data-astro-prefetch href={`/projects/${number}`}>↗</a>
              </div>
              <p className="project-type">{type as string}</p>
              <h3><a data-astro-prefetch href={`/projects/${number}`}>{title as string}</a></h3>
              <p className="project-text">{text as string}</p>
              <div className="tags">
                {(tags as string[]).map((tag: string) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <a className="talk-link magnetic" data-astro-prefetch href="/projects" style={{ display: "inline-block" }}>
            View Full Portfolio <b>↗</b>
          </a>
        </div>
      </section>

      {/* ------ Contact Section ------ */}
      <section className="contact section-pad scroll-reveal delay-1" id="contact" style={{ borderTop: "1px solid #1d2c3b" }}>
        <p className="eyebrow">Start a conversation</p>
        <h2>Have a problem<br />worth solving? <em>Let&apos;s talk.</em></h2>
        <a className="email email-copy magnetic" href="mailto:swastickghosh2010@gmail.com" style={{ display: "inline-block" }}>
          swastickghosh2010@gmail.com <b>↗</b>
        </a>
      </section>
    </div>
  )
}
