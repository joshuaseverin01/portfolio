// ============================================================
// Sections — hero, about, experience, skills, principles, contact
// ============================================================

function Nav({ ThemeToggle }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
      padding: scrolled ? "12px 0" : "20px 0",
      background: scrolled ? "color-mix(in oklab, var(--paper) 85%, transparent)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "all .35s ease",
    }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 22, height: 22, border: "1px solid var(--ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "Instrument Serif, serif", fontSize: 14, fontStyle: "italic" }}>J</span>
          <span className="mono" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase" }}>Joshua Severin</span>
        </a>
        <div style={{ display: "flex", gap: 28 }} className="nav-links">
          {[["About","about"],["Work","work"],["Projects","projects"],["Writing","writing"],["Skills","skills"],["Contact","contact"]].map(([l,h])=>(
            <a key={h} href={`#${h}`} className="mono" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent-2)", marginRight: 6, animation: "pulse 2.2s ease infinite" }} />
            Available Summer '26
          </span>
          {ThemeToggle && <ThemeToggle />}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const motion = (document.documentElement.getAttribute("data-motion") || "1") === "1";
  const [headline, setHeadline] = React.useState(() => window.__headline || 0);
  React.useEffect(() => {
    const h = (e) => setHeadline(e.detail);
    window.addEventListener("headline-change", h);
    return () => window.removeEventListener("headline-change", h);
  }, []);
  const headlines = [
    ["Operator at the intersection of", "energy markets", "and product."],
    ["I build systems that turn", "data", "into decisions."],
    ["I quantify what most teams only", "estimate", "."],
    ["Turning kilowatt-hours into", "capital", "decisions."],
  ];
  const [a, b, c] = headlines[headline] || headlines[0];

  return (
    <section id="top" style={{ paddingTop: 140, paddingBottom: 40, position: "relative" }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20, maxWidth: 1100 }}>
          <h1 className="serif reveal" style={{
            fontSize: 50,
            lineHeight: 0.96,
            margin: "10px 0 0",
            letterSpacing: "-0.02em",
            fontWeight: 400,
            textWrap: "balance",
            color: "rgb(3, 3, 3)",
            textAlign: "center",
          }}>
            JOSHUA SEVERIN — PORTFOLIO  — 2026
          </h1>

          <p className="reveal" style={{
            marginTop: 28, width: 1100, fontSize: 17, color: "var(--ink-2)", lineHeight: 1.55, textAlign: "center",
          }}>
            UC Berkeley Economics '26. Currently modeling battery-storage economics and VPP integration strategy for utilities at Intertrust Technologies. Previously built a youth-sports operating system from scratch. I build systems that turn data into decisions.
          </p>

          <div className="reveal" style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <a href="#projects" className="btn">View projects <Arrow /></a>
            <a href="#contact" className="btn ghost">Get in touch</a>
          </div>
        </div>

      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .5; transform: scale(1.4); } }
        @media (max-width: 900px) {
          .nav-links { display: none; }
        }
      `}</style>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
    </svg>
  );
}

function SectionHeader({ num, tag, title, lede, titleStyle }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div className="rule">
        <span className="num">{num}</span>
        <span className="tag">{tag}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "end" }} className="sh-grid">
        <h2 className="serif" style={{
          fontSize: "clamp(36px, 4.4vw, 64px)",
          lineHeight: 1, margin: 0, fontWeight: 400, letterSpacing: "-0.02em", textWrap: "balance",
          ...(titleStyle || {}),
        }}>{title}</h2>
        {lede && <p style={{ fontSize: 16, color: "var(--ink-2)", maxWidth: 480, margin: 0, lineHeight: 1.55 }}>{lede}</p>}
      </div>
      <style>{`@media (max-width: 780px) { .sh-grid { grid-template-columns: 1fr; gap: 12px; } }`}</style>
    </div>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "40px 0 80px" }}>
      <div className="container">
        <SectionHeader num="I" tag="The Story" titleStyle={{ width: 840, fontSize: 60 }} title={<>From a factory floor in Germany to Berkeley<div style={{ fontSize: 30, color: "var(--ink-2)", marginTop: 14, letterSpacing: 0, fontFamily: "inherit" }}>Turning complex systems into clear decisions.</div></>} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }} className="about-grid reveal">
          <div style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-2)" }}>
            <p style={{ marginTop: 0 }}>
              I funded my move from Germany to the US by working production shifts at Festo, building components that end up inside BMW, Mercedes, and Audi engines. It wasn't glamorous, but it taught that real systems don't tolerate ambiguity. Things either work or they don't. That mindset has stayed with me.
            </p>
            <p>
              At Berkeley, I studied Economics and started building quantitative models at Intertrust Technologies. I spent the last year doing analyst work. One of the biggest projects was for RWE, one of Europe's largest utilities, modeling battery storage returns across 27 US energy markets and putting findings in front of C-suite executives making nine-figure capital allocation decisions.
            </p>
            <p>
              I launched a soccer tournament from scratch at Berkeley that generated 64.5% ROI in its first year with 230+ participants. I spent my free time in the Spring building PitchPoint, a platform for youth sports clubs that was inspired by my previous job as a full-time youth soccer coach, drowning in tools that didn't talk to each other.
            </p>
          </div>

          <div>
            <div style={{ border: "1px solid var(--line)", padding: 24, background: "var(--card)" }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Overview</div>
              <Row k="Based" v="Berkeley, CA" />
              <Row k="Origin" v="Saarland, Germany" />
              <Row k="Education" v="UC Berkeley · B.A. Economics · May '26" />
              <Row k="Coursework" v="Econometrics, Financial Economics, International Trade" />
              <Row k="Languages" v="German (native), English (fluent/native), French, Spanish" />
              <Row k="Current" v="Intertrust Technologies · PM + BD Intern" />
              <Row k="Side" v="PitchPoint (Founder) · Cal Men's Club Soccer (Captain)" />
              <Row k="Seeking" v="PM, Strategy, BD, Consulting (Summer 2026 start)" />
              <Row k="Visa" v="1 year OPT + 2 year STEM OPT extension" />
            </div>
          </div>
        </div>

        <style>{`@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; gap: 40px; } }`}</style>
      </div>
    </section>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", padding: "9px 0", borderTop: "1px dashed var(--line)", gap: 12 }}>
      <span className="mono" style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>{k}</span>
      <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{v}</span>
    </div>
  );
}

function Experience() {
  return (
    <section id="work" style={{ padding: "80px 0" }}>
      <div className="container">
        <SectionHeader num="II" tag="Experience" title={<>What I <em style={{ color: "var(--accent)" }}>owned</em>, what I <em style={{ color: "var(--accent)" }}>built</em>, what changed because of it.</>} lede={"\n"} />

        <div className="reveal">
          {window.EXPERIENCE.map((e, i) => (
            <div key={e.id} style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr 1fr",
              gap: 32,
              padding: "36px 0",
              borderTop: "1px solid var(--line)",
            }} className="exp-row">
              <div>
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{e.period}</div>
                <div style={{ marginTop: 10 }}>
                  <div className="serif" style={{ fontSize: 24, lineHeight: 1.1 }}>{e.company}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{e.role}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--muted-2)", marginTop: 10 }}>{e.place}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateRows: "auto auto", gap: 18 }}>
                <ExpBlock label="Owned" body={e.owned} />
                <ExpBlock label="Built" body={e.built} />
              </div>

              <div style={{ display: "grid", gridTemplateRows: "1fr auto", gap: 18 }}>
                <ExpBlock label="What changed" body={e.changed} emph />
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {e.tags.map(t => (
                    <span key={t} className="mono" style={{ fontSize: 10, padding: "4px 8px", border: "1px solid var(--line-2)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>{`@media (max-width: 900px) { .exp-row { grid-template-columns: 1fr !important; gap: 18px !important; } }`}</style>
      </div>
    </section>
  );
}

function ExpBlock({ label, body, emph }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <p style={{ margin: 0, fontSize: emph ? 15 : 14, lineHeight: 1.55, color: emph ? "var(--ink)" : "var(--ink-2)" }}>{body}</p>
    </div>
  );
}

function Writing() {
  return (
    <section id="writing" style={{ padding: "80px 0", background: "var(--paper-2)" }}>
      <div className="container">
        <SectionHeader
          num="IV"
          tag="Writing"
          title={<>Published <em style={{ color: "var(--accent)" }}>for Intertrust</em>.</>}
          lede="Two pieces translating proprietary modeling work into the industry conversation at RE+ and Distributech. External links open on intertrust.com."
        />

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {window.WRITING.map((w, i) => (
            <a
              key={i}
              href={w.href}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "border-color .25s ease, transform .25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)" }}>{w.pub}</span>
                <span className="mono" style={{ fontSize: 10, letterSpacing: ".1em", color: "var(--muted-2)" }}>{w.date}</span>
              </div>

              <div className="serif" style={{ fontSize: 26, lineHeight: 1.2, color: "var(--ink)" }}>{w.title}</div>

              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)" }}>{w.excerpt}</p>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
                {w.tags.map(t => (
                  <span key={t} className="mono" style={{ fontSize: 10, padding: "3px 8px", border: "1px solid var(--line-2)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em" }}>{t}</span>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px dashed var(--line)" }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>{w.role}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>Read on Intertrust ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 780px) { #writing .reveal { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "80px 0" }}>
      <div className="container">
        <SectionHeader num="V" tag="Skills" title={<span style={{ width: 1000, display: "inline-block" }}>The skill stack — <em style={{ color: "var(--accent)" }}>analytical</em>, <em style={{ color: "var(--accent)" }}>product</em>, <em style={{ color: "var(--accent)" }}>strategic</em>, <em style={{ color: "var(--accent)" }}>AI</em>.</span>} />

        <div className="reveal toolkit-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line)" }}>
          {window.SKILLS.map((s, i) => (
            <div key={s.group} style={{
              padding: 28,
              borderLeft: i > 0 ? "1px solid var(--line)" : "0",
              background: i % 2 === 1 ? "var(--card)" : "transparent",
            }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>{`0${i+1} · ${s.group}`}</div>
              <div className="serif" style={{ fontSize: 26, lineHeight: 1.15, marginBottom: 20 }}>{s.blurb}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {s.items.map(it => (
                  <li key={it} className="mono" style={{ fontSize: 12, padding: "6px 0", borderTop: "1px dashed var(--line)", color: "var(--ink-2)" }}>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 1100px) { .toolkit-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .toolkit-grid > div:nth-child(3) { border-left: 0 !important; border-top: 1px solid var(--line); }
            .toolkit-grid > div:nth-child(4) { border-top: 1px solid var(--line); }
          }
          @media (max-width: 700px) { .toolkit-grid { grid-template-columns: 1fr !important; }
            .toolkit-grid > div { border-left: 0 !important; }
            .toolkit-grid > div + div { border-top: 1px solid var(--line); }
          }
        `}</style>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section id="thinking" style={{ padding: "80px 0", background: "var(--paper-2)" }}>
      <div className="container">
        <SectionHeader num="V" tag="How I Think" title={<>Six operating <em style={{ color: "var(--accent)" }}>principles</em>.</>} lede="Distilled from the projects above. These are the things I'll say in a meeting before I've thought about whether to say them." />

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {window.PRINCIPLES.map(p => (
            <div key={p.n} style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: 28, position: "relative" }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--muted-2)", letterSpacing: ".2em", marginBottom: 14 }}>{p.n}</div>
              <div className="serif" style={{ fontSize: 24, lineHeight: 1.2, color: "var(--ink)", marginBottom: 14 }}>"{p.title}"</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 780px) { #thinking .reveal { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "120px 0 60px" }}>
      <div className="container">
        <div className="rule">
          <span className="num">VI</span>
          <span className="tag">Let's talk</span>
        </div>

        <div className="reveal" style={{ padding: "40px 0 60px", borderTop: "1px solid var(--line)" }}>
          <h2 className="serif" style={{
            fontSize: "clamp(44px, 6.4vw, 96px)",
            lineHeight: 0.98, margin: 0, fontWeight: 400, letterSpacing: "-0.02em", textWrap: "balance", maxWidth: 1100,
          }}>
            I'm always open to conversations around <em style={{ color: "var(--accent)" }}>product</em>, <em style={{ color: "var(--accent)" }}>strategy</em>, and building better <em style={{ color: "var(--accent)" }}>decision systems</em> — let's find a time to connect.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 60, alignItems: "end" }} className="contact-grid">
            <div>
              <a href={`mailto:${window.PROFILE.email}`} className="serif" style={{ fontSize: 32, color: "var(--ink)", borderBottom: "1px solid var(--line-2)", display: "inline-block", paddingBottom: 4 }}>
                {window.PROFILE.email}
              </a>
              <div style={{ display: "flex", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
                <a href={`https://${window.PROFILE.linkedin}`} target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>LinkedIn ↗</a>
                <a href={`tel:${window.PROFILE.phone}`} className="mono" style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>{window.PROFILE.phone}</a>
                <span className="mono" style={{ fontSize: 12, color: "var(--muted-2)" }}>{window.PROFILE.location}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 10, whiteSpace: "pre" }}>{"\n"}</div>
              <div className="serif" style={{ fontSize: 48, whiteSpace: "pre" }}>{"\n"}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Timezone: PST · Berkeley</div>
            </div>
          </div>
        </div>

        <footer style={{ borderTop: "1px solid var(--line)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span className="mono" style={{ fontSize: 10, color: "var(--muted-2)", letterSpacing: ".14em", textTransform: "uppercase" }}>© 2026 Joshua Severin · Built in Berkeley</span>
          <span className="mono" style={{ fontSize: 10, color: "var(--muted-2)", letterSpacing: ".14em", textTransform: "uppercase" }}>v.2026.04 · last shipped today</span>
        </footer>
        <style>{`@media (max-width: 780px) { .contact-grid { grid-template-columns: 1fr !important; } .contact-grid > div:last-child { text-align: left !important; } }`}</style>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, About, Experience, Skills, Principles, Writing, Contact, SectionHeader, Arrow });
