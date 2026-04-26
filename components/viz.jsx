import { useEffect, useRef, useState } from "react";

// ============================================================
// Viz — ambient hero ticker + signature ISO zonal map
// ============================================================

export function AmbientTicker({ motion = 1 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pointCount = 192;

    function priceSeries(phase, amp, noise) {
      const arr = new Array(pointCount);
      for (let i = 0; i < pointCount; i += 1) {
        const x = i / pointCount;
        let v =
          Math.sin(x * Math.PI * 4 + phase) * 0.55 +
          Math.sin(x * Math.PI * 10 + phase * 1.3) * 0.22 +
          Math.sin(x * Math.PI * 20 + phase * 0.6) * 0.12;
        if ((i + Math.floor(phase * 6)) % 37 === 0) v += (Math.random() - 0.2) * 0.9;
        v += (Math.random() - 0.5) * noise;
        arr[i] = v * amp;
      }
      return arr;
    }

    function draw() {
      const t = (tRef.current += 0.004 * (motion ? 1 : 0));
      ctx.clearRect(0, 0, w, h);

      const rootStyles = getComputedStyle(document.documentElement);
      const line = rootStyles.getPropertyValue("--line-2").trim();
      const accent = rootStyles.getPropertyValue("--accent").trim();
      const signal = rootStyles.getPropertyValue("--signal").trim();
      const muted = rootStyles.getPropertyValue("--muted-2").trim();

      const padX = 0;
      const padY = 28;
      const innerH = h - padY * 2;
      const innerW = w - padX * 2;

      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      for (let i = 1; i < 6; i += 1) {
        const y = padY + (innerH / 6) * i;
        ctx.beginPath();
        ctx.moveTo(padX, y);
        ctx.lineTo(padX + innerW, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const price = priceSeries(t, 0.9, 0.03);
      const dispatch = priceSeries(t * 0.7 + 1.3, 0.55, 0.04);

      const path = new Path2D();
      path.moveTo(padX, padY + innerH * 0.55);
      for (let i = 0; i < pointCount; i += 1) {
        const x = padX + (i / (pointCount - 1)) * innerW;
        const y = padY + innerH * 0.55 - price[i] * innerH * 0.25;
        if (i === 0) path.moveTo(x, y);
        else path.lineTo(x, y);
      }
      const endX = padX + innerW;
      path.lineTo(endX, padY + innerH);
      path.lineTo(padX, padY + innerH);
      path.closePath();

      const gradient = ctx.createLinearGradient(0, padY, 0, padY + innerH);
      gradient.addColorStop(0, hexToRgba(accent, 0.1));
      gradient.addColorStop(1, hexToRgba(accent, 0));
      ctx.fillStyle = gradient;
      ctx.fill(path);

      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      for (let i = 0; i < pointCount; i += 1) {
        const x = padX + (i / (pointCount - 1)) * innerW;
        const y = padY + innerH * 0.55 - price[i] * innerH * 0.25;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = signal;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      for (let i = 0; i < pointCount; i += 1) {
        const x = padX + (i / (pointCount - 1)) * innerW;
        const y = padY + innerH * 0.45 - dispatch[i] * innerH * 0.18;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = muted;
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.fillText("RTM $/MWh", 4, padY - 10);
      ctx.textAlign = "right";
      ctx.fillText("DISPATCH SoC", w - 4, padY - 10);
      ctx.textAlign = "left";

      if (motion) rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [motion]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "").trim();
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return `rgba(30,60,45,${alpha})`;
}

export const ISO_DATA = {
  PJM: {
    title: "PJM — 21 planning zones, 13 states + DC",
    high: { name: "BGE", value: 49.87 },
    low: { name: "PSEG", value: 29.53 },
    spread: "68.9%",
    zones: [
      ["BGE", 49.87],
      ["COMED", 47.6],
      ["DAYTON", 45.2],
      ["AEP", 44.1],
      ["APS", 42.9],
      ["DEOK", 42.1],
      ["DOMINION", 41.4],
      ["DPL", 40.8],
      ["PEPCO", 40.0],
      ["PPL", 39.3],
      ["METED", 38.5],
      ["PENELEC", 37.6],
      ["ATSI", 36.8],
      ["JCPL", 35.7],
      ["PSEG", 29.53],
    ],
  },
  ERCOT: {
    title: "ERCOT — 6 load zones",
    high: { name: "WEST", value: 61.2 },
    low: { name: "NORTH", value: 42.4 },
    spread: "44.3%",
    zones: [
      ["WEST", 61.2],
      ["HOUSTON", 58.3],
      ["SOUTH", 55.6],
      ["CPS", 49.1],
      ["AUSTIN", 46.2],
      ["NORTH", 42.4],
    ],
  },
  CAISO: {
    title: "CAISO — primary trading hubs",
    high: { name: "SP15", value: 44.8 },
    low: { name: "NP15", value: 33.2 },
    spread: "34.9%",
    zones: [
      ["SP15", 44.8],
      ["ZP26", 41.5],
      ["NP15", 33.2],
    ],
  },
};

export function ZonalBars({ defaultIso = "PJM" }) {
  const [iso, setIso] = useState(defaultIso);
  const [hovered, setHovered] = useState(null);
  const data = ISO_DATA[iso];
  const max = Math.max(...data.zones.map((zone) => zone[1]));

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Battery Revenue / $kW-year</div>
          <div className="serif" style={{ fontSize: 28, lineHeight: 1.05 }}>{data.title}</div>
        </div>
        <div className="seg" style={{ minWidth: 220 }}>
          {Object.keys(ISO_DATA).map((key) => (
            <button key={key} className={iso === key ? "on" : ""} onClick={() => setIso(key)}>
              {key}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 28, alignItems: "stretch" }} className="zonal-grid">
        <div>
          {data.zones.map(([name, value], index) => {
            const pct = value / max;
            const isHigh = name === data.high.name;
            const isLow = name === data.low.name;
            const isHover = hovered === name;
            return (
              <div
                key={name}
                onMouseEnter={() => setHovered(name)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 80px",
                  alignItems: "center",
                  gap: 12,
                  padding: "5px 0",
                  borderBottom: "1px dashed var(--line)",
                  opacity: hovered && !isHover && !isHigh && !isLow ? 0.5 : 1,
                  transition: "opacity .2s ease",
                }}
              >
                <div className="mono" style={{ fontSize: 11, color: isHigh ? "var(--signal)" : isLow ? "var(--muted)" : "var(--ink-2)" }}>
                  {name}
                </div>
                <div style={{ position: "relative", height: 10, background: "var(--paper-2)" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: `${pct * 100}%`,
                      background: isHigh ? "var(--signal)" : isLow ? "var(--muted-2)" : "var(--accent)",
                      transition: "width .5s cubic-bezier(.2,.7,.2,1)",
                      transitionDelay: `${index * 20}ms`,
                    }}
                  />
                </div>
                <div className="mono" style={{ fontSize: 11, textAlign: "right", color: isHigh ? "var(--signal)" : "var(--ink-2)", fontWeight: isHigh || isLow ? 600 : 400 }}>
                  ${value.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Spread — top vs bottom</div>
            <div className="serif" style={{ fontSize: 56, lineHeight: 1, color: "var(--signal)" }}>{data.spread}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, maxWidth: 210 }}>
              Same 13.5 kWh battery. Same strategy. Same year. Only zip code changes.
            </div>
          </div>
          <div style={{ marginTop: 28 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Read</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
              <span style={{ width: 14, height: 6, background: "var(--signal)" }} />
              <span className="mono" style={{ fontSize: 11 }}>Top zone — {data.high.name}</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
              <span style={{ width: 14, height: 6, background: "var(--accent)" }} />
              <span className="mono" style={{ fontSize: 11 }}>Mid-pack</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ width: 14, height: 6, background: "var(--muted-2)" }} />
              <span className="mono" style={{ fontSize: 11 }}>Bottom — {data.low.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
