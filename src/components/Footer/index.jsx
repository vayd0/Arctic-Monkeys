import "./Footer.css";

export default function Footer() {
  return (
    <footer style={{ position: "relative", background: "white", paddingTop: "6rem", paddingBottom: "3rem" }}>
      {/* Wave transition black → white */}
      <svg
        viewBox="0 0 1512 250"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: "-120px",
          left: 0,
          width: "100%",
          height: "140px",
          display: "block",
        }}
        aria-hidden="true"
      >
        <path d="M-109 120L400.5 200L912 100L1233 180L1539 80V250H-109V120Z" fill="white" />
      </svg>

      <div className="footer-inner">
        {/* Row 1: info left + ARCTIC right */}
        <div className="footer-row1">
          {/* Left: credit + icons */}
          <div className="footer-info">
            <a
              href="https://github.com/hkth"
              target="_blank"
              rel="noopener noreferrer"
              className="orbitron"
              style={{
                fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "black",
                textDecoration: "none",
              }}
            >
              Made by HKTH ↗
            </a>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/icons/instagram.png" alt="Instagram" style={{ width: 32, height: 32, imageRendering: "pixelated" }} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src="/icons/linkedin.png" alt="LinkedIn" style={{ width: 32, height: 32, imageRendering: "pixelated" }} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img src="/icons/github.png" alt="GitHub" style={{ width: 32, height: 32, imageRendering: "pixelated" }} />
              </a>
            </div>
          </div>

          {/* ARCTIC */}
          <span
            className="stretched"
            style={{
              fontSize: "clamp(48px, 12vw, 200px)",
              fontWeight: 900,
              color: "black",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            ARCTIC
          </span>
        </div>

        {/* Row 2: MONKEYS */}
        <span
          className="stretched footer-monkeys"
          style={{
            fontSize: "clamp(48px, 12vw, 200px)",
            fontWeight: 900,
            color: "black",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
          }}
        >
          MONKEYS
        </span>
      </div>
    </footer>
  );
}
