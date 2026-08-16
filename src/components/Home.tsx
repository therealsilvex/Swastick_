import { useEffect, useState } from "react"
import { roles, projects, interests } from "../data/content"

export function Home() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [typed, setTyped] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTyping, setIsTyping] = useState(true) 

  const longestRole = roles.reduce((a, b) => a.length > b.length ? a : b, "")

  useEffect(() => {
    const currentRole = roles[roleIdx]
    
    const typeSpeed = 70 + Math.random() * 30 
    const deleteSpeed = 30
    const pauseOnFullWord = 2500
    const pauseOnEmpty = 500

    if (!isDeleting && typed === currentRole) {
      setIsTyping(false)
      const timer = setTimeout(() => {
        setIsDeleting(true)
        setIsTyping(true)
      }, pauseOnFullWord)
      return () => clearTimeout(timer)
    }

    if (isDeleting && typed === "") {
      setIsTyping(false)
      const timer = setTimeout(() => {
        setIsDeleting(false)
        setIsTyping(true)
        setRoleIdx((prev) => (prev + 1) % roles.length)
      }, pauseOnEmpty)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setTyped(
        isDeleting
          ? currentRole.slice(0, typed.length - 1)
          : currentRole.slice(0, typed.length + 1)
      )
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timer)
  }, [typed, isDeleting, roleIdx])

  return (
    <div className="home-page">
      <section className="hero section-pad">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><i />Actively building & learning</p>
          <h1>
            Hi, I&apos;m Swastick.<br />
            
            <span style={{ display: "inline-grid", gridTemplateColumns: "1fr", alignItems: "start", textAlign: "left" }}>
              <span style={{ gridArea: "1 / 1", visibility: "hidden", opacity: 0, pointerEvents: "none", userSelect: "none" }}>
                <em className="typed">{longestRole}</em>
                <span className="cursor">|</span>
              </span>
              <span style={{ gridArea: "1 / 1" }}>
                <em className="typed">{typed}</em>
                <span className={`cursor ${!isTyping ? "blinking" : ""}`}>|</span>
              </span>
            </span>
          </h1>
          <p className="intro">I write clean, efficient code and learn how complex systems work under the hood — from data manipulation and automation scripts to Python web backends.</p>
          <div className="hero-actions" style={{ marginTop: "32px", display: "flex", gap: "24px", alignItems: "center" }}>
            <a className="primary-button" href="/projects" style={{ display: "inline-block" }}>See my work <b>↓</b></a>
            <a className="text-button" href="/about">About Me <b>↗</b></a>
          </div>
        </div>
        
        <aside className="code-window float" aria-label="Developer profile">
          <div className="code-top"><span className="dots"><i /><i /><i /></span><span>swastick.py</span><span className="live-pill">● live</span></div>
          <div className="code-content">
            <p className="comment"># the short version</p>
            <p><b className="purple">class</b> <b className="blue">Developer</b>:</p>
            <p className="indent"><b className="purple">def</b> <span className="blue">focus</span>(self):</p>
            <p className="indent2"><b className="purple">return</b> <span className="yellow">&quot;Python + problem<br />solving&quot;</span></p>
            <p className="indent"><b className="purple">def</b> <span className="blue">mindset</span>(self):</p>
            <p className="indent2"><b className="purple">return</b> <span className="pink">&quot;always<br />learning&quot;</span><span className="cursor blinking">_</span></p>
          </div>
          <div className="code-footer">›_ &nbsp; Python · Linux · Developer tooling</div>
        </aside>
      </section>

      <section className="ticker" aria-label="Interests">
        <div className="ticker-track">
          {[0, 1].map(copy => (
            <div className="ticker-group" key={copy} aria-hidden={copy === 1}>
              {interests.map(item => <span key={item}>{item}</span>)}
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad work-section">
        <div className="section-heading">
          <div><p className="eyebrow">Featured projects</p><h2>Small tools. <em>Real thinking.</em></h2></div>
          <p>Each project is a chance to turn an idea into working code, then improve the details that make it dependable.</p>
        </div>
        <div className="project-grid">
          {projects.slice(0, 3).map(([number, type, title, text, tags]) => (
            <article className="project-card" key={number}>
              <div className="card-top"><span>{number}</span><a href={`/projects/${number}`}>↗</a></div>
              <p className="project-type">{type}</p>
              <h3><a href={`/projects/${number}`}>{title}</a></h3>
              <p className="project-text">{text}</p>
              <div className="tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <a className="talk-link" href="/projects" style={{ display: "inline-block" }}>View Full Portfolio <b>↗</b></a>
        </div>
      </section>

      <section className="contact section-pad" id="contact" style={{ borderTop: "1px solid #1d2c3b" }}>
        <p className="eyebrow">Start a conversation</p>
        <h2>Have a problem<br />worth solving? <em>Let&apos;s talk.</em></h2>
        <a className="email" href="mailto:swastickghosh2010@gmail.com">swastickghosh2010@gmail.com <b>↗</b></a>
      </section>
    </div>
  )
}

