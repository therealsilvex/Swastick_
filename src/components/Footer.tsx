import { useState, useEffect } from "react"

export function Footer() {
  const [theme, setTheme] = useState("blue")

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
      <p>© 2026 Swastick. Built with curiosity.</p>
      <div>
        <button onClick={toggleTheme} style={{background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '11px', padding: 0}}>
          ◐ Theme
        </button>
        <a href="https://github.com/">GitHub</a>
        <a href="https://linkedin.com/">LinkedIn</a>
        <button onClick={() => window.scrollTo(0,0)} style={{background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '11px', padding: 0}}>Top ↑</button>
      </div>
    </footer>
  )
}

