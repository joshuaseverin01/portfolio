// ============================================================
// Data — content source of truth
// ============================================================

export const PROFILE = {
  name: "Joshua Severin",
  tagline: "Operator at the intersection of energy markets and product.",
  sub: "UC Berkeley Economics '26. Currently modeling battery-storage economics and VPP integration strategy for utilities at Intertrust Technologies. Previously built a youth-sports operating system from zero. I build systems that turn data into decisions.",
  introTitle: "UC Berkeley Economics | Business Development & Product",
  introBio: "I build models, systems, and products that turn complex data into clearer decisions.",
  location: "Berkeley, CA",
  origin: "Saarland, Germany",
  email: "joshuaseverin@berkeley.edu",
  linkedin: "linkedin.com/in/joshua-severin",
  headshot: "/images/JS_headshot.png",
  phone: "669-290-8409",
};

export const EXPERIENCE = [
  {
    id: "intertrust",
    period: "Jun 2025 — Present",
    company: "Intertrust Technologies",
    role: "Product Management · Business Development",
    place: "Berkeley, CA",
    owned: "Financial viability modeling for distributed energy resources across US ISO markets; strategic content for utility clients.",
    built: "60k+ hours of RTM data ingested across ERCOT, PJM, CAISO · geospatial R pipeline with time-series animation · Constraint Cancellation Matrix for RWE's $1B+ portfolio · 30+ page strategic memorandum on C&I VPP integration.",
    changed: "Redirected capital allocation for Tier-1 utility stakeholders by surfacing a 68.9% revenue variance across PJM zones. Presented findings at RE+ 2025 Las Vegas. Material entered executive decision pipeline at RWE.",
    tags: ["Energy Markets", "DER/VPP", "R · Geospatial", "Executive Comms"],
  },
  {
    id: "pitchpoint",
    period: "Jan 2026 — Present",
    company: "PitchPoint",
    role: "Founder · Full-Stack Engineer",
    place: "Berkeley, CA",
    owned: "Product architecture, GTM wedge, pilot deployment, technical due diligence materials.",
    built: "React/TS platform · 16-table Supabase schema w/ RLS · role-aware PWA for 160+ virtual profiles · RAG-based AI concierge · 'Guest Sandbox' for zero-risk investor demos.",
    changed: "Live pilot at UC Berkeley (60+ athletes, 100% adoption). Bundle size down 35% (527 kB). 80% of technical stakeholder questions automated.",
    tags: ["React · TypeScript", "Supabase · RLS", "RAG / LLM", "GTM Strategy"],
  },
  {
    id: "sfelite",
    period: "Jun 2024 — Jun 2025",
    company: "SF Elite Academy ",
    role: "Operations Lead · Head Coach",
    place: "Bay Area, CA",
    owned: "Revenue line ownership, field procurement, client retention for a $2.5M revenue organization.",
    built: "Restructured OpEx model · launched 'Specialized Training' product line · renewal workflow for 60+ high-value families ($300k ARR).",
    changed: "15% annual OpEx reduction. 50% QoQ growth on new product line within 3 months. 100% renewal rate on the high-value cohort.",
    tags: ["Revenue Ops", "Client Retention", "P&L"],
  },
  {
    id: "festo",
    period: "Oct 2019 — Jan 2021",
    company: "Festo SE & Co. KG",
    role: "Industrial Logistics & Production",
    place: "Saarland, Germany",
    owned: "Shift-based production and logistics for Tier-1 automotive OEMs.",
    built: "Component flow for BMW, Mercedes-Benz, and Audi engines under lean manufacturing frameworks.",
    changed: "Maintained 100% quality integrity across rigorous industrial timelines.",
    tags: ["Industrial Ops", "Lean Manufacturing"],
  },
];

