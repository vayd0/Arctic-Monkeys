import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Loader from "../Loader";
import Intro from "../Intro";
import Group from "../Group";
import TimelineWithStar, { TIMELINE_ITEMS } from "../TimelineWithStar";
import ThreeModel from "../ThreeModel";
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

  const borderTopRef = useRef(null);
  const borderTopRightRef = useRef(null);
  const borderBottomLeftRef = useRef(null);
  const borderBottomRightRef = useRef(null);
  const borderHexRef = useRef(null);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    if (!contentVisible) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const st = {
        trigger: section,
        start: "top top",
        end: "+=80%",
        scrub: 1.4,
      };

      // Couche LOINTAINE — recule fortement
      gsap.set(borderTopRef.current, { transformOrigin: "top left", force3D: true, rotate: -4 });
      gsap.to(borderTopRef.current, {
        y: -320, scale: 0.25, skewX: -14, rotateX: 28, opacity: 0.2,
        ease: "none", scrollTrigger: st,
      });

      // Couche LOINTAINE droite
      gsap.set(borderTopRightRef.current, { transformOrigin: "top right", force3D: true });
      gsap.to(borderTopRightRef.current, {
        y: -260, x: 120, scale: 0.2, rotate: 40, rotateY: -25, opacity: 0.15,
        ease: "none", scrollTrigger: st,
      });

      // Couche MOYENNE
      gsap.set(borderBottomLeftRef.current, { transformOrigin: "bottom left", force3D: true });
      gsap.to(borderBottomLeftRef.current, {
        y: 180, x: -60, scale: 1.8, skewY: 10, rotateX: -12,
        ease: "none", scrollTrigger: st,
      });

      gsap.set(borderBottomRightRef.current, { transformOrigin: "bottom right", force3D: true });
      gsap.to(borderBottomRightRef.current, {
        y: 200, x: 60, scale: 1.8, skewY: -10, rotateY: 18,
        ease: "none", scrollTrigger: st,
      });

      // Couche PROCHE — fonce vers l'avant
      gsap.set(borderHexRef.current, { transformOrigin: "center center", force3D: true });
      gsap.to(borderHexRef.current, {
        y: 420, x: -100, rotate: 160, scale: 3.5, rotateX: -35,
        ease: "none", scrollTrigger: st,
      });
    });

    return () => {
      ctx.revert();
    };
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

          <section
            ref={sectionRef}
            className="top-0 left-0 z-999999 relative h-screen overflow-hidden"
            style={{ perspective: "800px" }}
          >
            {/* Trapèze — faisceau de lumière top */}
            <svg ref={borderTopRef} width="1902" height="375" viewBox="0 0 1902 375" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[-10rem] left-[-10rem] will-change-transform" id="border">
              <path d="M 0,375 L 220,0 L 1902,0 L 1682,375 Z" fill="white"/>
            </svg>

            {/* Diamants concentriques wireframe */}
            <svg ref={borderTopRightRef} className="absolute top-[-14rem] right-[-20rem] rotate-[20deg] hidden md:block will-change-transform" width="1000" height="898" viewBox="0 0 1457 898" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleY(-1) scaleX(-1)" }}>
              <path d="M728,20 L1437,449 L728,878 L19,449 Z" fill="none" stroke="white" strokeWidth="3"/>
              <path d="M728,160 L1297,449 L728,738 L159,449 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
              <path d="M728,320 L877,449 L728,578 L579,449 Z" fill="white"/>
            </svg>

            <div className="mt-7">
              <Group svgCentralRef={svgCentralRef} />
              <div className="relative md:z-[100]">
                {/* Frame gauche — bord de scène */}
                <svg ref={borderBottomLeftRef} className="absolute -left-15 bottom-0 md:left-0 will-change-transform" width="1439" height="980" viewBox="0 0 1439 980" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1186.5 901.5L320.5 877.5L138 716.5L208 58L6.5 0H-26L-37 1009H1439L1357.5 972L1186.5 901.5Z" fill="white"/>
                </svg>
                {/* Shard droite */}
                <svg ref={borderBottomRightRef} className="absolute -right-15 bottom-0 md:right-0 will-change-transform" width="388" height="982" viewBox="0 0 388 982" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M338 730.5L0 934.5L34.5 1025L402 1052L441.5 -64.5L182.5 11.5L305 161.5L338 730.5Z" fill="white"/>
                </svg>
              </div>
            </div>

            {/* Étoile 4 branches — accent foreground */}
            <svg ref={borderHexRef} className="absolute bottom-30 right-40 z-[1000] hidden md:block will-change-transform" width="200" height="200" viewBox="0 0 664 664" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 332,36 L 379,285 L 628,332 L 379,379 L 332,628 L 285,379 L 36,332 L 285,285 Z" fill="white"/>
            </svg>
          </section>

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

          <Clips />

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