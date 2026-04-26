import React from "react";
import { EXPERIENCE, PRINCIPLES, PROFILE, SKILLS, WRITING } from "./data.jsx";

// ============================================================
// Sections — routed pages, homepage modules, shared contact
// ============================================================

const OVERVIEW_ROWS = [
  ["Based", "Berkeley, CA"],
  ["Origin", "Saarland, Germany"],
  ["Education", "UC Berkeley · B.A. Economics · May '26"],
  ["Coursework", "Econometrics, Financial Economics, International Trade"],
  ["Languages", "German (native), English (fluent/native), French, Spanish"],
  ["Current", "Intertrust Technologies · PM + BD Intern"],
  ["Side", "PitchPoint (Founder) · Cal Men's Club Soccer (Captain)"],
  ["Seeking", "PM, Strategy, BD, Consulting (Summer 2026 start)"],
  ["Visa", "1 year OPT + 2 year STEM OPT extension"],
];

const STORY_PARAGRAPHS = [
  "I grew up in a small town in Germany near the French border called Kleinottweiler. Early on, I developed the aspiration to move to the United States and build something for myself there.",
  "I funded that move by working production shifts at Festo, building components that end up inside BMW, Mercedes, and Audi engines. It wasn’t glamorous, but it taught me that real systems don’t tolerate ambiguity. Things either work or they don’t. That mindset has stayed with me.",
  "At Berkeley, I studied Economics and started building quantitative models at Intertrust Technologies. I spent the last year doing analyst work. One of the biggest projects was for RWE, one of Europe’s largest utilities, modeling battery storage returns across 27 US energy markets and putting findings in front of C-suite executives making nine-figure capital allocation decisions.",
  "At the same time, I was a captain and responsible for finances on the Berkeley men’s club soccer team. As part of that role, I launched a tournament from scratch that generated a 64.5% ROI in its first year with 230+ participants and has since developed into a recurring revenue stream.",
  "I spent my free time in the Spring building PitchPoint, a platform for youth sports clubs inspired by my work inside the youth soccer system, where I saw firsthand how fragmented tools slowed down even well-run organizations.",
];

const HOME_CARDS = [
  {
    path: "/overview",
    title: "Overview",
    preview: "A quick snapshot of what I do, what I’m building, and where I’m headed.",
  },
  {
    path: "/story",
    title: "The Story",
    preview: "From a factory floor in Germany to Berkeley — the longer arc behind the work.",
  },
  {
    path: "/experience",
    title: "Experience",
    preview: "Roles, operating work, and the systems I’ve helped build.",
  },
  {
    path: "/projects",
    title: "Projects",
    preview: "Selected work across modeling, product, strategy, and operations.",
  },
  {
    path: "/writing",
    title: "Writing",
    preview: "Published thinking, research notes, and market-facing analysis.",
  },
  {
    path: "/skills",
    title: "Skills",
    preview: "The tools, workflows, and operating strengths behind the work.",
  },
];

function isModifiedEvent(event) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

function routeClick(onNavigate, path) {
  return (event) => {
    if (!onNavigate) return;
    if (event.defaultPrevented || isModifiedEvent(event) || event.button !== 0) return;
    event.preventDefault();
    onNavigate(path);
  };
}

function HeadshotFrame({ width, height, radius, alt, frameStyle, imageStyle }) {
  const src = PROFILE.headshot || "/images/JS_headshot.png";

  return (
    <span
      style={{
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        background: "var(--paper-2)",
        border: "1px solid var(--line-2)",
        boxShadow: "0 18px 42px rgba(20, 19, 17, 0.12)",
        ...frameStyle,
      }}
    >
      <img
        src={src}
        alt={alt || "Josh Severin headshot"}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          objectPosition: "center 20%",
          ...imageStyle,
        }}
      />
    </span>
  );
}

function NavItem({ href, label, currentPath, onNavigate }) {
  const active = currentPath === href;

  return (
    <a
      href={href}
      onClick={routeClick(onNavigate, href)}
      className="mono nav-link"
      style={{
        fontSize: 10.5,
        letterSpacing: ".16em",
        textTransform: "uppercase",
        color: active ? "var(--ink)" : "var(--muted)",
      }}
    >
      {label}
    </a>
  );
}

