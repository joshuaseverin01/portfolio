import React from "react";
import { PROJECTS } from "./data.jsx";
import { SectionHeader } from "./sections.jsx";
import { ZonalBars } from "./viz.jsx";

// ============================================================
// Projects — case-study cards w/ expandable detail + ISO bars
// ============================================================

export default function Projects() {
  const [open, setOpen] = React.useState(null);

  return (
    <section
      id="projects"
      style={{
        padding: "148px 0 124px",
        background: "linear-gradient(180deg, color-mix(in oklab, var(--paper) 76%, var(--paper-2)) 0%, var(--paper) 18%, color-mix(in oklab, var(--paper) 88%, var(--card)) 100%)",
        position: "relative",
      }}
    >
      <div className="container">
        <SectionHeader
          num="III"
          tag="Selected Projects"
          title={<>Six projects from the last <em style={{ color: "var(--signal)" }}>18 months</em>.</>}
          lede="Each reads the same way: the problem, the approach, the output, the thing that moved. Click any one to expand."
          wrapStyle={{ marginBottom: 72 }}
          titleStyle={{ maxWidth: 760 }}
        />

        <div className="reveal">
          {PROJECTS.map((project, index) => (
            <ProjectRow key={project.id} p={project} i={index} open={open === project.id} onToggle={() => setOpen(open === project.id ? null : project.id)} />
          ))}
        </div>
        <style>{`
          .project-entry {
            transition: background .24s ease, border-color .24s ease;
          }
          .project-entry:hover,
          .project-entry.is-open {
            background: linear-gradient(180deg, color-mix(in oklab, var(--card) 86%, white), color-mix(in oklab, var(--paper) 78%, var(--card)));
          }
          .project-title {
            transition: transform .24s ease, color .24s ease;
          }
          .project-row:hover .project-title {
            transform: translateX(4px);
          }
          .project-row:hover .project-client {
            color: var(--ink-2) !important;
          }
          .project-toggle-icon {
            transition: transform .3s ease, background .24s ease, color .24s ease, border-color .24s ease;
          }
          .project-row:hover .project-toggle-icon {
            background: var(--ink);
            color: var(--paper);
            border-color: var(--ink);
          }
          .project-demo-card .btn.ghost:hover {
            background: var(--ink);
            color: var(--paper);
            border-color: var(--ink);
            box-shadow: none;
          }
          @media (max-width: 900px) {
            .project-entry:hover {
              background: linear-gradient(180deg, color-mix(in oklab, var(--card) 82%, white), color-mix(in oklab, var(--paper) 82%, var(--card)));
            }
          }
        `}</style>
      </div>
    </section>
  );
}

export function ProjectRow({ p, i, open, onToggle }) {
  const ref = React.useRef(null);

  return (
    <div className={`project-entry${open ? " is-open" : ""}`} style={{ borderTop: "1px solid var(--line)", borderBottom: i === PROJECTS.length - 1 ? "1px solid var(--line)" : "0" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          textAlign: "left",
          cursor: "pointer",
          padding: "34px 0 30px",
          display: "grid",
          gridTemplateColumns: "72px minmax(0, 1fr) auto 44px",
          gap: 32,
          alignItems: "center",
          transition: "padding .3s ease, background .3s ease",
        }}
        className="project-row"
      >
        <div className="mono" style={{ fontSize: 11, color: "var(--muted-2)", letterSpacing: ".12em" }}>{p.idx}</div>
        <div>
          <div className="serif project-title" style={{ fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1, color: "var(--ink)", letterSpacing: "-0.03em" }}>
            {p.title}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {p.tags.map((tag) => (
              <span key={tag} className="mono" style={{ fontSize: 10, padding: "5px 9px", border: "1px solid var(--line-2)", color: "var(--muted)", background: "color-mix(in oklab, var(--card) 78%, white)", textTransform: "uppercase", letterSpacing: ".08em" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mono project-client" style={{ fontSize: 10.5, color: "var(--muted)", textAlign: "right", maxWidth: 352, lineHeight: 1.7, letterSpacing: ".06em", textTransform: "uppercase" }}>
          {p.client}
        </div>
        <div
          className="project-toggle-icon"
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            border: "1px solid var(--line-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform .3s ease",
            transform: open ? "rotate(45deg)" : "none",
            color: "var(--ink)",
            background: open ? "var(--ink)" : "transparent",
            ...(open ? { color: "var(--paper)", borderColor: "var(--ink)" } : {}),
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.25" /></svg>
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
                  color: "var(--muted)",
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
                  color: "var(--ink)",
                  borderColor: "var(--line-2)",
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

export function ProjectDetail({ p }) {
  return (
    <div
      style={{
        padding: "30px 0 76px",
        display: "grid",
        gridTemplateColumns: "72px 1fr",
        gap: 24,
      }}
    >
      <div />
      <div>
        <div className="serif" style={{ fontSize: "clamp(24px, 2.8vw, 30px)", lineHeight: 1.42, color: "var(--ink-2)", maxWidth: 860, marginBottom: 40, fontStyle: "italic" }}>
          "{p.tagline}"
        </div>

        {p.hasMap && (
          <div style={{ border: "1px solid var(--line)", padding: 28, background: "color-mix(in oklab, var(--card) 84%, white)", marginBottom: 40 }}>
            <ZonalBars defaultIso="PJM" />
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 22 }} className="detail-grid">
          <DetailBlock label="Problem" body={p.problem} />
          <DetailBlock
            label="Approach"
            body={(
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {p.approach.map((step, index) => (
                  <li key={index} style={{ marginBottom: 10, fontSize: 14.5, lineHeight: 1.65, color: "var(--ink-2)" }}>
                    {step}
                  </li>
                ))}
              </ul>
            )}
          />
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

export function DetailBlock({ label, body, emph }) {
  return (
    <div style={{ background: emph ? "var(--accent-soft)" : "color-mix(in oklab, var(--card) 84%, white)", border: "1px solid var(--line)", padding: 22 }}>
      <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 12 }}>{label}</div>
      {typeof body === "string" ? (
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.72, color: emph ? "var(--ink)" : "var(--ink-2)", fontWeight: emph ? 500 : 400 }}>{body}</p>
      ) : body}
    </div>
  );
}
