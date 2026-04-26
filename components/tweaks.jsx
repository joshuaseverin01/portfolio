import React from "react";

// ============================================================
// Tweaks panel
// ============================================================

export const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  accent: "forest",
  headline: 0,
  theme: "light",
  density: 1,
  motion: 1,
}/*EDITMODE-END*/;

const ACCENTS = {
  forest: { c: "#1f3a2e", c2: "#2f6f4e", soft: "#d9e6db", label: "Forest" },
  ink: { c: "#141311", c2: "#2a2722", soft: "#e6e1d7", label: "Graphite" },
  oxblood: { c: "#6b1d1d", c2: "#8f2b2b", soft: "#efd8d8", label: "Oxblood" },
  cobalt: { c: "#1a3a6e", c2: "#2b5a9e", soft: "#d6e0f1", label: "Cobalt" },
  amber: { c: "#8c5a17", c2: "#b57a2a", soft: "#f0e1c9", label: "Amber" },
};

export function applyTweaks(tweaks) {
  const root = document.documentElement;
  const accent = ACCENTS[tweaks.accent] || ACCENTS.forest;
  root.style.setProperty("--accent", accent.c);
  root.style.setProperty("--accent-2", accent.c2);
  root.style.setProperty("--accent-soft", accent.soft);
  root.setAttribute("data-theme", tweaks.theme);
  root.setAttribute("data-motion", tweaks.motion ? "1" : "0");
  root.style.setProperty("--density", String(tweaks.density));
  window.__headline = tweaks.headline;
  window.dispatchEvent(new CustomEvent("headline-change", { detail: tweaks.headline }));
}

export default function TweaksPanel() {
  const [open, setOpen] = React.useState(false);
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyTweaks(tweaks);
  }, [tweaks]);

  React.useEffect(() => {
    const onMessage = (event) => {
      if (!event.data || !event.data.type) return;
      if (event.data.type === "__activate_edit_mode") setOpen(true);
      if (event.data.type === "__deactivate_edit_mode") setOpen(false);
    };

    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const update = (key, value) => {
    const next = { ...tweaks, [key]: value };
    setTweaks(next);
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: value } }, "*");
    } catch (error) {
      // Ignore cross-origin messaging issues outside edit mode.
    }
  };

  return (
    <div className={`tweaks-panel ${open ? "open" : ""}`}>
      <h4>
        <span>Tweaks</span>
        <button onClick={() => setOpen(false)} style={{ color: "var(--muted)", fontSize: 14 }}>×</button>
      </h4>

      <div className="tweak-row">
        <label>Accent</label>
        <div className="swatches">
          {Object.entries(ACCENTS).map(([key, value]) => (
            <div
              key={key}
              title={value.label}
              onClick={() => update("accent", key)}
              className={`swatch${tweaks.accent === key ? " on" : ""}`}
              style={{ background: value.c }}
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
          ].map((label, index) => (
            <button
              key={index}
              onClick={() => update("headline", index)}
              className={tweaks.headline === index ? "on" : ""}
              style={{ textAlign: "left", padding: "7px 10px" }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Theme</label>
        <div className="seg">
          <button onClick={() => update("theme", "light")} className={tweaks.theme === "light" ? "on" : ""}>Light</button>
          <button onClick={() => update("theme", "dark")} className={tweaks.theme === "dark" ? "on" : ""}>Dark</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Density</label>
        <div className="seg">
          <button onClick={() => update("density", 0.85)} className={tweaks.density === 0.85 ? "on" : ""}>Compact</button>
          <button onClick={() => update("density", 1)} className={tweaks.density === 1 ? "on" : ""}>Normal</button>
          <button onClick={() => update("density", 1.15)} className={tweaks.density === 1.15 ? "on" : ""}>Spacious</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Motion</label>
        <div className="seg">
          <button onClick={() => update("motion", 1)} className={tweaks.motion === 1 ? "on" : ""}>On</button>
          <button onClick={() => update("motion", 0)} className={tweaks.motion === 0 ? "on" : ""}>Off</button>
        </div>
      </div>
    </div>
  );
}
