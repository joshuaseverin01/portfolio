// ============================================================
// Projects — case-study cards w/ expandable detail + ISO bars
// ============================================================

function Projects() {
  const [open, setOpen] = React.useState(null);

  return (
    <section id="projects" style={{ padding: "80px 0" }}>
      <div className="container">
        <SectionHeader
          num="III"
          tag="Selected Projects"
          title={<>Five projects from the last <em style={{ color: "var(--accent)" }}>18 months</em>.</>}
          lede="Each reads the same way: the problem, the approach, the output, the thing that moved. Click any one to expand."
        />

        <div className="reveal">
          {window.PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} p={p} i={i} open={open === p.id} onToggle={() => setOpen(open === p.id ? null : p.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ p, i, open, onToggle }) {
  const ref = React.useRef(null);
  return (
    <div style={{ borderTop: "1px solid var(--line)", borderBottom: i === window.PROJECTS.length - 1 ? "1px solid var(--line)" : "0" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", textAlign: "left", cursor: "pointer",
          padding: "26px 0",
          display: "grid",
          gridTemplateColumns: "60px 1fr auto 40px",
          gap: 24, alignItems: "center",
          transition: "padding .3s ease, background .3s ease",
        }}
        className="project-row"
      >
        <div className="mono" style={{ fontSize: 11, color: "var(--muted-2)", letterSpacing: ".1em" }}>{p.idx}</div>
        <div>
          <div className="serif" style={{ fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.1, color: "var(--ink)" }}>
            {p.title}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            {p.tags.map(t => (
              <span key={t} className="mono" style={{ fontSize: 10, padding: "3px 8px", border: "1px solid var(--line-2)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em" }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="mono project-client" style={{ fontSize: 11, color: "var(--muted)", textAlign: "right", maxWidth: 320 }}>
          {p.client}
        </div>
        <div style={{
          width: 32, height: 32, border: "1px solid var(--ink)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform .3s ease",
          transform: open ? "rotate(45deg)" : "none",
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.25"/></svg>
        </div>
      </button>

      <div
        ref={ref}
        style={{
          maxHeight: open ? 2400 : 0,
          overflow: "hidden",
          transition: "max-height .6s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <ProjectDetail p={p} />
      </div>
    </div>
  );
}

function ProjectDetail({ p }) {
  return (
    <div style={{
      padding: "20px 0 56px",
      display: "grid",
      gridTemplateColumns: "60px 1fr",
      gap: 24,
    }}>
      <div />
      <div>
        <div className="serif" style={{
          fontSize: 22, lineHeight: 1.35, color: "var(--ink-2)",
          maxWidth: 820, marginBottom: 34, fontStyle: "italic",
        }}>
          "{p.tagline}"
        </div>

        {/* Signature viz for ISO project */}
        {p.hasMap && (
          <div style={{
            border: "1px solid var(--line)",
            padding: 28,
            background: "var(--card)",
            marginBottom: 40,
          }}>
            <ZonalBars defaultIso="PJM" />
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }} className="detail-grid">
          <DetailBlock label="Problem" body={p.problem} />
          <DetailBlock label="Approach" body={
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {p.approach.map((s, i) => <li key={i} style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)" }}>{s}</li>)}
            </ul>
          } />
          <DetailBlock label="Output" body={p.output} />
          <DetailBlock label="Impact" body={p.impact} emph />
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .project-row { grid-template-columns: 30px 1fr 28px !important; }
          .project-row > *:nth-child(3) { display: none; }
        }
      `}</style>
    </div>
  );
}

function DetailBlock({ label, body, emph }) {
  return (
    <div style={{
      background: emph ? "var(--accent-soft)" : "transparent",
      border: emph ? "0" : "0",
      padding: emph ? 20 : 0,
    }}>
      <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
      {typeof body === "string" ? (
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: emph ? "var(--ink)" : "var(--ink-2)", fontWeight: emph ? 500 : 400 }}>{body}</p>
      ) : body}
    </div>
  );
}

Object.assign(window, { Projects, ProjectRow, ProjectDetail, DetailBlock });
