import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Loader from "../Loader";
import Intro from "../Intro";
import Group from "../Group";
import TimelineWithStar, { TIMELINE_ITEMS } from "../TimelineWithStar";
import ThreeModel from "../Threemodel";
import CustomCursor from "../CustomCursor";
import Clips from "../Clips";
import Footer from "../Footer";
import Border3D from '../Border3D';

gsap.registerPlugin(ScrollTrigger);


function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const svgCentralRef = useRef(null);
  const progressRef = useRef(0);
  const timelineSectionRef = useRef(null);
  const timelineCardsRef = useRef([]);


  useEffect(() => {
    const section = document.querySelector(".bg-white.relative");
    const svg = svgCentralRef.current;
    if (!section || !svg) return;
    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 60;
      const scale = 1 + (y / 60) * 0.04 + (x / 60) * 0.04;
      gsap.to(svg, { x, y, scale, duration: 0.5, ease: "power2.out" });
    };
    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, [contentVisible]);


  const handleLoaderEnd = () => setShowLoader(false);

  useEffect(() => {
    if (!showLoader) setTimeout(() => setContentVisible(true), 10);
  }, [showLoader]);

  return (
    <>
      <Border3D />
      <CustomCursor />
      <div style={{ position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" opacity="0.04"/>
        </svg>
      </div>
      {showLoader ? (
        <Loader duration={2000} size={64} onEnd={handleLoaderEnd} />
      ) : (
        <div
          style={{
            opacity: contentVisible ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(.77,0,.18,1)",
          }}
        >
          <Intro />

          <div style={{
            position: "relative",
            zIndex: 10,
            margin: "-5rem 0",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}>
            <svg width="100%" viewBox="0 0 1507 435" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <path d="M102.532 355.295L-21 294.503V104.022L250.771 81.0559L446.522 64.8447L522.542 0L853.229 81.0559L1311.25 33.7733L1507 81.0559V368.804L1250.43 294.503L982.463 435L486.433 294.503L102.532 355.295Z" fill="white"/>
            </svg>
          </div>

          <div id="discover">
            <Group svgCentralRef={svgCentralRef} />
          </div>

          <section className="h-screen w-screen mx-auto bg-black relative overflow-hidden flex items-center justify-center">
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "12vw", background: "linear-gradient(to right, #000, transparent)", zIndex: 10, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "12vw", background: "linear-gradient(to left, #000, transparent)", zIndex: 10, pointerEvents: "none" }} />
            {Array.from({ length: 5 }).map((_, row) => (
              <div key={row} className="absolute flex" style={{ top: `${row * 20}%`, height: "20%", width: "max-content", animation: `slideRow ${12 + row * 3}s linear infinite ${row % 2 === 0 ? "normal" : "reverse"}` }}>
                {[0, 1, 2].map((repeat) =>
                  Array.from({ length: 8 }).map((_, col) => (
                    <div key={`${repeat}-${col}`} className="shrink-0 aspect-square h-full">
                      <img src={`/covers/${["505.png", "am.png", "htl.png", "beneath.png", "humbug.png", "liveatroyal.png", "when.png", "we.png"][(row * 8 + col) % 6]}`} alt={`cover-${row}-${col}`} className="w-full h-full object-cover border-2 border-white grayscale-100 contrast-1000"/>
                    </div>
                  ))
                )}
              </div>
            ))}
          </section>

          <div id="musics">
            <Clips />
          </div>

          <div ref={timelineSectionRef} style={{ position: "relative", background: "#000", height: "500vh", paddingBottom: "5rem" }}>
            <div
              className="timeline-grid"
              style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                display: "grid",
                overflow: "visible",
              }}
            >
              <div className="timeline-model" style={{ width: "100%", height: "100%", filter: "invert(1)" }}>
                <ThreeModel progressRef={progressRef} />
              </div>

              <div className="flex justify-center w-full" style={{ position: "relative", height: "100%" }}>
                <TimelineWithStar progressRef={progressRef} sectionRef={timelineSectionRef} cardsRef={timelineCardsRef} />
              </div>


              {TIMELINE_ITEMS.map((item, i) => (
                <div
                  key={item.id}
                  ref={el => timelineCardsRef.current[i] = el}
                  className="timeline-card"
                >
                  {/* Year block */}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", flexShrink: 0 }}>
                    <span className="orbitron" style={{
                      fontSize: "clamp(0.6rem, 0.8vw, 0.75rem)",
                      letterSpacing: "0.3em",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      marginBottom: "0.4rem",
                    }}>Album</span>
                    <span className="stretched" style={{
                      fontSize: "clamp(3rem, 5vw, 4.5rem)",
                      fontWeight: 900,
                      color: "white",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}>{item.year}</span>
                  </div>

                  {/* Divider */}
                  <div className="timeline-card-divider" style={{ width: "1px", background: "rgba(255,255,255,0.2)", flexShrink: 0, alignSelf: "stretch" }} />

                  {/* Title + body */}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", flex: 1, maxWidth: "clamp(260px, 40vw, 520px)" }}>
                    <h3 className="orbitron" style={{
                      fontSize: "clamp(0.75rem, 1vw, 0.95rem)",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "white",
                      marginBottom: "0.6rem",
                    }}>{item.title}</h3>
                    <p style={{
                      fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)",
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.55)",
                      fontWeight: 300,
                      margin: 0,
                    }}>{item.body}</p>
                  </div>

                  {/* Index */}
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end", flexShrink: 0 }}>
                    <span className="orbitron" style={{
                      fontSize: "clamp(0.6rem, 0.75vw, 0.7rem)",
                      color: "rgba(255,255,255,0.2)",
                      letterSpacing: "0.2em",
                    }}>0{i + 1} / 03</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;