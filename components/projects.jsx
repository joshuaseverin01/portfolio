// ============================================================
// Projects — case-study cards w/ expandable detail + ISO bars
// ============================================================

function Projects() {
  const [open, setOpen] = React.useState(null);

  return (
    <section id="projects" style={{ padding: "112px 0 124px", background: "var(--case-bg)", color: "var(--case-text)", position: "relative" }}>
      <div className="container">
        <SectionHeader
          num="III"
          tag="Selected Projects"
          title={<>Five projects from the last <em style={{ color: "var(--signal)" }}>18 months</em>.</>}
          lede="Each reads the same way: the problem, the approach, the output, the thing that moved. Click any one to expand."
          wrapStyle={{ marginBottom: 72 }}
          ruleStyle={{ borderTop: "1px solid var(--case-line)" }}
          numStyle={{ color: "rgba(245, 239, 229, 0.42)" }}
          tagStyle={{ color: "rgba(245, 239, 229, 0.62)" }}
          titleStyle={{ color: "var(--case-text)", maxWidth: 760 }}
          ledeStyle={{ color: "var(--case-muted)" }}
        />

        <div className="reveal">
          {window.PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} p={p} i={i} open={open === p.id} onToggle={() => setOpen(open === p.id ? null : p.id)} />
          ))}
        </div>
        <style>{`
          .project-entry {
            transition: background .24s ease, border-color .24s ease;
          }
          .project-entry:hover,
          .project-entry.is-open {
            background: linear-gradient(180deg, rgba(245, 239, 229, 0.035), rgba(245, 239, 229, 0.015));
          }
          .project-title {
            transition: transform .24s ease, color .24s ease;
          }
          .project-row:hover .project-title {
            transform: translateX(4px);
          }
          .project-row:hover .project-client {
            color: var(--case-text) !important;
          }
          .project-toggle-icon {
            transition: transform .3s ease, background .24s ease, color .24s ease, border-color .24s ease;
          }
          .project-row:hover .project-toggle-icon {
            background: var(--case-text);
            color: var(--case-bg);
            border-color: var(--case-text);
          }
          .project-demo-card .btn.ghost:hover {
            background: var(--case-text);
            color: var(--case-bg);
            border-color: var(--case-text);
            box-shadow: none;
          }
          @media (max-width: 900px) {
            .project-entry:hover {
              background: linear-gradient(180deg, rgba(245, 239, 229, 0.02), rgba(245, 239, 229, 0.008));
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function ProjectRow({ p, i, open, onToggle }) {
  const ref = React.useRef(null);
  return (
    <div className={`project-entry${open ? " is-open" : ""}`} style={{ borderTop: "1px solid var(--case-line)", borderBottom: i === window.PROJECTS.length - 1 ? "1px solid var(--case-line)" : "0" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", textAlign: "left", cursor: "pointer",
          padding: "34px 0 30px",
          display: "grid",
          gridTemplateColumns: "72px minmax(0, 1fr) auto 44px",
          gap: 32, alignItems: "center",
          transition: "padding .3s ease, background .3s ease",
        }}
        className="project-row"
      >
        <div className="mono" style={{ fontSize: 11, color: "rgba(245, 239, 229, 0.44)", letterSpacing: ".12em" }}>{p.idx}</div>
        <div>
          <div className="serif project-title" style={{ fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1, color: "var(--case-text)", letterSpacing: "-0.03em" }}>
            {p.title}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {p.tags.map(t => (
              <span key={t} className="mono" style={{ fontSize: 10, padding: "5px 9px", border: "1px solid rgba(245, 239, 229, 0.16)", color: "var(--case-muted)", background: "var(--case-card)", textTransform: "uppercase", letterSpacing: ".08em" }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="mono project-client" style={{ fontSize: 10.5, color: "var(--case-muted)", textAlign: "right", maxWidth: 352, lineHeight: 1.7, letterSpacing: ".06em", textTransform: "uppercase" }}>
          {p.client}
        </div>
        <div className="project-toggle-icon" style={{
          width: 40, height: 40, borderRadius: 999, border: "1px solid rgba(245, 239, 229, 0.28)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform .3s ease",
          transform: open ? "rotate(45deg)" : "none",
          color: "var(--case-text)",
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.25"/></svg>
        </div>
      </button>

      {p.demoHref && (
        <div style={{ padding: "4px 0 28px" }}>
          <div
            className="project-demo-row"
            style={{
              display: "grid",
              gridTemplateColumns: "72px 1fr auto 44px",
              gap: 24,
              alignItems: "start",
            }}
          >
            <div
              className="project-demo-card"
              style={{
                gridColumn: "3 / 4",
                maxWidth: 320,
                justifySelf: "end",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 12,
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--case-muted)",
                  letterSpacing: ".06em",
                  lineHeight: 1.7,
                  textAlign: "right",
                  textTransform: "uppercase",
                }}
              >
                {p.demoNote}
              </div>
              <a
                href={p.demoHref}
                target="_blank"
                rel="noreferrer"
                className="btn ghost mono"
                style={{
                  padding: "11px 16px",
                  fontSize: 11,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  background: "transparent",
                  color: "var(--case-text)",
                  borderColor: "rgba(245, 239, 229, 0.28)",
                }}
              >
                {p.demoLabel}
              </a>
            </div>
          </div>
        </div>
      )}

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
      padding: "30px 0 76px",
      display: "grid",
      gridTemplateColumns: "72px 1fr",
      gap: 24,
    }}>
      <div />
      <div>
        <div className="serif" style={{
          fontSize: "clamp(24px, 2.8vw, 30px)", lineHeight: 1.42, color: "rgba(245, 239, 229, 0.74)",
          maxWidth: 860, marginBottom: 40, fontStyle: "italic",
        }}>
          "{p.tagline}"
        </div>

        {/* Signature viz for ISO project */}
        {p.hasMap && (
          <div style={{
            border: "1px solid rgba(245, 239, 229, 0.14)",
            padding: 28,
            background: "var(--paper)",
            marginBottom: 40,
          }}>
            <ZonalBars defaultIso="PJM" />
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 22 }} className="detail-grid">
          <DetailBlock label="Problem" body={p.problem} />
          <DetailBlock label="Approach" body={
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {p.approach.map((s, i) => <li key={i} style={{ marginBottom: 10, fontSize: 14.5, lineHeight: 1.65, color: "var(--case-muted)" }}>{s}</li>)}
            </ul>
          } />
          <DetailBlock label="Output" body={p.output} />
          <DetailBlock label="Impact" body={p.impact} emph />
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .project-row { grid-template-columns: 30px 1fr 36px !important; }
          .project-row > *:nth-child(3) { display: none; }
          .project-demo-row {
            grid-template-columns: 30px 1fr 28px !important;
            gap: 16px !important;
          }
          .project-demo-card {
            grid-column: 2 / 3 !important;
            justify-self: start !important;
            align-items: flex-start !important;
            max-width: none !important;
          }
          .project-demo-card > div {
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
}

function DetailBlock({ label, body, emph }) {
  return (
    <div style={{
      background: emph ? "var(--case-soft)" : "var(--case-card)",
      border: "1px solid var(--case-line)",
      padding: 22,
    }}>
      <div className="mono" style={{ fontSize: 10, color: "var(--case-muted)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 12 }}>{label}</div>
      {typeof body === "string" ? (
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.72, color: emph ? "var(--case-text)" : "var(--case-muted)", fontWeight: emph ? 500 : 400 }}>{body}</p>
      ) : body}
    </div>
  );
}

Object.assign(window, { Projects, ProjectRow, ProjectDetail, DetailBlock });
