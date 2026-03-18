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
      gsap.set(borderTopRef.current, { transformOrigin: "top left", force3D: true });
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

    // Mouse parallax multi-couches
    const layers = [
      { ref: borderTopRef,         depth: 0.008 },
      { ref: borderTopRightRef,    depth: 0.014 },
      { ref: borderBottomLeftRef,  depth: 0.022 },
      { ref: borderBottomRightRef, depth: 0.026 },
      { ref: borderHexRef,         depth: 0.055 },
    ];

    const handleMouseParallax = (e) => {
      const rect = section.getBoundingClientRect();
      const cx = (e.clientX - rect.left - rect.width  / 2);
      const cy = (e.clientY - rect.top  - rect.height / 2);
      layers.forEach(({ ref, depth }) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          xPercent: 0,
          yPercent: 0,
          x: cx * depth * 60,
          y: cy * depth * 60,
          duration: 1.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    section.addEventListener("mousemove", handleMouseParallax);
    return () => {
      ctx.revert();
      section.removeEventListener("mousemove", handleMouseParallax);
    };
  }, [contentVisible]);

  const handleLoaderEnd = () => setShowLoader(false);

  useEffect(() => {
    if (!showLoader) setTimeout(() => setContentVisible(true), 10);
  }, [showLoader]);

  return (
    <>
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
            <svg ref={borderTopRef} width="1902" height="375" viewBox="0 0 1902 375" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[-10rem] left-[-10rem] will-change-transform" id="border">
              <path d="M260.281 335.467L398.281 262.467L1236.78 185.467L1781.28 335.467L1859.78 108.569L57.7812 32.4668L260.281 335.467Z" fill="white" stroke="white" strokeWidth="60"/>
            </svg>

            <svg ref={borderTopRightRef} className="absolute top-[-14rem] right-[-20rem] rotate-[20deg] hidden md:block will-change-transform" width="1000" height="898" viewBox="0 0 1457 898" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleY(-1) scaleX(-1)" }}>
              <path d="M2.87878 559.381L264.879 766.381L323.379 896.881L1311.38 711.881L1578.38 383.881H1258.38L1311.38 1.88086L819.379 283.881L478.379 29.3809V383.881L126.879 246.381L305.879 559.381H2.87878Z" fill="white" stroke="white" strokeWidth="2"/>
            </svg>

            <div className="mt-7">
              <Group svgCentralRef={svgCentralRef} />
              <div className="relative md:z-[100]">
                <svg ref={borderBottomLeftRef} className="absolute -left-15 bottom-0 md:left-0 will-change-transform" width="1439" height="980" viewBox="0 0 1439 980" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1186.5 901.5L320.5 877.5L138 716.5L208 58L6.5 0H-26L-37 1009H1439L1357.5 972L1186.5 901.5Z" fill="white"/>
                </svg>
                <svg ref={borderBottomRightRef} className="absolute -right-15 bottom-0 md:right-0 will-change-transform" width="388" height="982" viewBox="0 0 388 982" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M338 730.5L0 934.5L34.5 1025L402 1052L441.5 -64.5L182.5 11.5L305 161.5L338 730.5Z" fill="white"/>
                </svg>
              </div>
            </div>

            <svg ref={borderHexRef} className="absolute bottom-30 right-40 z-[1000] hidden md:block will-change-transform" width="200" height="200" viewBox="0 0 665 665" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M123.999 398.633L191.968 421.595L209.42 341.685L182.783 257.182L209.42 214.931L571.312 90.0139L502.424 241.568L551.105 467.521L484.972 530.898L394.959 509.772L371.996 421.595L418.84 372.914H484.972L447.314 241.568H387.61L249.834 295.76V390.366L261.775 523.55L200.235 596.112L91.8508 585.09L48.6809 475.787L123.999 398.633Z" fill="white"/>
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

          <div ref={timelineSectionRef} style={{ position: "relative", background: "#000", height: "500vh" }}>
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