export function Nav({ currentPath, onNavigate }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        padding: scrolled ? "12px 0" : "24px 0",
        background: scrolled ? "color-mix(in oklab, var(--paper) 90%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid color-mix(in oklab, var(--line) 82%, transparent)" : "1px solid transparent",
        transition: "all .35s ease",
      }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" onClick={routeClick(onNavigate, "/")} className="nav-brand" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <HeadshotFrame
            width={30}
            height={30}
            radius={999}
            alt="Josh Severin headshot"
            frameStyle={{
              border: "1px solid color-mix(in oklab, var(--ink) 16%, transparent)",
              boxShadow: scrolled ? "0 10px 24px rgba(20, 19, 17, 0.08)" : "0 12px 28px rgba(20, 19, 17, 0.12)",
            }}
          />
          <span className="mono" style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase" }}>Joshua Severin</span>
        </a>

        <div style={{ display: "flex", gap: 30 }} className="nav-links">
          <NavItem href="/" label="Home" currentPath={currentPath} onNavigate={onNavigate} />
          <NavItem href="/overview" label="Overview" currentPath={currentPath} onNavigate={onNavigate} />
          <NavItem href="/story" label="Story" currentPath={currentPath} onNavigate={onNavigate} />
          <NavItem href="/experience" label="Experience" currentPath={currentPath} onNavigate={onNavigate} />
          <NavItem href="/projects" label="Projects" currentPath={currentPath} onNavigate={onNavigate} />
          <NavItem href="/writing" label="Writing" currentPath={currentPath} onNavigate={onNavigate} />
          <NavItem href="/skills" label="Skills" currentPath={currentPath} onNavigate={onNavigate} />
          <a href="#contact" className="mono nav-link" style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>
            Contact
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--muted)" }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent-2)", marginRight: 6, animation: "pulse 2.2s ease infinite" }} />
            Available Summer '26
          </span>
        </div>
      </div>

      <style>{`
        .nav-link,
        .nav-brand {
          transition: color .22s ease, opacity .22s ease;
        }
        .nav-link:hover,
        .nav-brand:hover {
          color: var(--ink);
        }
      `}</style>
    </nav>
  );
}

