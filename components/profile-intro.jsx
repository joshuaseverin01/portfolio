// ============================================================
// Profile intro modal — first-visit glassmorphism card
// ============================================================

function resolveLinkedInHref(value) {
  const fallback = "https://www.linkedin.com/in/joshua-severin/";
  if (!value || typeof value !== "string") return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value.replace(/^\/+/, "")}`;
}

function InitialsAvatar() {
  return (
    <div
      className="profile-intro-initials serif"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 44,
        color: "rgba(250, 246, 236, 0.92)",
        background: "linear-gradient(135deg, rgba(143, 187, 161, 0.34), rgba(47, 111, 78, 0.2))",
      }}
    >
      JS
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20h3.38V8.5Z" fill="currentColor" />
      <path d="M5.25 7.06A1.97 1.97 0 1 0 5.25 3.1a1.97 1.97 0 0 0 0 3.96Z" fill="currentColor" />
      <path d="M20.44 13.03c0-3.4-1.81-4.98-4.22-4.98-1.95 0-2.82 1.07-3.31 1.82V8.5H9.53V20h3.38v-6.08c0-.32.02-.64.12-.87.26-.64.85-1.3 1.84-1.3 1.3 0 1.82.98 1.82 2.43V20h3.38v-6.97Z" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function GlassmorphismProfileCard({ onClose }) {
  const [imageFailed, setImageFailed] = React.useState(false);
  const closeButtonRef = React.useRef(null);
  const profile = window.PROFILE || {};
  const linkedInHref = resolveLinkedInHref(profile.linkedin);
  const contactHref = `mailto:${profile.email || "joshuaseverin@berkeley.edu"}`;
  const avatarSrc = profile.headshot || "/public/images/JS_headshot.png";

  React.useEffect(() => {
    if (closeButtonRef.current) closeButtonRef.current.focus();
  }, []);

  return (
    <div
      className="profile-intro-card"
      style={{
        position: "relative",
        width: "min(92vw, 700px)",
        overflow: "hidden",
        borderRadius: 30,
        padding: "38px 40px",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        background: "linear-gradient(180deg, rgba(22, 24, 26, 0.88), rgba(14, 16, 18, 0.82))",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 42px 110px rgba(0, 0, 0, 0.34)",
        backdropFilter: "blur(26px) saturate(1.04)",
        WebkitBackdropFilter: "blur(26px) saturate(1.04)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(84% 112% at 100% 0%, rgba(143, 187, 161, 0.11), rgba(143, 187, 161, 0) 48%)",
          pointerEvents: "none",
        }}
      />

      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close profile card"
        className="profile-intro-close"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 3,
          width: 42,
          height: 42,
          borderRadius: 999,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          background: "rgba(255, 255, 255, 0.04)",
          color: "rgba(250, 246, 236, 0.92)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
          transition: "transform .22s ease, background .22s ease, border-color .22s ease",
        }}
      >
        <CloseIcon />
      </button>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "rgba(244, 239, 229, 0.58)",
            marginBottom: 24,
          }}
        >
          Portfolio Intro
        </div>

        <div
          className="profile-intro-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "176px 1fr",
            gap: 30,
            alignItems: "center",
          }}
        >
          <div className="profile-intro-avatar-shell" style={{ position: "relative" }}>
            <div
              style={{
                width: 176,
                height: 216,
                borderRadius: 26,
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                background: "rgba(255, 255, 255, 0.06)",
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
              }}
            >
              {imageFailed ? (
                <InitialsAvatar />
              ) : (
                <img
                  src={avatarSrc}
                  alt="Joshua Severin"
                  onError={() => setImageFailed(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              )}
            </div>
          </div>

          <div>
            <h2
              id="profile-intro-title"
              className="serif profile-intro-name"
              style={{
                margin: 0,
                fontSize: "clamp(42px, 5.6vw, 60px)",
                lineHeight: 0.92,
                color: "rgba(250, 246, 236, 0.96)",
                letterSpacing: "-0.03em",
              }}
            >
              {profile.name || "Joshua Severin"}
            </h2>

            <p
              className="profile-intro-title-text"
              style={{
                margin: "16px 0 0",
                fontSize: 16,
                lineHeight: 1.58,
                color: "rgba(244, 239, 229, 0.74)",
                textWrap: "balance",
              }}
            >
              {profile.introTitle || "UC Berkeley Economics | Business Development & Product"}
            </p>

            <p
              id="profile-intro-bio"
              className="profile-intro-bio-text"
              style={{
                margin: "16px 0 0",
                fontSize: 15.5,
                lineHeight: 1.7,
                color: "rgba(244, 239, 229, 0.84)",
                maxWidth: 360,
              }}
            >
              {profile.introBio || "I build models, systems, and products that turn complex data into clearer decisions."}
            </p>

            <div
              className="profile-intro-actions"
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 24,
                alignItems: "center",
              }}
            >
              <a
                href={linkedInHref}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="profile-intro-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 50,
                  padding: "0 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "rgba(250, 246, 236, 0.94)",
                  transition: "transform .22s ease, background .22s ease, border-color .22s ease",
                }}
              >
                <LinkedInIcon />
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                  }}
                >
                  LinkedIn
                </span>
              </a>

              <a
                href={contactHref}
                className="profile-intro-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 50,
                  padding: "0 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(143, 187, 161, 0.3)",
                  background: "linear-gradient(180deg, rgba(143, 187, 161, 0.18), rgba(79, 118, 95, 0.12))",
                  color: "rgba(250, 246, 236, 0.96)",
                  transition: "transform .22s ease, background .22s ease, border-color .22s ease",
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                  }}
                >
                  Contact Me
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-intro-close:hover,
        .profile-intro-secondary:hover,
        .profile-intro-primary:hover {
          transform: translateY(-1px);
        }
        .profile-intro-close:hover,
        .profile-intro-secondary:hover {
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.1);
        }
        .profile-intro-primary:hover {
          border-color: rgba(143, 187, 161, 0.46);
          background: linear-gradient(180deg, rgba(143, 187, 161, 0.24), rgba(79, 118, 95, 0.16));
        }
        .profile-intro-close:focus-visible,
        .profile-intro-secondary:focus-visible,
        .profile-intro-primary:focus-visible {
          outline: 2px solid rgba(143, 187, 161, 0.78);
          outline-offset: 3px;
        }
        @media (max-width: 640px) {
          .profile-intro-card {
            width: min(100%, 440px) !important;
            padding: 24px 22px !important;
            border-radius: 26px !important;
          }
          .profile-intro-layout {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .profile-intro-avatar-shell {
            margin: 0 auto;
          }
          .profile-intro-avatar-shell > div {
            width: 160px !important;
            height: 194px !important;
          }
          .profile-intro-name,
          .profile-intro-title-text,
          .profile-intro-bio-text {
            text-align: center;
          }
          .profile-intro-bio-text {
            max-width: none !important;
          }
          .profile-intro-actions {
            justify-content: center;
          }
          .profile-intro-close {
            top: 16px !important;
            right: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

function ProfileIntroModal({ open, onClose }) {
  React.useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="profile-intro-modal"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(7, 9, 10, 0.38)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-intro-title"
        aria-describedby="profile-intro-bio"
        style={{
          position: "relative",
          zIndex: 1,
          animation: "profileIntroEnter .46s cubic-bezier(.2, .8, .2, 1)",
        }}
      >
        <GlassmorphismProfileCard onClose={onClose} />
      </div>

      <style>{`
        @keyframes profileIntroEnter {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { ProfileIntroModal, GlassmorphismProfileCard });
