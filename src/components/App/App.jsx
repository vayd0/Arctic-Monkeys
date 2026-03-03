import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./App.css";
import Loader from "../Loader";
import Intro from "../Intro";
import Group from "../Group";

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const svgCentralRef = useRef(null);
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
    if (!showLoader) {
      setTimeout(() => setContentVisible(true), 10);
    }
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
          <section className="fixed top-0 left-0 z-[999999] relative h-[100vh] overflow-hidden">
            <svg
              width="1902"
              height="375"
              viewBox="0 0 1902 375"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[-10rem] left-[-10rem]"
            >
              <path
                d="M260.281 335.467L398.281 262.467L1236.78 185.467L1781.28 335.467L1859.78 108.569L57.7812 32.4668L260.281 335.467Z"
                fill="white"
                stroke="white"
                strokeWidth="60"
              />
            </svg>
            <svg
              className="absolute top-[-14rem] right-[-20rem] rotate-[20deg] hidden md:block"
              width="1000"
              height="898"
              viewBox="0 0 1457 898"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "scaleY(-1) scaleX(-1)" }}
            >
              <path
                d="M2.87878 559.381L264.879 766.381L323.379 896.881L1311.38 711.881L1578.38 383.881H1258.38L1311.38 1.88086L819.379 283.881L478.379 29.3809V383.881L126.879 246.381L305.879 559.381H2.87878Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
            <div className="mt-7">
              <Group />
              <div className="relative md:z-[100]">
                <svg
                  className="absolute -left-15 bottom-0 md:left-0"
                  width="1439"
                  height="980"
                  viewBox="0 0 1439 980"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1186.5 901.5L320.5 877.5L138 716.5L208 58L6.5 0H-26L-37 1009H1439L1357.5 972L1186.5 901.5Z"
                    fill="white"
                  />
                </svg>
                <svg
                  className="absolute -right-15 bottom-0 md:right-0"
                  width="388"
                  height="982"
                  viewBox="0 0 388 982"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M338 730.5L0 934.5L34.5 1025L402 1052L441.5 -64.5L182.5 11.5L305 161.5L338 730.5Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <svg
              className="absolute bottom-30 right-40 z-[1000] hidden md:block"
              width="200"
              height="200"
              viewBox="0 0 665 665"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M123.999 398.633L191.968 421.595L209.42 341.685L182.783 257.182L209.42 214.931L571.312 90.0139L502.424 241.568L551.105 467.521L484.972 530.898L394.959 509.772L371.996 421.595L418.84 372.914H484.972L447.314 241.568H387.61L249.834 295.76V390.366L261.775 523.55L200.235 596.112L91.8508 585.09L48.6809 475.787L123.999 398.633Z"
                fill="white"
              />
            </svg>
          </section>
          <section className="h-[100vh] bg-black relative overflow-hidden">
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block"
              width="180vw"
              height="120vh"
              viewBox="0 0 1275 784"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ minWidth: "100vw", minHeight: "100vh" }}
            >
              <path
                d="M1275 784H0V0H1275V784ZM683.643 236.255L683.569 236.279L683.501 236.313L582.01 287.369L215.021 141.984L213.912 143.586L427.11 378.468L169.436 554.619L170.313 556.395L442.139 466.679L638.593 661.959L639.472 662.832L640.14 661.79L737.041 510.705L1026.92 662.137L1028.15 660.612L799.802 385.041L1105.68 101.984L1104.69 100.299L683.643 236.255ZM797.749 384.217L797.054 384.859L797.658 385.589L1023.44 658.063L737.157 508.509L736.346 508.085L735.853 508.855L639.124 659.667L443.113 464.828L442.679 464.396L442.096 464.588L176.405 552.277L429.188 379.472L430.136 378.824L429.364 377.974L218.284 145.428L581.691 289.395L582.108 289.56L582.509 289.358L684.333 238.134L1100.99 103.593L797.749 384.217ZM714.089 250.142L714 250.166L713.918 250.207L592.239 310.021L283.645 186.086L282.536 187.692L464.846 385.495L282.73 502.544L283.615 504.324L454.995 441.622L634.164 626.144L635.031 627.037L635.717 625.997L736.306 473.242L938.324 583.792L939.575 582.277L777.103 385.801L1028.16 163.876L1027.23 162.164L714.089 250.142Z"
                fill="white"
              />
            </svg>

            <svg
              id="flèche"
              width="32"
              height="40"
              viewBox="0 0 91 115"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-5 md:right-20 top-1/2 -translate-y-1/2"
              style={{ zIndex: 2 }}
            >
              <path
                d="M90.5 50.5L0 0L50.5 50.5L0 115L90.5 50.5Z"
                fill="black"
              />
            </svg>
            <svg
              id="flèche-gauche"
              width="32"
              height="40"
              viewBox="0 0 91 115"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-5 md:left-20 top-1/2 -translate-y-1/2 rotate-[-180deg]"
              style={{ zIndex: 2 }}
            >
              <path
                d="M90.5 50.5L0 0L50.5 50.5L0 115L90.5 50.5Z"
                fill="black"
              />
            </svg>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
