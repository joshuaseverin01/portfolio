// ============================================================
// App — composition root
// ============================================================

const PROFILE_CARD_STORAGE_KEY = "hasSeenProfileCard";

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

function App() {
  useReveal();
  const [showProfileIntro, setShowProfileIntro] = React.useState(() => {
    try {
      return window.localStorage.getItem(PROFILE_CARD_STORAGE_KEY) !== "true";
    } catch (error) {
      return true;
    }
  });

  // Re-run reveal observer after projects toggle, in case newly-revealed items
  React.useEffect(() => {
    const t = setInterval(() => {
      document.querySelectorAll(".reveal:not(.is-in)").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) el.classList.add("is-in");
      });
    }, 500);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    if (showProfileIntro) {
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      root.style.overflow = "";
      body.style.overflow = "";
    }

    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [showProfileIntro]);

  function closeProfileIntro() {
    try {
      window.localStorage.setItem(PROFILE_CARD_STORAGE_KEY, "true");
    } catch (error) {
      // Ignore storage failures and still dismiss for the current page load.
    }
    setShowProfileIntro(false);
  }

  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Writing />
      <Skills />
      <Contact />
      <TweaksPanel />
      <ProfileIntroModal open={showProfileIntro} onClose={closeProfileIntro} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
