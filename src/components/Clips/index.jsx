import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLIPS = [
  { file: "RUM.mp4",   title: "R U Mine?",             num: "01" },
  { file: "LVTLC.mp4", title: "505 (Live)",             num: "02" },
  { file: "OFTR.mp4",  title: "One For The Road",       num: "03" },
  { file: "Fluo.mp4",  title: "Fluorescent Adolescent", num: "04" },
  { file: "BS.mp4",    title: "Brianstorm",             num: "05" },
];

const COLLAPSED = 88;
const EXPANDED = 300;

function ClipRow({ clip, onOpen, onRowMount }) {
  const rowRef = useRef(null);
  const videoRef = useRef(null);
  const videoWrapRef = useRef(null);
  const numRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (rowRef.current && onRowMount) onRowMount(rowRef.current);
  }, []);

  const enter = useCallback(() => {
    videoRef.current?.play().catch(() => {});
    tlRef.current?.kill();
    tlRef.current = gsap.timeline()
      .to(rowRef.current,       { height: EXPANDED, duration: 0.65, ease: "expo.inOut" }, 0)
      .to(videoWrapRef.current, { opacity: 1,        duration: 0.5,  ease: "power2.out" }, 0.1)
      .to(numRef.current,       { color: "rgba(255,255,255,0.9)", duration: 0.3 }, 0);
  }, []);

  const leave = useCallback(() => {
    videoRef.current?.pause();
    tlRef.current?.kill();
    tlRef.current = gsap.timeline()
      .to(rowRef.current,       { height: COLLAPSED, duration: 0.5,  ease: "expo.inOut" }, 0)
      .to(videoWrapRef.current, { opacity: 0,         duration: 0.3,  ease: "power2.in"  }, 0)
      .to(numRef.current,       { color: "rgba(255,255,255,0.2)", duration: 0.3 }, 0);
  }, []);

  return (
    <div
      ref={rowRef}
      className="clip-row"
      style={{
        height: COLLAPSED,
        overflow: "hidden",
        position: "relative",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        cursor: "pointer",
      }}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={() => onOpen(clip)}
    >
      {/* Video background */}
      <div
        ref={videoWrapRef}
        style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none" }}
      >
        <video
          ref={videoRef}
          src={`/videos/${clip.file}`}
          muted loop playsInline preload="none"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.45) 100%)",
        }} />
      </div>

      {/* Row content */}
      <div style={{
        position: "relative", zIndex: 1,
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 clamp(1.25rem, 4vw, 4rem)",
        gap: "clamp(1rem, 3vw, 2.5rem)",
      }}>
        {/* Number */}
        <span
          ref={numRef}
          className="stretched"
          style={{
            fontSize: "clamp(0.85rem, 1.5vw, 1.15rem)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.2)",
            flexShrink: 0,
            letterSpacing: "0.08em",
            minWidth: "2.5rem",
          }}
        >
          {clip.num}
        </span>

        {/* Separator line */}
        <div style={{ width: "clamp(1.5rem, 3vw, 3rem)", height: "1px", background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />

        {/* Title */}
        <h3
          className="stretched"
          style={{
            flex: 1, margin: 0,
            fontSize: "clamp(1.2rem, 3vw, 2.8rem)",
            fontWeight: 900,
            color: "white",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {clip.title}
        </h3>

        {/* Play indicator */}
        <div
          className="orbitron"
          style={{
            flexShrink: 0,
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "0.35rem 0.9rem",
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            display: "none",
          }}
          ref={el => { if (el) el.style.display = window.innerWidth > 600 ? "block" : "none"; }}
        >
          PLAY
        </div>
      </div>
    </div>
  );
}

function FullscreenOverlay({ clip, onClose }) {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    videoRef.current?.play().catch(() => {});

    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const close = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.25, ease: "power2.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.97)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      {/* Close */}
      <button
        onClick={close}
        style={{
          position: "absolute", top: "1.5rem", right: "1.5rem",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "rgba(255,255,255,0.7)",
          width: "38px", height: "38px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem", lineHeight: 1,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.color = "white"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
      >
        ✕
      </button>

      {/* Title */}
      <h2
        className="stretched"
        style={{
          margin: 0,
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          fontWeight: 900,
          color: "white",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {clip.title}
      </h2>

      {/* Video */}
      <video
        ref={videoRef}
        src={`/videos/${clip.file}`}
        controls playsInline
        style={{
          maxWidth: "90vw",
          maxHeight: "72vh",
          outline: "none",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "block",
        }}
      />
    </div>
  );
}

export default function Clips() {
  const [activeClip, setActiveClip] = useState(null);
  const sectionRef = useRef(null);

  const handleOpen  = useCallback((clip) => setActiveClip(clip), []);
  const handleClose = useCallback(() => setActiveClip(null), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".clip-row",
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1,
          stagger: 0.09,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "#000", width: "100%", padding: "8rem 0 6rem" }}
    >
      {/* Header */}
      <div style={{
        padding: "0 clamp(1.25rem, 4vw, 4rem)",
        marginBottom: "4rem",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        paddingBottom: "2rem",
        gap: "1rem",
        flexWrap: "wrap",
      }}>
        <div>
          <p className="orbitron" style={{
            margin: "0 0 0.75rem",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
          }}>
            — Live Footage
          </p>
          <h2 className="stretched" style={{
            margin: 0,
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 900,
            color: "white",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            textTransform: "uppercase",
          }}>
            Clips
          </h2>
        </div>

        <span className="orbitron" style={{
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.2)",
          textTransform: "uppercase",
          paddingBottom: "0.5rem",
        }}>
          0{CLIPS.length} Videos
        </span>
      </div>

      {/* Setlist rows */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {CLIPS.map((clip) => (
          <ClipRow key={clip.file} clip={clip} onOpen={handleOpen} />
        ))}
      </div>

      {activeClip && <FullscreenOverlay clip={activeClip} onClose={handleClose} />}
    </section>
  );
}
