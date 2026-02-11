import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Intro from "../Intro";
import TextBlock from "../TextBlock";
function Group() {
  const imgRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [hovered, setHovered] = useState([false, false, false, false]);

  useEffect(() => {
    imgRefs.forEach((ref) => {
      if (ref.current) {
        gsap.set(ref.current, { filter: "blur(3px)" });
      }
    });
  }, []);

  const handleMouseEnter = (idx) => {
    gsap.to(imgRefs[idx].current, {
      filter: "blur(0px)",
      duration: 0.3,
      overwrite: "auto",
    });
    setHovered((prev) => prev.map((v, i) => (i === idx ? true : v)));
  };
  const handleMouseLeave = (idx) => {
    gsap.to(imgRefs[idx].current, {
      filter: "blur(6px)",
      duration: 0.3,
      overwrite: "auto",
    });
    setHovered((prev) => prev.map((v, i) => (i === idx ? false : v)));
  };

  return (
    <div className="relative w-screen h-screen mx-auto">
      <div className="relative mx-auto w-[20rem] md:w-[50rem] h-[18rem]">
        {/* Image 4 */}
        <div className="relative w-[220px] h-auto overflow-visible" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
          {hovered[0] && (
            <div className="infos absolute -top-1 -left-12 overflow-visible">
              <div className="absolute -top-3 left-1 h-10 w-32 z-[100]">
                <TextBlock content="Nick O'Malley" />
              </div>
              <svg
                className="absolute top-6 left-1 z-[100]"
                width="100"
                height="46"
                viewBox="0 0 197 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  mixBlendMode: "difference",
                  transform: "scaleX(-1)",
                }}
              >
                <path
                  d="M0.702087 45L45.3321 1H196.702"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
          )}
          <img
            ref={imgRefs[0]}
            src="/4.png"
            alt="Image 4"
            className="absolute z-[1]"
            style={{ width: "220px", height: "auto" }}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={() => handleMouseLeave(0)}
          />
        </div>
        {/* Image 1 */}
        <div className="relative w-[220px] h-auto overflow-visible" style={{ position: 'absolute', top: '1rem', left: '25rem', zIndex: 2 }}>
          {hovered[1] && (
            <div className="infos absolute -top-1 left-27 overflow-visible">
              <div className="absolute -top-3 left-7 h-10 w-32 z-[9999]">
                <TextBlock content="Matt Helders" />
              </div>
              <svg
                className="absolute top-6 left-1 z-[999]"
                width="100"
                height="46"
                viewBox="0 0 197 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  mixBlendMode: "difference",
                }}
              >
                <path
                  d="M0.702087 45L45.3321 1H196.702"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
          )}
          <img
            ref={imgRefs[1]}
            src="/1.png"
            alt="Image 1"
            className="absolute z-[2]"
            style={{ width: "220px", height: "auto" }}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={() => handleMouseLeave(1)}
          />
        </div>
        {/* Image 2 */}
        <div className="relative w-[220px] h-auto overflow-visible" style={{ position: 'absolute', top: '7rem', left: '15rem', zIndex: 5 }}>
          {hovered[2] && (
            <div className="infos absolute -top-1 -left-12 overflow-visible">
              <div className="absolute -top-3 left-1 h-10 w-32 z-[9999]">
                <TextBlock content="Alex Turner" />
              </div>
              <svg
                className="absolute top-6 left-1 z-[999]"
                width="100"
                height="46"
                viewBox="0 0 197 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  mixBlendMode: "difference",
                  transform: "scaleX(-1)",
                }}
              >
                <path
                  d="M0.702087 45L45.3321 1H196.702"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
          )}
          <img
            ref={imgRefs[2]}
            src="/2.png"
            alt="Image 2"
            className="absolute z-[5]"
            style={{ width: "220px", height: "auto" }}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={() => handleMouseLeave(2)}
          />
        </div>
        {/* Image 3 */}
        <div className="relative w-[220px] h-auto overflow-visible" style={{ position: 'absolute', top: '60px', left: '5rem', zIndex: 4 }}>
          {hovered[3] && (
            <div className="infos absolute -top-1 -left-12 overflow-visible">
              <div className="absolute -top-3 left-1 h-10 w-32 z-[9999]">
                <TextBlock content="Jamie Cook" />
              </div>
              <svg
                className="absolute top-6 left-1 z-[999]"
                width="100"
                height="46"
                viewBox="0 0 197 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  mixBlendMode: "difference",
                  transform: "scaleX(-1)",
                }}
              >
                <path
                  d="M0.702087 45L45.3321 1H196.702"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
          )}
          <img
            ref={imgRefs[3]}
            src="/3.png"
            alt="Image 3"
            className="absolute z-[4]"
            style={{ width: "220px", height: "auto" }}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={() => handleMouseLeave(3)}
          />
        </div>
      </div>
    </div>
  );
}
export default Group;