export function Hero({ onViewProjects }) {
  return (
    <section id="top" style={{ paddingTop: 176, paddingBottom: 82, position: "relative" }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-shell reveal" style={{ display: "grid", gridTemplateColumns: "220px minmax(0, 1.2fr) 320px", gap: 34, alignItems: "start", maxWidth: 1180, margin: "0 auto" }}>
          <div className="hero-mobile-name mono" style={{ fontSize: 10.5, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted)" }}>
            Joshua Severin
          </div>

          <div className="hero-portrait-col" style={{ display: "grid", gap: 18, alignContent: "start" }}>
            <HeadshotFrame
              width={198}
              height={244}
              radius={30}
              alt="Josh Severin headshot"
              frameStyle={{
                background: "color-mix(in oklab, var(--card) 88%, white)",
                boxShadow: "0 32px 72px rgba(20, 19, 17, 0.14)",
              }}
              imageStyle={{
                objectPosition: "center 18%",
              }}
            />
            <div className="hero-side-meta" style={{ display: "grid", gap: 10, paddingTop: 2 }}>
              <div style={{ width: 64, height: 1, background: "var(--line-2)" }} />
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>
                Berkeley, CA
              </div>
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>
                Available Summer '26
              </div>
            </div>
          </div>

          <div className="hero-main-col" style={{ display: "grid", gap: 22, alignContent: "start" }}>
            <div className="hero-main-label mono" style={{ fontSize: 10.5, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--muted)", textAlign: "left" }}>
              Joshua Severin
            </div>

            <h1
              className="serif hero-h1"
              style={{
                fontSize: "clamp(52px, 8.4vw, 104px)",
                lineHeight: 0.9,
                margin: "6px 0 0",
                letterSpacing: "-0.04em",
                fontWeight: 400,
                textWrap: "balance",
                color: "var(--ink)",
                textAlign: "left",
                maxWidth: 760,
              }}
            >
              I build models behind real decisions.
            </h1>
            <div style={{ width: 112, height: 2, background: "color-mix(in oklab, var(--accent) 58%, var(--line))" }} />

            <div className="hero-mobile-meta">
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>
                Berkeley, CA
              </div>
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>
                Available Summer '26
              </div>
            </div>
          </div>

          <div className="hero-copy-col" style={{ display: "grid", gap: 24, alignContent: "start", paddingTop: "min(9vw, 108px)" }}>
            <p
              className="hero-sub"
              style={{
                margin: 0,
                width: "100%",
                maxWidth: 360,
                fontSize: "clamp(16px, 1.7vw, 18px)",
                color: "var(--ink-2)",
                lineHeight: 1.8,
                textAlign: "left",
              }}
            >
              I’m exploring full-time roles in business development and product, starting Summer 2026. Over the last year, I’ve modeled battery storage economics and VPP integration strategy for utilities at Intertrust Technologies. In parallel, I built a youth sports operating system from scratch.
            </p>

            <div className="hero-cta-row" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "flex-start" }}>
              <button type="button" className="btn" onClick={onViewProjects}>View Projects <Arrow /></button>
              <a href="#contact" className="btn ghost">Get in touch</a>
            </div>

            <div className="hero-role-line mono" style={{ fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>
              Full-time roles, business development and product
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .5; transform: scale(1.4); } }
        .hero-mobile-name,
        .hero-mobile-meta {
          display: none;
        }
        @media (max-width: 1080px) {
          .hero-shell {
            grid-template-columns: 180px minmax(0, 1fr) !important;
            gap: 26px !important;
          }
          .hero-portrait-col {
            grid-row: 1 / span 2;
          }
          .hero-copy-col {
            grid-column: 2 / 3;
            padding-top: 0 !important;
            max-width: 560px;
          }
        }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .hero-shell {
            grid-template-columns: 1fr !important;
            gap: 26px !important;
          }
          .hero-portrait-col {
            order: -1;
            justify-items: start;
            grid-row: auto;
          }
          .hero-main-col,
          .hero-copy-col {
            justify-items: start;
          }
          .hero-copy-col {
            padding-top: 0 !important;
            max-width: 100%;
          }
          .hero-sub,
          .hero-h1 {
            text-align: left !important;
          }
        }
        @media (max-width: 640px) {
          .hero-shell {
            gap: 18px !important;
          }
          .hero-mobile-name {
            display: block !important;
            order: 1;
            width: 100%;
            text-align: center;
          }
          .hero-portrait-col {
            order: 2 !important;
            justify-items: center !important;
            gap: 0 !important;
          }
          .hero-side-meta {
            display: none !important;
          }
          .hero-main-col {
            order: 3;
            justify-items: center !important;
            gap: 18px !important;
          }
          .hero-main-label {
            display: none !important;
          }
          .hero-mobile-meta {
            display: grid !important;
            gap: 8px;
            width: 100%;
            justify-items: center;
          }
          .hero-copy-col {
            order: 4;
            width: 100%;
            justify-items: center !important;
            gap: 18px !important;
          }
          .hero-cta-row {
            justify-content: center !important;
          }
          .hero-role-line {
            text-align: center !important;
          }
          .hero-portrait-col > span {
            width: 172px !important;
            height: 208px !important;
          }
          .hero-h1 {
            text-align: center !important;
          }
          .hero-sub {
            width: 100% !important;
            max-width: min(100%, 34rem) !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function SectionHeader({ num, tag, title, lede, titleStyle, ledeStyle, numStyle, tagStyle, ruleStyle, wrapStyle, gridStyle }) {
  return (
    <div style={{ marginBottom: 56, ...(wrapStyle || {}) }}>
      <div className="rule" style={ruleStyle}>
        <span className="num" style={numStyle}>{num}</span>
        <span className="tag" style={tagStyle}>{tag}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "end", ...(gridStyle || {}) }} className="sh-grid">
        <h2
          className="serif"
          style={{
            fontSize: "clamp(40px, 4.8vw, 72px)",
            lineHeight: 0.94,
            margin: 0,
            fontWeight: 400,
            letterSpacing: "-0.03em",
            textWrap: "balance",
            ...(titleStyle || {}),
          }}
        >
          {title}
        </h2>
        {lede && <p style={{ fontSize: 16.5, color: "var(--ink-2)", maxWidth: 500, margin: 0, lineHeight: 1.6, ...(ledeStyle || {}) }}>{lede}</p>}
      </div>
      <style>{`@media (max-width: 780px) { .sh-grid { grid-template-columns: 1fr; gap: 12px; } }`}</style>
    </div>
  );
}

function OverviewPanel() {
  return (
    <div style={{ border: "1px solid var(--line)", padding: 30, background: "color-mix(in oklab, var(--card) 86%, white)", boxShadow: "0 20px 40px rgba(20, 19, 17, 0.04)" }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>Overview</div>
      {OVERVIEW_ROWS.map(([k, v]) => (
        <Row key={k} k={k} v={v} />
      ))}
    </div>
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

function StoryColumn({ paragraphs }) {
  return (
    <div style={{ maxWidth: 760 }} className="reveal">
      {paragraphs.map((paragraph, index) => (
        <p key={index} style={{ fontSize: 16.5, lineHeight: 1.78, color: "var(--ink-2)", margin: index === 0 ? 0 : "0 0 20px" }}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function NavigationCard({ card, index, onNavigate }) {
  return (
    <a
      href={card.path}
      onClick={routeClick(onNavigate, card.path)}
      style={{
        border: "1px solid var(--line)",
        background: "color-mix(in oklab, var(--card) 82%, white)",
        padding: 28,
        display: "grid",
        gap: 14,
        minHeight: 220,
        transition: "transform .24s ease, border-color .24s ease, box-shadow .24s ease, background .24s ease",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-2px)";
        event.currentTarget.style.borderColor = "var(--accent)";
        event.currentTarget.style.boxShadow = "0 24px 40px rgba(20, 19, 17, 0.07)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "none";
        event.currentTarget.style.borderColor = "var(--line)";
        event.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="mono" style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted-2)" }}>
        0{index + 1}
      </div>
      <div className="serif" style={{ fontSize: 34, lineHeight: 1.02, letterSpacing: "-0.03em", color: "var(--ink)" }}>
        {card.title}
      </div>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.68, color: "var(--ink-2)", maxWidth: 320 }}>
        {card.preview}
      </p>
      <div className="mono" style={{ marginTop: "auto", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--accent)" }}>
        Open page ↗
      </div>
    </a>
  );
}

export function HomeNavigationCards({ onNavigate }) {
  return (
    <section style={{ padding: "12px 0 96px" }}>
      <div className="container">
        <SectionHeader
          num="I"
          tag="Portfolio Map"
          title={<>Browse the work <em style={{ color: "var(--accent)" }}>by thread</em>.</>}
          lede="Each page isolates a different slice of the portfolio, so you can move directly to the story, roles, projects, published work, or underlying operating strengths."
        />

        <div className="route-card-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
          {HOME_CARDS.map((card, index) => (
            <NavigationCard key={card.path} card={card} index={index} onNavigate={onNavigate} />
          ))}
        </div>

        <style>{`
          @media (max-width: 980px) {
            .route-card-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }
          @media (max-width: 640px) {
            .route-card-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

export function OverviewPage() {
  return (
    <section id="overview" style={{ padding: "148px 0 104px" }}>
      <div className="container">
        <SectionHeader
          num="I"
          tag="Overview"
          title={<>A quick snapshot of the work, what I’m building, and where I’m headed.</>}
          lede="Energy markets, product thinking, operating systems, and business development, all anchored in work that has to hold up in the real world."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 64, alignItems: "start" }} className="overview-grid">
          <div className="reveal" style={{ maxWidth: 720 }}>
            <p style={{ fontSize: 16.5, lineHeight: 1.78, color: "var(--ink-2)", marginTop: 0 }}>
              I study Economics at UC Berkeley and work at the intersection of energy markets, product, and operating systems. At Intertrust Technologies, I’ve spent the last year modeling battery-storage economics and VPP integration strategy for utility stakeholders making real capital-allocation decisions.
            </p>
            <p style={{ fontSize: 16.5, lineHeight: 1.78, color: "var(--ink-2)", marginBottom: 0 }}>
              In parallel, I’m building PitchPoint, a youth sports operating system shaped by my experience as a coach, operator, and founder. I’m exploring full-time roles in business development and product starting Summer 2026, especially roles that sit close to systems, decisions, and execution.
            </p>
          </div>

          <div className="reveal">
            <OverviewPanel />
          </div>
        </div>

        <style>{`@media (max-width: 920px) { .overview-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </div>
    </section>
  );
}

export function StoryPage() {
  return (
    <section id="story" style={{ padding: "148px 0 104px" }}>
      <div className="container">
        <SectionHeader
          num="I"
          tag="The Story"
          title={<>From a factory floor in Germany to Berkeley<div className="about-sub" style={{ fontSize: "clamp(18px, 3vw, 30px)", color: "var(--ink-2)", marginTop: 14, letterSpacing: 0, fontFamily: "inherit" }}>Turning complex systems into clear decisions.</div></>}
          titleStyle={{ width: "100%", maxWidth: 880, fontSize: "clamp(32px, 5.5vw, 60px)" }}
        />
        <StoryColumn paragraphs={STORY_PARAGRAPHS} />
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" style={{ padding: "148px 0 96px", background: "var(--paper-2)" }}>
      <div className="container">
        <SectionHeader num="II" tag="Experience" title={<>What I <em style={{ color: "var(--accent)" }}>owned</em>, what I <em style={{ color: "var(--accent)" }}>built</em>, what changed because of it.</>} lede={"\n"} />

        <div className="reveal">
          {EXPERIENCE.map((experience) => (
            <div
              key={experience.id}
              style={{
                display: "grid",
                gridTemplateColumns: "176px 1fr 1fr",
                gap: 36,
                padding: "40px 0",
                borderTop: "1px solid var(--line)",
              }}
              className="exp-row"
            >
              <div>
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{experience.period}</div>
                <div style={{ marginTop: 10 }}>
                  <div className="serif" style={{ fontSize: 26, lineHeight: 1.08 }}>{experience.company}</div>
                  <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 5 }}>{experience.role}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--muted-2)", marginTop: 10 }}>{experience.place}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateRows: "auto auto", gap: 18 }}>
                <ExpBlock label="Owned" body={experience.owned} />
                <ExpBlock label="Built" body={experience.built} />
              </div>

              <div style={{ display: "grid", gridTemplateRows: "1fr auto", gap: 18 }}>
                <ExpBlock label="What changed" body={experience.changed} emph />
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {experience.tags.map((tag) => (
                    <span key={tag} className="mono" style={{ fontSize: 10, padding: "4px 8px", border: "1px solid var(--line-2)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em" }}>
                      {tag}
                    </span>
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

export function Writing() {
  return (
    <section id="writing" style={{ padding: "148px 0 92px", background: "var(--paper-2)" }}>
      <div className="container">
        <SectionHeader
          num="IV"
          tag="Writing"
          title={<>Published <em style={{ color: "var(--accent)" }}>for Intertrust</em>.</>}
          lede="Two pieces translating proprietary modeling work into the industry conversation at RE+ and Distributech. External links open on intertrust.com."
        />

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {WRITING.map((writing, index) => (
            <a
              key={index}
              href={writing.href}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                padding: 30,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "border-color .25s ease, transform .25s ease, box-shadow .25s ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor = "var(--accent)";
                event.currentTarget.style.transform = "translateY(-2px)";
                event.currentTarget.style.boxShadow = "0 22px 40px rgba(20,19,17,0.08)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor = "var(--line)";
                event.currentTarget.style.transform = "none";
                event.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--muted)" }}>{writing.pub}</span>
                <span className="mono" style={{ fontSize: 10, letterSpacing: ".1em", color: "var(--muted-2)" }}>{writing.date}</span>
              </div>

              <div className="serif" style={{ fontSize: 26, lineHeight: 1.2, color: "var(--ink)" }}>{writing.title}</div>

              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)" }}>{writing.excerpt}</p>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
                {writing.tags.map((tag) => (
                  <span key={tag} className="mono" style={{ fontSize: 10, padding: "3px 8px", border: "1px solid var(--line-2)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px dashed var(--line)" }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>{writing.role}</span>
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

export function Skills() {
  return (
    <section id="skills" style={{ padding: "148px 0 64px" }}>
      <div className="container">
        <SectionHeader num="V" tag="Skills" title={<span style={{ width: "100%", maxWidth: 1000, display: "inline-block" }}>The skill stack — <em style={{ color: "var(--accent)" }}>analytical</em>, <em style={{ color: "var(--accent)" }}>product</em>, <em style={{ color: "var(--accent)" }}>strategic</em>, <em style={{ color: "var(--accent)" }}>AI</em>.</span>} />

        <div className="reveal toolkit-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line)" }}>
          {SKILLS.map((skill, index) => (
            <div
              key={skill.group}
              style={{
                padding: 28,
                borderLeft: index > 0 ? "1px solid var(--line)" : "0",
                background: index % 2 === 1 ? "var(--card)" : "transparent",
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 12 }}>{`0${index + 1} · ${skill.group}`}</div>
              <div className="serif" style={{ fontSize: 26, lineHeight: 1.15, marginBottom: 20 }}>{skill.blurb}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {skill.items.map((item) => (
                  <li key={item} className="mono" style={{ fontSize: 12, padding: "6px 0", borderTop: "1px dashed var(--line)", color: "var(--ink-2)" }}>
                    {item}
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

export function Principles() {
  return (
    <section id="thinking" style={{ padding: "0 0 92px", background: "var(--paper-2)" }}>
      <div className="container">
        <SectionHeader num="VI" tag="How I Think" title={<>Six operating <em style={{ color: "var(--accent)" }}>principles</em>.</>} lede="Distilled from the projects above. These are the things I'll say in a meeting before I've thought about whether to say them." />

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {PRINCIPLES.map((principle) => (
            <div key={principle.n} style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: 28, position: "relative" }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--muted-2)", letterSpacing: ".2em", marginBottom: 14 }}>{principle.n}</div>
              <div className="serif" style={{ fontSize: 24, lineHeight: 1.2, color: "var(--ink)", marginBottom: 14 }}>"{principle.title}"</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)" }}>{principle.body}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 780px) { #thinking .reveal { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" style={{ padding: "120px 0 72px" }}>
      <div className="container">
        <div className="rule">
          <span className="tag">Let's talk</span>
        </div>

        <div className="reveal" style={{ padding: "40px 0 0", borderTop: "1px solid var(--line)" }}>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(44px, 6.4vw, 96px)",
              lineHeight: 0.98,
              margin: 0,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              textWrap: "balance",
              maxWidth: 1100,
            }}
          >
            I'm always open to conversations around <em style={{ color: "var(--accent)" }}>product</em>, <em style={{ color: "var(--accent)" }}>strategy</em>, and building better <em style={{ color: "var(--accent)" }}>decision systems</em> — let's find a time to connect.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 60, alignItems: "end" }} className="contact-grid">
            <div>
              <a href={`mailto:${PROFILE.email}`} className="serif" style={{ fontSize: 32, color: "var(--ink)", borderBottom: "1px solid var(--line-2)", display: "inline-block", paddingBottom: 4 }}>
                {PROFILE.email}
              </a>
              <div style={{ display: "flex", gap: 24, marginTop: 20, flexWrap: "wrap" }}>
                <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>LinkedIn ↗</a>
                <a href={`tel:${PROFILE.phone}`} className="mono" style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>{PROFILE.phone}</a>
                <span className="mono" style={{ fontSize: 12, color: "var(--muted-2)" }}>{PROFILE.location}</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Timezone: PST · Berkeley</div>
            </div>
          </div>
        </div>

        <style>{`@media (max-width: 780px) { .contact-grid { grid-template-columns: 1fr !important; } .contact-grid > div:last-child { text-align: left !important; } }`}</style>
      </div>
    </section>
  );
}
