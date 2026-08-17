import { useState, useEffect } from "react"

export function Footer() {
  const [theme, setTheme] = useState("blue")

  // ------ Theme Management ------
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "blue"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: string) => {
    const root = document.documentElement
    if (newTheme === "purple") {
      root.style.setProperty("--accent", "#dd91f0")
      root.style.setProperty("--mint", "#f39b9d")
    } else if (newTheme === "green") {
      root.style.setProperty("--accent", "#59d99f")
      root.style.setProperty("--mint", "#f5d56f")
    } else {
      root.style.removeProperty("--accent") 
      root.style.removeProperty("--mint")
    }
  }

  const toggleTheme = () => {
    let nextTheme = "blue"
    if (theme === "blue") nextTheme = "purple"
    else if (theme === "purple") nextTheme = "green"
    
    setTheme(nextTheme)
    applyTheme(nextTheme)
    localStorage.setItem("theme", nextTheme)
  }

  return (
    <footer>
      {/* ------ Content ------ */}
      <p>© {new Date().getFullYear()} Swastick. Built with curiosity.</p>
      
      {/* ------ Links ------ */}
      <div>
        <button className="magnetic" onClick={toggleTheme} style={{background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '11px', padding: 0}}>
          ◐ Theme
        </button>
        <a className="magnetic" href="https://github.com/therealsilvex" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a className="magnetic" href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <button className="magnetic" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '11px', padding: 0}}>Top ↑</button>
      </div>
    </footer>
  )
}
