import { useState } from "react"
import { projects } from "../data/content"

export function Projects() {
  const [filter, setFilter] = useState("All")
  const categories = ["All", "Python", "API", "CLI", "Web Scraper"]

  const filteredProjects = projects.filter(([_, type, __, ___, tags]) => {
    if (filter === "All") return true
    return type.toLowerCase().includes(filter.toLowerCase()) || tags.some((t: string) => t.toLowerCase().includes(filter.toLowerCase()))
  })

  return (
    <div className="projects-page section-pad" style={{ paddingTop: "60px", paddingBottom: "100px" }}>
      <div className="section-heading" style={{ marginBottom: "40px" }}>
        <div>
          <p className="eyebrow">Portfolio</p>
          <h2>Crafted with <em>Python.</em></h2>
        </div>
        <p>A showcase of automation utilities, custom scrapers, and command-line tools built to solve specific problems.</p>
      </div>

      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map(([num, type, title, desc, tags]) => (
          <article className="project-card" key={num as string}>
            <div className="card-top">
              <span>{num}</span>
              <a href={`/projects/${num}`}>↗</a>
            </div>
            <p className="project-type">{type as string}</p>
            <h3><a href={`/projects/${num}`}>{title as string}</a></h3>
            <p className="project-text">{desc as string}</p>
            <div className="tags">
              {(tags as string[]).map((t: string) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

