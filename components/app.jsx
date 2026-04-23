// ============================================================
// App — composition root
// ============================================================

function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Cursor() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, visible = false;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!visible) { el.style.opacity = 0.9; visible = true; }
    };
    const onLeave = () => { el.style.opacity = 0; visible = false; };
    const onEnterLink = () => { el.style.width = "28px"; el.style.height = "28px"; };
    const onLeaveLink = () => { el.style.width = "8px"; el.style.height = "8px"; };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.querySelectorAll("a, button").forEach(a => {
      a.addEventListener("mouseenter", onEnterLink);
      a.addEventListener("mouseleave", onLeaveLink);
    });
    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); document.removeEventListener("mouseleave", onLeave); };
  }, []);
  return <div className="cursor-dot" ref={ref} />;
}

function ThemeToggle() {
  const [dark, setDark] = React.useState(false);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  };
  return (
    <button className="theme-toggle" onClick={toggle} title="Toggle theme" aria-label="Toggle dark mode">
      {dark ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

function App() {
  useReveal();
  React.useEffect(() => {
    const t = setInterval(() => {
      document.querySelectorAll(".reveal:not(.is-in)").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) el.classList.add("is-in");
      });
    }, 500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Cursor />
      <Nav ThemeToggle={ThemeToggle} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Writing />
      <Skills />
      <Contact />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