export const PROJECTS = [
  {
    id: "rwe",
    idx: "01",
    title: "C&I VPP Integration Strategy",
    client: "RWE AG · German utility, €12B+ trading book",
    tagline: "Quantifying integration alpha for a vertically-integrated utility.",
    problem:
      "Renewable intermittency, thermal fleet rigidities, and tightening collateral constraints were creating structural value leakage across RWE's generation and trading portfolio. Standalone aggregation doesn't cancel these constraints — vertical integration might.",
    approach: [
      "Mapped every portfolio-level constraint (forecast error, min-load, ramp rate, reserve opportunity cost, outage risk, redispatch exposure) to the VPP response that neutralizes it — a Constraint Cancellation Matrix.",
      "Modeled the statistical properties of aggregation: forecast-error netting, firmness uplift via law of large numbers, and the 300MW+ scale threshold where single-site failures stop dominating aggregate performance.",
      "Framed the VPP as a real-option layer on top of thermal and renewable books, not a standalone aggregation P&L.",
    ],
    output:
      "30+ page strategic memorandum covering intra-VPP portfolio effects, generation-fleet synergies, and trading-book impact (VaR, intraday alpha, forecast-error monetization, collateral efficiency).",
    impact:
      "Constraint Cancellation Matrix entered executive decision-making for ROCE optimization across the €1B+ flexibility portfolio.",
    tags: ["Strategy Memo", "DER · VPP", "Capital Efficiency", "Executive"],
    accent: "signal",
  },
  {
    id: "flexworks-dashboard",
    idx: "02",
    title: "Flexworks Arbitrage Intelligence Dashboard",
    client: "Flexworks internal product · PJM zone-level market intelligence",
    tagline: "A local-first Streamlit analytics platform that transforms battery arbitrage simulation exports into investment-ready market intelligence.",
    problem:
      "The original workflow required cleaning messy Flexworks simulation exports, reshaping wide-format monthly revenue tables, mapping results to ISO/RTO geographies, and assembling consulting-style summaries by hand. The insight was valuable, but the process took days and was prone to inconsistency.",
    approach: [
      "Built a local-first Streamlit workflow that ingests Flexworks-style CSV exports, optional device-to-zone mapping files, and zone GeoJSON, with schema detection, validation, currency parsing, and wide-to-long reshaping.",
      "Computed zone-level metrics including revenue per kW, annualized revenue, volatility, opportunity scores, risk labels, cumulative revenue over time, and ranked high-opportunity versus high-risk locations.",
      "Designed a PJM-focused product layer with matplotlib polygon maps, ranked bars, snapshot and time-range views, multi-snapshot comparisons, animation playback, deterministic executive summaries, and export workflows for CSV, PNG, GIF, and markdown outputs.",
    ],
    output:
      "A modular analytics application with bundled demo data, guided Run Analysis workflow, geospatial PJM visualization, temporal market views, and executive-ready export tooling for strategy and investment evaluation.",
    impact:
      "Automated a multi-day internship workflow into a repeatable market-intelligence product that converts raw arbitrage simulation outputs into decision-ready insights in minutes.",
    tags: ["Python · Streamlit", "Pandas · Plotly", "GeoJSON · Matplotlib", "Energy Analytics"],
    accent: "accent",
  },
  {
    id: "iso-benchmark",
    idx: "03",
    title: "Zonal Battery Revenue — ERCOT · PJM · CAISO",
    client: "Intertrust Flexworks · Utility and developer clients",
    tagline: "Same battery, different zip code. Quantifying where location wins.",
    problem:
      "Tier-1 utilities routinely deploy identical battery configurations across zones without quantifying how much of the revenue is driven purely by location. Capital was being allocated on instinct, not on basis-point spread.",
    approach: [
      "Ran identical 13.5 kWh configurations across 21 PJM zones, 6 ERCOT load zones, and CAISO — holding every variable constant except geography.",
      "Rolling optimization against real-time market prices (no perfect-foresight assumption), weekly recalculation against forecast signals.",
      "Geospatial R pipeline joining GeoJSON zones to simulation outputs, animated via time-series interpolation for executive review.",
    ],
    output:
      "Zonal revenue atlas with $/kW-year maps and volatility overlays. Translated into a corporate article decoding RTM behavior for non-technical stakeholders.",
    impact:
      "Surfaced a 68.9% revenue variance across PJM zones — BGE ($49.87/kW-yr) vs PSEG ($29.53/kW-yr). Redirected capital allocation conversations for Tier-1 utilities.",
    tags: ["BESS Modeling", "R · sf · ggplot2", "ISO/RTM", "Spatial Analysis"],
    accent: "accent",
    hasMap: true,
  },
  {
    id: "re-plus",
    idx: "04",
    title: "Value-Stack Gap Analysis",
    client: "Flexworks positioning · RE+ 2025, Las Vegas",
    tagline: "Most DER owners capture arbitrage and walk away. The rest of the stack is on the table.",
    problem:
      "DER operators were systematically under-monetizing their assets — capturing energy arbitrage but ignoring capacity, ancillary services, and demand response. The industry talked about value stacking; nobody was quantifying the gap.",
    approach: [
      "Decomposed the full DER value stack into four monetizable streams and mapped which ones each operator archetype (utility, developer, VPP operator) was actually capturing.",
      "Built volatility metrics (rolling σ) across EPEX, Ember, and ISO datasets to show how much upside was left on the table during high-volatility windows.",
      "Positioned Flexworks as the quantification layer — pre-deployment, not post-mortem.",
    ],
    output:
      "Blog narrative published for RE+ 2025 launch. Executive-facing deck showing under-optimization magnitude by archetype.",
    impact:
      "Findings presented at RE+ Las Vegas. Positioned Flexworks against the incumbent consultant-timeline alternative (months → minutes).",
    tags: ["Thought Leadership", "Market Positioning", "Event Activation"],
    accent: "accent",
  },
  {
    id: "ot-security",
    idx: "05",
    title: "Energy OT Security in a DER-Dominated Grid",
    client: "Intertrust internal strategy · Europe-focused",
    tagline: "The attack surface of decentralization.",
    problem:
      "As European grids shift to distributed energy resources, the security perimeter fragments from dozens of thermal plants to thousands of endpoints. Existing OT security frameworks were built for the old topology.",
    approach: [
      "Forensic case study on the Poland electrical infrastructure cyberattack — what made it possible, what generalizes.",
      "Evaluated AI-driven threat detection architectures for OT environments (unsupervised anomaly detection on telemetry streams).",
      "Mapped cyber-threat liability to capital allocation — where the insurance math breaks as DER penetration rises.",
    ],
    output:
      "Strategy paper and executive presentation: 'Strengthening Energy OT Security in a DER-Dominated Europe — The Role of AI.'",
    impact:
      "Provided a framework for securing decentralized infrastructure and neutralizing AI cyber-threat liabilities for cross-border market expansion.",
    tags: ["OT Security", "AI · Anomaly Detection", "Strategic Framework"],
    accent: "signal",
  },
  {
    id: "pitchpoint-proj",
    idx: "06",
    title: "PitchPoint — Club Operating System",
    client: "UC Berkeley pilot · 3 teams, 160+ profiles",
    demoNote: "Try the PitchPoint demo here.",
    demoLabel: "Launch Demo ↗",
    demoHref: "https://pitchpointsoccer.vercel.app/demo",
    tagline: "Replacing five tools with one role-aware PWA.",
    problem:
      "Competitive youth soccer clubs run on five disconnected tools — GroupMe, Google Sheets, TeamSnap, paper feedback, verbal coordination. Data silos mean coaches can't see cross-team attendance, parents can't find games, and club admins have no operational view.",
    approach: [
      "Single source of truth: one Supabase PostgreSQL instance, RLS-enforced at the database layer — not hidden in UI.",
      "Wedge strategy: FIFA-style Team of the Week engine and role-aware dashboards bypass enterprise integration friction entirely.",
      "Guest Sandbox: two independent permission layers (client gate + database RESTRICTIVE policy) let investors explore without contaminating production.",
    ],
    output:
      "Production React/TS PWA. 16-table schema, RAG-based AI concierge, live league-standings sync via Edge Functions, 35% bundle reduction via route-level code splitting.",
    impact:
      "100% pilot adoption across 60+ athletes. Architecture ready for multi-tenant rollout across the $19B youth/collegiate sports market.",
    tags: ["Founder", "React · Supabase", "Multi-tenant", "GTM Wedge"],
    accent: "accent",
  },
  {
    id: "inboxcast",
    idx: "07",
    title: "InboxCast — AI Inbox & Calendar Briefing Platform",
    client: "Private beta MVP · Gmail + Google Calendar decision layer",
    tagline: "Turning inbox and calendar overload into a voice-first morning operating system.",
    problem:
      "Inbox triage is still fragmented and visual. Busy users have to scan Gmail, check Calendar, separate urgent items from noise, and move into replies or planning across multiple tools, especially during mobile moments when reading and context-switching are slower.",
    approach: [
      "Built a mobile-first product layer above Gmail and Google Calendar, using Google OAuth, server-side context fetching, and structured AI briefing workflows instead of replacing the inbox itself.",
      "Designed a repeatable morning workflow: fetch recent inbox and calendar context, generate a written briefing, optionally convert it into audio, then support follow-up reasoning, selected full-email reading, reply drafting, and Gmail draft creation.",
      "Added product infrastructure around the core AI flow, including onboarding, morning presets, Outputs, browser-side PDF export, tap-to-talk voice commands, and private beta usage guardrails for trusted testing.",
    ],
    output:
      "A deployed Next.js private-beta MVP that produces calm written and audio briefings from Gmail and Google Calendar context, then turns them into decision support, follow-up Q&A, and draft-ready action flows.",
    impact:
      "Converted a fragmented email and calendar workflow into a repeatable AI product that bridges quantitative reasoning, user experience, and action-oriented productivity automation.",
    tags: ["AI Product", "Next.js · TypeScript", "Google OAuth", "Voice Workflow"],
    accent: "signal",
  },
];

