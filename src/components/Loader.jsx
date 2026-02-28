import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
function Loader({ duration = 2000, size = 64, onEnd }) {
  const [expand, setExpand] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const containerRef = useRef(null);
  const svgRef = useRef(null);


  useEffect(() => {
    if (svgRef.current) {
      gsap.to(svgRef.current, {
        rotation: 360,
        duration: duration / 1000,
        ease: "power2.inOut",
        repeat: 0,
      });
    }
    const timer = setTimeout(() => setExpand(true), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (expand && svgRef.current) {
      const tl = gsap.timeline({ onComplete: () => setFadeOut(true) });
      tl.to(svgRef.current, {
        scale: 100,
        rotation: 120,
        duration: 1.2,
        ease: "expo.in",
      });
    }
  }, [expand]);

  useEffect(() => {
    if (fadeOut && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power1.inOut",
        onComplete: () => {
          if (onEnd) onEnd();
        },
      });
      gsap.to(containerRef.current, {
        backgroundColor: "rgba(255,255,255,0)",
        duration: 0.6,
        ease: "power1.inOut",
      });
    }
  }, [fadeOut, onEnd]);

  return (
    <div
      ref={containerRef}
      style={{
        position: expand ? "fixed" : "relative",
        top: expand ? 0 : undefined,
        left: expand ? 0 : undefined,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        zIndex: expand ? 9999 : undefined,
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox="0 0 58 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) scale(1)",
          zIndex: 10000,
          pointerEvents: "none",
        }}
      >
        <path d="M28.5423 1.39618L36.1196 22.8962L56.6196 33.3962L36.1196 41.3962L28.5423 62.8962L19.6196 41.3962L1.11963 33.3962L19.6196 22.8962L28.5423 1.39618Z" fill="black" stroke="black"/>
      </svg>
    </div>
  );
}

export default Loader;
