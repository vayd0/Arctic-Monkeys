import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 14;

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const mouse = useRef({ x: -300, y: -300 });
  const cursorPos = useRef({ x: -300, y: -300 });
  const history = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      raf.current = requestAnimationFrame(tick);

      cursorPos.current.x = lerp(cursorPos.current.x, mouse.current.x, 0.45);
      cursorPos.current.y = lerp(cursorPos.current.y, mouse.current.y, 0.45);

      const cx = Math.round(cursorPos.current.x);
      const cy = Math.round(cursorPos.current.y);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      }

      history.current.push({ x: cx, y: cy });
      if (history.current.length > TRAIL_LENGTH) history.current.shift();

      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const histIdx = history.current.length - 1 - (i + 2);
        if (histIdx < 0) { el.style.opacity = "0"; return; }
        const p = history.current[histIdx];
        const t = i / TRAIL_LENGTH;
        const size = Math.max(4, Math.round(10 * (1 - t * 0.7)));
        el.style.opacity = String((1 - t) * 0.5);
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.transform = `translate(${p.x - Math.floor(size / 2)}px, ${p.y - Math.floor(size / 2)}px)`;
      });
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Custom cursor image */}
      <img
        ref={cursorRef}
        src="/cursor.png"
        alt=""
        style={{
          position: "fixed", top: 0, left: 0,
          width: 32, height: 32,
          pointerEvents: "none",
          zIndex: 99999,
          imageRendering: "pixelated",
        }}
      />

      {/* Pixel trail */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div key={i} ref={el => trailRefs.current[i] = el} style={{
          position: "fixed", top: 0, left: 0,
          background: "white",
          pointerEvents: "none",
          zIndex: 99998,
        }} />
      ))}
    </>
  );
}
