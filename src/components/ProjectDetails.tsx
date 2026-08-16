export function ProjectDetails({ projectData }: { projectData: any[] }) {
  // Fallback in case the data doesn't pass through correctly
  if (!projectData || projectData.length === 0) return null;

  const [num, type, title, desc, tags] = projectData

  return (
    <div className="project-details section-pad" style={{ paddingTop: "60px", paddingBottom: "100px" }}>
      <a href="/projects" style={{ color: "var(--accent)", fontSize: "14px" }}>← Back to Projects</a>
      
      <div className="details-header" style={{ marginTop: "40px", marginBottom: "60px" }}>
        <p className="eyebrow">{type as string} — {num as string}</p>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", marginTop: "12px", marginBottom: "24px" }}>{title as string}</h1>
        <div className="tags" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {(tags as string[]).map((t: string) => (
            <span style={{ border: "1px solid #2d4053", color: "#8396ad", fontSize: "12px", padding: "6px 10px" }} key={t}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: "60px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <div className="overview">
          <h2 style={{ fontSize: "24px", color: "#e8edf4", marginBottom: "16px", fontWeight: 500 }}>Overview</h2>
          <p style={{ color: "#a5b0c0", lineHeight: "1.8", marginBottom: "16px" }}>{desc as string}</p>
          <p style={{ color: "#a5b0c0", lineHeight: "1.8" }}>
            This project was built to solve a specific problem using efficient algorithms and clean code architecture. 
            It heavily utilizes modern Python libraries and strict object-oriented principles to ensure scalability and maintainability.
          </p>
        </div>

        <div style={{ background: "#0d141f", border: "1px solid #263747", padding: "32px" }}>
          <h3 style={{ color: "var(--accent)", marginBottom: "24px", fontWeight: 500, fontSize: "18px" }}>Project Links</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="primary-button" style={{ textAlign: "center", textDecoration: "none" }}>
              View Source on GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