export const SKILLS = [
  {
    group: "Analytical",
    blurb: "\n",
    items: [
      "R — sf, ggplot2, tidyverse, lubridate",
      "Financial modeling — BESS, VPP, capture prices",
      "Rolling optimization · arbitrage modeling",
      "Geospatial analysis · time-series interpolation",
      "Excel — advanced modeling",
      "SQL — PostgreSQL 15",
      "Python",
    ],
  },
  {
    group: "Product",
    blurb: "\n",
    items: [
      "Roadmapping · stakeholder alignment",
      "Product architecture — multi-tenant, role-aware",
      "User research · pilot design",
      "Figma · prototyping",
      "React 18 · TypeScript · Tailwind · shadcn/ui",
      "Supabase (RLS, Auth) · TanStack Query · Vercel",
    ],
  },
  {
    group: "Strategy",
    blurb: "\n",
    items: [
      "Market entry · competitive benchmarking",
      "Revenue forecasting · ROCE optimization",
      "Strategic frameworks (e.g. Constraint Cancellation)",
      "Executive memos · C-level comms",
      "GTM wedge design · pipeline management",
      "Constraint cancellation · decision memos",
    ],
  },
  {
    group: "AI",
    blurb: "\n",
    items: [
      "AI research · LLM evaluation",
      "Agentic workflows · tool-use orchestration",
      "Prompt engineering · system design",
      "RAG pipelines · vector search · embeddings",
      "AI-assisted development (Claude, Cursor, Codex)",
    ],
  },
];

