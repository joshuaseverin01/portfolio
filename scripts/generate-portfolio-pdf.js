/**
 * generate-portfolio-pdf.js
 * One-page portfolio overview PDF — Joshua Severin
 * Run:    node scripts/generate-portfolio-pdf.js
 * Output: public/Joshua_Severin_Portfolio_Overview.pdf
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const PDFDocument = require("pdfkit");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR  = path.join(__dirname, "..", "public");
const OUT_PATH = path.join(OUT_DIR, "Joshua_Severin_Portfolio_Overview.pdf");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Palette ────────────────────────────────────────────────────────────────────
const C = {
  bg:      "#F8F5F0",
  ink:     "#111111",
  ink2:    "#333333",
  muted:   "#777777",
  green:   "#4A7C59",
  greenLt: "#EBF2ED",
  rule:    "#D4CFC9",
};

// ── Content ────────────────────────────────────────────────────────────────────
const CONTENT = {
  name:    "Joshua Severin",
  tagline: "I build models behind real decisions.",
  role:    "UC Berkeley Economics  ·  Business Development & Product  ·  Summer 2026",
  intro:   "I'm exploring full-time roles in business development and product, starting in Summer 2026, where I can take ownership of meaningful problems and build systems that scale. Over the last year, I've worked on quantitative modeling and strategy projects at Intertrust Technologies, translating complex data into decision-ready insights. In parallel, I built PitchPoint, a youth sports operating system from scratch.",
  sections: [
    { label: "Overview — current direction and focus" },
    { label: "Story — how I got here" },
    { label: "Experience — operating and strategy work" },
    { label: "Projects — systems I've built" },
    { label: "Skills — tools and workflows" },
  ],
  proofPoints: [
    {
      title: "Intertrust Technologies",
      desc:  "Built decision models used in real capital allocation.",
    },
    {
      title: "Flexworks Arbitrage Dashboard",
      desc:  "Turned simulation workflows into a market intelligence product.",
    },
    {
      title: "PitchPoint",
      desc:  "Built a youth sports operating system from scratch.",
    },
    {
      title: "Cal Men's Club Soccer",
      desc:  "Led finance and operations for a large student-run organization at scale.",
    },
  ],
  url:      "joshuaseverin.vercel.app",
  urlFull:  "https://joshuaseverin.vercel.app",
  email:    "joshuaseverin@berkeley.edu",
  linkedin: "linkedin.com/in/joshuaseverin",
  phone:    "669-290-8409",
};

// ── Document ───────────────────────────────────────────────────────────────────
const doc = new PDFDocument({
  size:    "letter",   // 612 × 792 pt
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  info: {
    Title:   "Joshua Severin — Portfolio Overview",
    Author:  "Joshua Severin",
    Subject: "Portfolio Overview 2026",
  },
  compress: true,
});

const stream = fs.createWriteStream(OUT_PATH);
doc.pipe(stream);

const W  = 612;
const H  = 792;
const ML = 50;
const MR = 50;
const CW = W - ML - MR;   // 512 pt

// ── Helpers ────────────────────────────────────────────────────────────────────
function hRule(y, color = C.rule, h = 0.5) {
  doc.rect(ML, y, CW, h).fill(color);
}

function measure(text, width, font, size, lineGap = 2) {
  doc.font(font).fontSize(size);
  return doc.heightOfString(text, { width, lineGap });
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. BACKGROUND + TOP STRIP
// ══════════════════════════════════════════════════════════════════════════════
doc.rect(0, 0, W, H).fill(C.bg);
doc.rect(0, 0, W, 6).fill(C.green);

// ══════════════════════════════════════════════════════════════════════════════
// 2. HEADER
// ══════════════════════════════════════════════════════════════════════════════
let y = 28;

// Name — dominant headline
doc.font("Helvetica-Bold").fontSize(31).fillColor(C.ink)
   .text(CONTENT.name, ML, y, { lineBreak: false });
y += 42;

// Green accent rule
doc.rect(ML, y, CW, 2).fill(C.green);
y += 12;

// Tagline — visually prominent
doc.font("Helvetica").fontSize(15).fillColor(C.ink)
   .text(CONTENT.tagline, ML, y, { lineBreak: false });
y += 26;

// Role / meta line
doc.font("Helvetica").fontSize(10).fillColor(C.muted)
   .text(CONTENT.role, ML, y, { width: CW, lineBreak: false });
y += 22;

// ══════════════════════════════════════════════════════════════════════════════
// 3. INTRO (no label — removes resume feel)
// ══════════════════════════════════════════════════════════════════════════════
hRule(y);
y += 16;

const introH = measure(CONTENT.intro, CW, "Helvetica", 10.5, 4);
doc.font("Helvetica").fontSize(10.5).fillColor(C.ink2)
   .text(CONTENT.intro, ML, y, { width: CW, lineGap: 4 });
y += introH + 22;

// ══════════════════════════════════════════════════════════════════════════════
// 4. TWO-COLUMN SECTION
// ══════════════════════════════════════════════════════════════════════════════
hRule(y);
y += 18;

const COL_GAP  = 22;
const C1W      = 210;
const C2X      = ML + C1W + COL_GAP;
const C2W      = CW - C1W - COL_GAP;   // ≈ 280 pt
const COL_TOP_Y = y;

// ── LEFT: What I build ────────────────────────────────────────────────────────
doc.font("Helvetica-Bold").fontSize(8.5).fillColor(C.green)
   .text("WHAT I BUILD", ML, y, { characterSpacing: 1.1, lineBreak: false });

let leftY = y + 18;
for (const { label } of CONTENT.sections) {
  // Green square bullet
  doc.rect(ML, leftY + 4.5, 3.5, 3.5).fill(C.green);

  const labelH = measure(label, C1W - 10, "Helvetica", 9, 2);
  doc.font("Helvetica").fontSize(9).fillColor(C.ink)
     .text(label, ML + 10, leftY, { width: C1W - 10, lineGap: 2 });

  leftY += labelH + 11;
}

// ── RIGHT: Selected Work ───────────────────────────────────────────────────────
// Pre-measure card height
let cardInnerH = 18;
for (const { title, desc } of CONTENT.proofPoints) {
  const tH = measure(title, C2W - 14, "Helvetica-Bold", 9.5);
  const dH = measure(desc,  C2W - 14, "Helvetica",      8.5, 2);
  cardInnerH += tH + 3 + dH + 13;
}
const CARD_PAD = 11;
const cardH    = cardInnerH + CARD_PAD * 2;

doc.roundedRect(C2X - CARD_PAD, COL_TOP_Y - 5, C2W + CARD_PAD * 2, cardH + 5, 5)
   .fill(C.greenLt);

doc.font("Helvetica-Bold").fontSize(8.5).fillColor(C.green)
   .text("SELECTED WORK", C2X, y, { characterSpacing: 1.1, lineBreak: false });

let rightY = y + 18;
for (const { title, desc } of CONTENT.proofPoints) {
  // Dash prefix
  doc.font("Helvetica").fontSize(9).fillColor(C.green)
     .text("–", C2X, rightY, { lineBreak: false });

  const tH = measure(title, C2W - 14, "Helvetica-Bold", 9.5);
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(C.ink)
     .text(title, C2X + 12, rightY, { width: C2W - 14, lineBreak: false });

  const dH = measure(desc, C2W - 14, "Helvetica", 8.5, 2);
  doc.font("Helvetica").fontSize(8.5).fillColor(C.muted)
     .text(desc, C2X + 12, rightY + tH + 3, { width: C2W - 14, lineGap: 2 });

  rightY += tH + 3 + dH + 13;
}

y = Math.max(leftY, rightY) + 20;

// ══════════════════════════════════════════════════════════════════════════════
// 5. CALL TO ACTION
// ══════════════════════════════════════════════════════════════════════════════
hRule(y);
y += 18;

// Heading
doc.font("Helvetica-Bold").fontSize(11).fillColor(C.ink)
   .text("View full portfolio", ML, y, { lineBreak: false });
y += 19;

// URL — prominent accent color
doc.font("Helvetica-Bold").fontSize(16).fillColor(C.green)
   .text(CONTENT.url, ML, y, { lineBreak: false });
y += 28;

// Tagline
doc.font("Helvetica").fontSize(9.5).fillColor(C.muted)
   .text("Explore projects, systems, and work in detail.", ML, y, { width: CW, lineBreak: false });
y += 20;

// ══════════════════════════════════════════════════════════════════════════════
// 6. FOOTER BAND — contact only
// ══════════════════════════════════════════════════════════════════════════════
const FOOTER_H = 38;
const FOOTER_Y = H - FOOTER_H;

doc.rect(0, FOOTER_Y, W, FOOTER_H).fill(C.green);

const contactStr = `${CONTENT.email}  ·  ${CONTENT.linkedin}  ·  ${CONTENT.phone}`;
doc.font("Helvetica").fontSize(9).fillColor("#FFFFFF")
   .text(contactStr, 0, FOOTER_Y + 14, { width: W, align: "center", lineBreak: false });

// ── Finalize ───────────────────────────────────────────────────────────────────
doc.end();

stream.on("finish", () => {
  console.log("");
  console.log("  ✔  PDF generated successfully.");
  console.log(`     ${OUT_PATH}`);
  console.log("");
});

stream.on("error", (err) => {
  console.error("Error:", err);
  process.exit(1);
});
