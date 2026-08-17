import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { principles, toolkit, roadmap } from "../data/content"

export function About() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  
  const [logs, setLogs] = useState<Array<{ cmd: string; output: React.ReactNode }>>([
    { cmd: "help", output: "Available commands: whoami, skills, projects, contact, date, echo, clear" }
  ])
  
  const cliBodyRef = useRef<HTMLDivElement>(null)

  // ------ CLI Command Handler ------
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanCmd = input.trim()
    if (!cleanCmd) return

    const cmdParts = cleanCmd.split(" ")
    const baseCmd = cmdParts[0].toLowerCase()
    let response: React.ReactNode = ""

    switch (baseCmd) {
      case "whoami":
        response = "Swastick Ghosh — Python Developer & Problem Solver."
        break
      case "skills":
        response = "Python, Web Scraping, API Integration, Git, OOP, Linux, SQL Basics."
        break
      case "projects":
        response = "1. Automated Weather Scraper\n2. Interactive CLI Task Manager\n3. Custom Web Scraper\nType 'contact' to reach out!"
        break
      case "contact":
        response = (
          <span>
            Drop me an email at: <a href="mailto:swastickghosh2010@gmail.com" style={{ color: "var(--accent)", textDecoration: "underline" }}>swastickghosh2010@gmail.com</a>
          </span>
        )
        break
      case "sudo":
        response = "Haha, Nice try."
        break
      case "echo":
        response = cmdParts.slice(1).join(" ") || " "
        break
      case "date":
        response = new Date().toString()
        break
      case "help":
        response = "Available commands: whoami, skills, projects, contact, date, echo, clear"
        break
      case "clear":
        setLogs([])
        setInput("")
        setHistory((prev) => [...prev, cleanCmd])
        setHistoryIdx(-1)
        return
      default:
        response = `Command not recognized: "${baseCmd}". Type "help" for options.`
    }

    setLogs((prev) => [...prev, { cmd: cleanCmd, output: response }])
    setHistory((prev) => [...prev, cleanCmd])
    setHistoryIdx(-1)
    setInput("")
  }

  // ------ CLI History Navigation ------
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0) {
        const nextIdx = historyIdx + 1 < history.length ? historyIdx + 1 : historyIdx
        setHistoryIdx(nextIdx)
        setInput(history[history.length - 1 - nextIdx])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1
        setHistoryIdx(nextIdx)
        setInput(history[history.length - 1 - nextIdx])
      } else if (historyIdx === 0) {
        setHistoryIdx(-1)
        setInput("")
      }
    }
  }

  // ------ CLI Auto-Scroll ------
  useEffect(() => {
    requestAnimationFrame(() => {
      if (cliBodyRef.current) {
        cliBodyRef.current.scrollTo({
          top: cliBodyRef.current.scrollHeight,
          behavior: "smooth"
        })
      }
    })
  }, [logs])

  return (
    <div className="about-page section-pad fade-up" style={{ paddingTop: "60px" }}>
      
      {/* ------ Intro Section ------ */}
      <div className="section-heading" style={{ marginBottom: "48px" }}>
        <p className="eyebrow">About Me</p>
        <h1>How I <em>build.</em></h1>
        <p className="subhead" style={{ marginTop: "16px", maxWidth: "600px", color: "#a5b0c0", lineHeight: "1.7" }}>
          I spend my time breaking problems down into algorithms, learning developer tooling, and constantly building. Here is a look at my workflow and current focus.
        </p>
      </div>

      {/* ------ CLI Terminal Component ------ */}
      <div className="cli-terminal fade-up delay-1" style={{ marginBottom: "80px" }}>
        <div className="window-header" style={{ padding: "12px 16px", borderBottom: "1px solid #1e2c3a", display: "flex", gap: "8px" }}>
          <span style={{ width: "10px", height: "10px", background: "#fb726a", borderRadius: "50%" }} />
          <span style={{ width: "10px", height: "10px", background: "#f5bf63", borderRadius: "50%" }} />
          <span style={{ width: "10px", height: "10px", background: "#59718c", borderRadius: "50%" }} />
        </div>
        
        <div className="cli-body" ref={cliBodyRef}>
          {logs.map((log, index) => (
            <div key={index} className="cli-log">
              <div className="cli-prompt">
                <span className="user">swastick@dev</span>:~$ {log.cmd}
              </div>
              <div className="cli-output">{log.output}</div>
            </div>
          ))}
          
          <form onSubmit={handleCommand} className="cli-input-form" style={{ display: "flex", alignItems: "center" }}>
            <span style={{ whiteSpace: "nowrap", marginRight: "8px" }}>
              <span className="user">swastick@dev</span>:~$
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="cli-input"
              spellCheck="false"
              autoComplete="off"
              style={{ flex: 1, padding: 0, margin: 0 }}
            />
          </form>
        </div>
      </div>

      {/* ------ Principles Grid ------ */}
      <section className="principles-section fade-up delay-2" style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "28px", color: "#e8edf4", marginBottom: "32px", fontWeight: 400 }}>Principles</h2>
        <div className="principles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px" }}>
          {principles.map(([icon, title, desc]) => (
            <div className="principle-card" key={title as string}>
              <span className="principle-icon" style={{ display: "inline-block", fontSize: "24px", color: "var(--accent)", marginBottom: "16px" }}>{icon as string}</span>
              <h3 style={{ color: "#e8edf4", marginBottom: "8px", fontSize: "16px", fontWeight: 500 }}>{title as string}</h3>
              <p style={{ color: "#a5b0c0", lineHeight: "1.6", fontSize: "14px" }}>{desc as string}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------ Toolkit Grid ------ */}
      <section className="toolkit-section fade-up delay-2" style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "28px", color: "#e8edf4", marginBottom: "32px", fontWeight: 400 }}>Toolkit</h2>
        <div className="toolkit-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {toolkit.map(([num, title, items]) => (
            <div className="toolkit-card" key={num as string} style={{ padding: "24px", background: "#0d141f", border: "1px solid #1e2c3a" }}>
              <span style={{ color: "var(--accent)", fontSize: "12px", fontFamily: "monospace" }}>{num as string}</span>
              <h3 style={{ color: "#e8edf4", margin: "12px 0 8px 0", fontSize: "16px", fontWeight: 500 }}>{title as string}</h3>
              <p style={{ color: "#a5b0c0", fontSize: "14px", lineHeight: "1.6" }}>{items as string}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------ Roadmap Section ------ */}
      <section className="roadmap-section fade-up delay-3" style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "28px", color: "#e8edf4", marginBottom: "32px", fontWeight: 400 }}>Roadmap</h2>
        <div className="roadmap-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {roadmap.map(([num, phase, title, text, pct]) => (
            <div className="roadmap-card" key={num as string} style={{ borderTop: "1px solid #35506a", paddingTop: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", fontFamily: "monospace", fontSize: "12px" }}>
                <span style={{ color: "var(--accent)" }}>{num as string}</span>
                <b style={{ color: "var(--mint)", textTransform: "uppercase" }}>{phase as string}</b>
              </div>
              <h3 style={{ color: "#e5ebf3", fontSize: "16px", fontWeight: 500, marginBottom: "8px" }}>{title as string}</h3>
              <p style={{ color: "#8391a3", fontSize: "13px", lineHeight: "1.7" }}>{text as string}</p>
              <div className="meter"><div className="meter-fill" style={{ width: `${pct}%` }} /></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
