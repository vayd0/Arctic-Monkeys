import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Loader from "../Loader";
import Intro from "../Intro";
import Group from "../Group";
import TimelineWithStar from "../TimelineWithStar";
import ThreeModel from "../ThreeModel";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const svgCentralRef = useRef(null);
  const progressRef = useRef(0);
  const timelineSectionRef = useRef(null);

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
        scrub: 1,
      };

      gsap.set(borderTopRef.current, { transformOrigin: "top left" });
      gsap.set(borderTopRightRef.current, { transformOrigin: "top right" });
      gsap.set(borderBottomLeftRef.current, { transformOrigin: "bottom left" });
      gsap.set(borderBottomRightRef.current, { transformOrigin: "bottom right" });
      gsap.set(borderHexRef.current, { transformOrigin: "center center" });

      gsap.to(borderTopRef.current, { scale: 0.55, skewX: -4, ease: "none", scrollTrigger: st });
      gsap.to(borderTopRightRef.current, { scale: 0.5, rotate: 10, ease: "none", scrollTrigger: st });
      gsap.to(borderBottomLeftRef.current, { scale: 1.45, skewY: 4, ease: "none", scrollTrigger: st });
      gsap.to(borderBottomRightRef.current, { scale: 1.45, skewY: -4, ease: "none", scrollTrigger: st });
      gsap.to(borderHexRef.current, { rotate: 45, scale: 1.5, ease: "none", scrollTrigger: st });
    });

    return () => ctx.revert();
  }, [contentVisible]);

  const handleLoaderEnd = () => setShowLoader(false);

  useEffect(() => {
    if (!showLoader) setTimeout(() => setContentVisible(true), 10);
  }, [showLoader]);

  return (
    <>
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

          <div ref={timelineSectionRef} style={{ position: "relative", background: "#000", height: "500vh" }}>
            <div
              style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                display: "grid",
                gridTemplateColumns: "50vw 50vw",
              }}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <ThreeModel progressRef={progressRef} />
              </div>

              <div className="flex justify-center w-full" style={{ position: "relative", height: "100%", overflow: "hidden" }}>
                <TimelineWithStar progressRef={progressRef} sectionRef={timelineSectionRef} />
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
}

export default App;