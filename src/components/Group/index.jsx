import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Intro from "../Intro";
import TextBlock from "../TextBlock";
import Dither from "../Dither";

function Group() {
  const imgRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [hovered, setHovered] = useState([false, false, false, false]);

  const infoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const SCALE = 1.2;

  const handleMouseEnter = (idx) => {
    setHovered((prev) => prev.map((v, i) => (i === idx ? true : v)));
    setTimeout(() => {
      if (infoRefs[idx].current) {
        gsap.fromTo(
          infoRefs[idx].current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        );
      }
    }, 10);
  };
  const handleMouseLeave = (idx) => {
    if (infoRefs[idx].current) {
      gsap.to(infoRefs[idx].current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      });
    }
    setTimeout(() => {
      setHovered((prev) => prev.map((v, i) => (i === idx ? false : v)));
    }, 250);
  };

  return (
    <div className="relative w-screen h-screen mx-auto">
      <article className="absolute -z-1 top-[0] left-[0] m-10 p-0 w-[120vw] h-[120vh]">
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Dither
            waveColor={[1, 1, 1]}
            disableAnimation={false}
            colorNum={4}
            pixelSize={2}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
          />
        </div>
      </article>
      <div className="relative mx-auto w-[20rem] md:w-[50rem] h-[18rem]">
        <div className="absolute -top-3 left-8 z-[1] w-[220px] h-auto overflow-visible">
          {hovered[0] && (
            <div
              ref={infoRefs[0]}
              className="infos absolute -top-1 -left-12 overflow-visible z-[2000]"
              style={{
                opacity: 0,
                transform: `scale(${SCALE})`,
                transformOrigin: "top left",
              }}
            >
              <div className="absolute -top-3 left-6 h-10 w-[10rem] z-[2010]">
                <TextBlock content="Nick O'Malley" color="#fff" />
              </div>
              <svg
                className="absolute top-6 left-1 z-[2010]"
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
            style={{
              width: "220px",
              height: "auto",
              transform: `scale(${SCALE})`,
              transformOrigin: "top left",
            }}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={() => handleMouseLeave(0)}
          />
        </div>
        <div className="absolute top-1 left-80 z-[2] w-[220px] h-auto overflow-visible ">
          {hovered[1] && (
            <div
              ref={infoRefs[1]}
              className="infos absolute -top-1 left-27 overflow-visible z-[2000]"
              style={{
                opacity: 0,
                transform: `scale(${SCALE})`,
                transformOrigin: "top left",
              }}
            >
              <div className="absolute -top-3 left-7 h-10 w-[10rem] z-[2010]">
                <TextBlock content="Matt Helders" />
              </div>
              <svg
                className="absolute top-6 left-1 z-[2010]"
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
            style={{
              width: "220px",
              height: "auto",
              transform: `scale(${SCALE})`,
              transformOrigin: "top left",
            }}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={() => handleMouseLeave(1)}
          />
        </div>
        <div
          className="relative w-[220px] h-auto overflow-visible"
          style={{
            position: "absolute",
            top: "7rem",
            left: "15rem",
            zIndex: 5,
          }}
        >
          {hovered[2] && (
            <div
              ref={infoRefs[2]}
              className="infos absolute -top-1 -left-12 overflow-visible z-[2000]"
              style={{
                opacity: 0,
                transform: `scale(${SCALE})`,
                transformOrigin: "top left",
              }}
            >
              <div className="absolute -top-3 left-1 h-10 w-[10rem] z-[2010]">
                <TextBlock content="Alex Turner" />
              </div>
              <svg
                className="absolute top-6 left-1 z-[2010]"
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
            style={{
              width: "220px",
              height: "auto",
              transform: `scale(${SCALE})`,
              transformOrigin: "top left",
            }}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={() => handleMouseLeave(2)}
          />
        </div>
        <div className="absolute top-24 left-28 z-[4] w-[300px] overflow-visible">
          {hovered[3] && (
            <div
              ref={infoRefs[3]}
              className="infos absolute -top-1 -left-12 overflow-visible z-[2000]"
              style={{
                opacity: 0,
                transform: `scale(${SCALE})`,
                transformOrigin: "top left",
              }}
            >
              <div className="absolute -top-3 left-1 h-10 w-[10rem] z-[2010]">
                <TextBlock content="Jamie Cook" />
              </div>
              <svg
                className="absolute top-6 left-1 z-[2010]"
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
            style={{
              width: "220px",
              height: "auto",
              transform: `scale(${SCALE})`,
              transformOrigin: "top left",
            }}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={() => handleMouseLeave(3)}
          />
        </div>
      </div>
      <div className="absolute left-2 bottom-10 md:left-20 md:bottom-20 max-w-1/2 md:max-w-1/3 flex justify-center items-center z-[105]">
        <svg
          className="absolute -top-4 -right-65 z-[2010]"
          width="200"
          height="46"
          viewBox="0 0 197 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            mixBlendMode: "difference",
            transform: `scaleX(-1) scaleY(-1) scale(${SCALE})`,
            transformOrigin: "top left",
          }}
        >
          <path
            d="M0.702087 45L45.3321 1H196.702"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        <div className="relative w-full h-full p-[20px] bg-black text-white orbitron border-white border-15 z-[2000]">
          Arctic Monkeys est un groupe britannique de rock indépendant,
          originaire de Sheffield, Yorkshire du Sud, en Angleterre. Il est formé
          en 2002, plus précisément à High Green, une banlieue de Sheffield.
        </div>
      </div>
    </div>
  );
}
export default Group;
