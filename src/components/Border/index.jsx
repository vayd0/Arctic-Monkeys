import { useState } from "react";
import Menu from "../Menu";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Border() {

  const borderRefs = {
    top: useRef(null),
    right: useRef(null),
    left: useRef(null),
    bottom: useRef(null),
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(borderRefs.top.current, {
      x: -100,
      scrollTrigger: {
        trigger: borderRefs.top.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(borderRefs.right.current, {
      x: 100,
      scrollTrigger: {
        trigger: borderRefs.right.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(borderRefs.left.current, {
      x: -100,
      scrollTrigger: {
        trigger: borderRefs.left.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(borderRefs.bottom.current, {
      y: 100,
      scrollTrigger: {
        trigger: borderRefs.bottom.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
  
  return (
    <div className="relative h-[120vh] w-[100vw] overflow-visible">
      <div className="h-[120vh] w-[100vw] absolute top-[-3rem] left-0">
        <div className="hidden md:block" style={{ pointerEvents: "none" }}>
          <svg
            ref={borderRefs.top}
            className="absolute top-[-8rem] left-[-12rem]"
            width="1902"
            height="375"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M260.281 335.467L398.281 262.467L1236.78 185.467L1781.28 335.467L1859.78 108.569L57.7812 32.4668L260.281 335.467Z"
              fill="white"
              stroke="white"
              strokeWidth="60"
            />
          </svg>
          <svg
            ref={borderRefs.right}
            height="100%"
            className="absolute top-0 right-[-10rem] z-[101]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M90.3526 257.425L117.428 329.277L32.818 1067.44L432.318 1164.94L117.428 329.277L154.318 7.43663L90.3526 257.425Z"
              fill="white"
            />
            <path
              d="M90.3526 257.425L117.428 329.277L32.818 1067.44L432.318 1164.94L117.428 329.277L154.318 7.43663L90.3526 257.425Z"
              fill="white"
            />
            <path
              d="M90.3526 257.425L432.318 1164.94L32.818 1067.44L154.318 7.43663L90.3526 257.425Z"
              stroke="white"
              strokeWidth="60"
            />
          </svg>
          <svg
            ref={borderRefs.left}
            height="120%"
            className="absolute"
            viewBox="0 0 83 794"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_95_63)">
              <path
                d="M52 322.765L-2.5 -224H-29L-22.9483 806L52 322.765Z"
                fill="white"
              />
              <path
                d="M52 322.765L-2.5 -224H-29L-22.9483 806L52 322.765Z"
                fill="white"
              />
              <path
                d="M52 322.765L-2.5 -224H-29L-22.9483 806L52 322.765Z"
                stroke="white"
                strokeWidth="60"
              />
            </g>
            <defs>
              <clipPath id="clip0_95_63">
                <rect
                  width="83"
                  height="982"
                  fill="white"
                  transform="translate(0 -188)"
                />
              </clipPath>
            </defs>
          </svg>
          <svg
            ref={borderRefs.bottom}
            width="100%"
            height="321"
            className="absolute bottom-[5rem]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M89.5 241.858L3.5 87.8584L-35 302.256L1570 292.792L579.5 274.104L89.5 241.858Z"
              fill="white"
              stroke="white"
              strokeWidth="60"
            />
          </svg>
        </div>
        <Menu />
      </div>
    </div>
  );
}

export default Border;