export const PRINCIPLES = [
  {
    n: "01",
    title: "Good models don't predict perfectly. They reduce uncertainty enough to change the decision.",
    body: "If a forecast isn't shifting the bid, the allocation, or the deployment, it's narrative. In energy markets, cutting the standard deviation of a position matters more than pinpointing the mean.",
  },
  {
    n: "02",
    title: "Aggregation is the strategy, not an implementation detail.",
    body: "The RWE memo is really one idea: disparate small assets, pooled with discipline, behave like a single firm asset — and that firmness is a product you can sell. This holds well beyond energy.",
  },
  {
    n: "03",
    title: "Most teams launch before quantifying value.",
    body: "A $49.87/kW-yr zone and a $29.53/kW-yr zone look identical in a deck. The number is the deck. Before the product, the pilot, the pitch — quantify the spread.",
  },
  {
    n: "04",
    title: "Write for the executive who will read the first paragraph and the last.",
    body: "Executive memos aren't compressed versions of technical papers. They're different documents. If the thesis isn't defensible in three sentences, it isn't defensible.",
  },
  {
    n: "05",
    title: "Build the system you wish the org had, then let people use it.",
    body: "PitchPoint wasn't a product idea. It was an operating system I needed as a coach. The best products are artifacts of the author's dissatisfaction.",
  },
  {
    n: "06",
    title: "Respect the constraint before you optimize around it.",
    body: "Thermal ramp rates, forecast error, row-level security, a parent's free hour on Saturday morning — the design is downstream of what can't change. Skip this step and you've built something clever but wrong.",
  },
];

export const WRITING = [
  {
    title: "Are VPPs Leaving Money on the Table? Capturing the Full Value Stack",
    pub: "Intertrust · Blog",
    date: "10 Dec 2025",
    href: "https://www.intertrust.com/blog/are-vpps-leaving-money-on-the-table-capturing-the-full-value-stack/",
    excerpt: "Most VPP operators deploy equipment before quantifying where the value actually lives — capturing energy arbitrage and ignoring capacity, ancillary services, and frequency regulation. A case for analytics-first VPP strategy, using Flexworks to quantify the full value stack before a single device is connected.",
    role: "Co-authored · analysis & positioning",
    tags: ["VPP", "Value Stacking", "Strategy"],
  },
  {
    title: "What ERCOT Battery Revenue Can Teach Us — Location Is Everything",
    pub: "Intertrust · Blog",
    date: "11 Nov 2025",
    href: "https://www.intertrust.com/blog/what-ercot-battery-revenue-can-teach-us-location-is-everything/",
    excerpt: "60,000+ simulated hours per zone across six ERCOT load zones, 2018 through mid-2025. Same 13.5 kWh battery, same strategy. West Texas delivered $66.31/kW-yr vs $55.07/kW-yr in South — a 20% spread that compounds meaningfully over program lifetime. The underlying analysis behind the zonal bars elsewhere on this site.",
    role: "Simulation · modeling · data viz",
    tags: ["ERCOT", "BESS Modeling", "Spatial Analysis"],
  },
];
