import React from "react";
import ProfileIntroModal from "./profile-intro.jsx";
import Projects from "./projects.jsx";
import { About, Contact, Experience, Hero, Nav, Skills, Writing } from "./sections.jsx";
import TweaksPanel from "./tweaks.jsx";

// ============================================================
// App — composition root
// ============================================================

const PROFILE_CARD_STORAGE_KEY = "hasSeenProfileCard";

function useReveal() {
  React.useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Cursor() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (window.matchMedia("(hover: none)").matches) return undefined;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let visible = false;

    const onMove = (event) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!visible) {
        element.style.opacity = 0.9;
        visible = true;
      }
    };

    const onLeave = () => {
      element.style.opacity = 0;
      visible = false;
    };

    const onEnterLink = () => {
      element.style.width = "28px";
      element.style.height = "28px";
    };

    const onLeaveLink = () => {
      element.style.width = "8px";
      element.style.height = "8px";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const interactive = document.querySelectorAll("a, button");
    interactive.forEach((node) => {
      node.addEventListener("mouseenter", onEnterLink);
      node.addEventListener("mouseleave", onLeaveLink);
    });

    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      element.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      interactive.forEach((node) => {
        node.removeEventListener("mouseenter", onEnterLink);
        node.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return <div className="cursor-dot" ref={ref} />;
}

export default function App() {
  useReveal();

  const [showProfileIntro, setShowProfileIntro] = React.useState(() => {
    try {
      return window.localStorage.getItem(PROFILE_CARD_STORAGE_KEY) !== "true";
    } catch (error) {
      return true;
    }
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      document.querySelectorAll(".reveal:not(.is-in)").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) element.classList.add("is-in");
      });
    }, 500);

    return () => clearInterval(timer);
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
