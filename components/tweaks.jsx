// ============================================================
// Tweaks panel
// ============================================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "forest",
  "headline": 0,
  "theme": "light",
  "density": 1,
  "motion": 1
}/*EDITMODE-END*/;

const ACCENTS = {
  forest:  { c: "#1f3a2e", c2: "#2f6f4e", soft: "#d9e6db", label: "Forest" },
  ink:     { c: "#141311", c2: "#2a2722", soft: "#e6e1d7", label: "Graphite" },
  oxblood: { c: "#6b1d1d", c2: "#8f2b2b", soft: "#efd8d8", label: "Oxblood" },
  cobalt:  { c: "#1a3a6e", c2: "#2b5a9e", soft: "#d6e0f1", label: "Cobalt" },
  amber:   { c: "#8c5a17", c2: "#b57a2a", soft: "#f0e1c9", label: "Amber" },
};

function applyTweaks(t) {
  const root = document.documentElement;
  const a = ACCENTS[t.accent] || ACCENTS.forest;
  root.style.setProperty("--accent", a.c);
  root.style.setProperty("--accent-2", a.c2);
  root.style.setProperty("--accent-soft", a.soft);
  root.setAttribute("data-theme", t.theme);
  root.setAttribute("data-motion", t.motion ? "1" : "0");
  root.style.setProperty("--density", String(t.density));
  window.__headline = t.headline;
  window.dispatchEvent(new CustomEvent("headline-change", { detail: t.headline }));
}

function TweaksPanel() {
  const [open, setOpen] = React.useState(false);
  const [t, setT] = React.useState(TWEAK_DEFAULTS);

  React.useEffect(() => { applyTweaks(t); }, [t]);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || !e.data.type) return;
      if (e.data.type === "__activate_edit_mode") setOpen(true);
      if (e.data.type === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    // announce availability after listener is set
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const update = (k, v) => {
    const next = { ...t, [k]: v };
    setT(next);
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
    } catch (e) {}
  };

  return (
    <div className={"tweaks-panel " + (open ? "open" : "")}>
      <h4>
        <span>Tweaks</span>
        <button onClick={() => setOpen(false)} style={{ color: "var(--muted)", fontSize: 14 }}>×</button>
      </h4>

      <div className="tweak-row">
        <label>Accent</label>
        <div className="swatches">
          {Object.entries(ACCENTS).map(([k, v]) => (
            <div key={k}
              title={v.label}
              onClick={() => update("accent", k)}
              className={"swatch" + (t.accent === k ? " on" : "")}
              style={{ background: v.c }}
            />
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Headline</label>
        <div className="seg" style={{ flexDirection: "column", gap: 4, display: "grid" }}>
          {[
            "Operator · energy × product",
            "Data → decisions",
            "Quantify what others estimate",
            "Kilowatt-hours → capital",
          ].map((l, i) => (
            <button key={i} onClick={() => update("headline", i)} className={t.headline === i ? "on" : ""}
              style={{ textAlign: "left", padding: "7px 10px" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Theme</label>
        <div className="seg">
          <button onClick={() => update("theme", "light")} className={t.theme === "light" ? "on" : ""}>Light</button>
          <button onClick={() => update("theme", "dark")} className={t.theme === "dark" ? "on" : ""}>Dark</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Density</label>
        <div className="seg">
          <button onClick={() => update("density", 0.85)} className={t.density === 0.85 ? "on" : ""}>Compact</button>
          <button onClick={() => update("density", 1)} className={t.density === 1 ? "on" : ""}>Normal</button>
          <button onClick={() => update("density", 1.15)} className={t.density === 1.15 ? "on" : ""}>Spacious</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Motion</label>
        <div className="seg">
          <button onClick={() => update("motion", 1)} className={t.motion === 1 ? "on" : ""}>On</button>
          <button onClick={() => update("motion", 0)} className={t.motion === 0 ? "on" : ""}>Off</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TweaksPanel, applyTweaks, TWEAK_DEFAULTS });
