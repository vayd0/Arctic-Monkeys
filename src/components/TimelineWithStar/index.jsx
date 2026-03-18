import { useEffect, useRef } from "react";

const VB_W = 618;
const VB_H = 2644;

const PTS = [
  { x: 338.5, y: 91.0366 },
  { x: 35.5,  y: 837.037 },
  { x: 575.5, y: 1722.54 },
  { x: 319,   y: 2588.54 },
];

const SEGS = (() => {
  let total = 0;
  const s = PTS.slice(0, -1).map((p, i) => {
    const dx = PTS[i+1].x - p.x;
    const dy = PTS[i+1].y - p.y;
    const len = Math.hypot(dx, dy);
    total += len;
    return { dx, dy, len };
  });
  return { s, total };
})();

// t values at each rectangular waypoint (PTS[1], PTS[2], PTS[3])
export const T_WAYPOINTS = [
  SEGS.s[0].len / SEGS.total,
  (SEGS.s[0].len + SEGS.s[1].len) / SEGS.total,
  1.0,
];

export const TIMELINE_ITEMS = [
  { id: 1, year: "2006", title: "Whatever People Say I Am, That's What I'm Not", body: "Debut album. Recorded in Sheffield for £10k, it became the fastest-selling debut in UK chart history — raw, urgent, and completely alive." },
  { id: 2, year: "2009", title: "Humbug", body: "Produced with Josh Homme in the California desert. A dark, psychedelic pivot that proved the band were done playing it safe." },
  { id: 3, year: "2013", title: "AM", body: "Their fifth album and global breakthrough. Stoner-rock riffs, R&B influence, and Turner's most cinematic lyricism — a modern classic." },
];

function pointAt(t) {
  let target = t * SEGS.total;
  let acc = 0;
  for (let i = 0; i < SEGS.s.length; i++) {
    const { dx, dy, len } = SEGS.s[i];
    if (acc + len >= target || i === SEGS.s.length - 1) {
      const lt = len === 0 ? 0 : Math.min((target - acc) / len, 1);
      return { x: PTS[i].x + dx * lt, y: PTS[i].y + dy * lt };
    }
    acc += len;
  }
  return PTS[PTS.length - 1];
}

// Star size in viewBox units
const STAR_VB = 450;
const CARD_THRESHOLD = 0.15;

export default function TimelineWithStar({ progressRef, sectionRef, cardsRef }) {
  const starGRef  = useRef(null);
  const svgRef    = useRef(null);
  const rafRef    = useRef(null);
  const currentT  = useRef(0);
  const targetT   = useRef(0);
  const spin      = useRef(0);
  const rotYCur   = useRef(0);
  const rotZCur   = useRef(0);
  const scaleCur  = useRef(1);
  const perspRotY = useRef(0);
  const perspRotX = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef?.current;
      if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const t = Math.max(0, Math.min(1, -rect.top / total));
      targetT.current = t;
      if (progressRef) progressRef.current = t;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const g = starGRef.current;
      if (!g) return;

      const prev = currentT.current;
      currentT.current += (targetT.current - currentT.current) * 0.08;
      const delta = currentT.current - prev;
      spin.current += delta * 300;

      const pt    = pointAt(currentT.current);
      const normX = (pt.x / VB_W) - 0.5;
      const normY = (pt.y / VB_H);

      rotYCur.current  += (normX * 55  - rotYCur.current)  * 0.06;
      rotZCur.current  += (normX * 18  - rotZCur.current)  * 0.06;
      scaleCur.current += ((0.7 + normY * 0.6) - scaleCur.current) * 0.06;

      // Perspective 3D sur le SVG entier
      perspRotY.current += (normX * 22 - perspRotY.current) * 0.04;
      perspRotX.current += ((normY - 0.5) * -14 - perspRotX.current) * 0.04;
      if (svgRef.current) {
        svgRef.current.style.transform =
          `perspective(900px) rotateY(${perspRotY.current}deg) rotateX(${perspRotX.current}deg)`;
      }

      g.setAttribute(
        "transform",
        `translate(${pt.x}, ${pt.y}) rotate(${spin.current + rotZCur.current})`
      );

      // Update card opacities directly (no re-render)
      if (cardsRef?.current) {
        T_WAYPOINTS.forEach((tw, i) => {
          const el = cardsRef.current[i];
          if (!el) return;
          const dist = Math.abs(currentT.current - tw);
          el.style.opacity = dist < CARD_THRESHOLD ? "1" : "0";
        });
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center w-full" style={{ width: "100%", height: "100vh", position: "relative", paddingTop: "4rem", paddingBottom: "4rem", boxSizing: "border-box" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", height: "100%", width: "auto", overflow: "visible" }}
      >
        {/* Timeline strokes */}
        <path d="M338.5 91.0366L35.5 837.037L575.5 1722.54L319 2588.54" stroke="white" strokeWidth="30"/>
        <path d="M338.5 91.0366L35.5 837.037L575.5 1722.54L319 2588.54" stroke="black"  strokeWidth="15"/>

        {/* Markers */}
        <path d="M292.463 34.3223L381.971 0.000173337L416.293 89.5073L326.785 123.829L292.463 34.3223Z" fill="white"/>
        <path d="M321.981 47.4768L368.816 29.5176L386.775 76.3528L339.94 94.312L321.981 47.4768Z"       fill="black"/>
        <path d="M258.843 2571.11L331.04 2550.38L351.769 2622.58L279.571 2643.31L258.843 2571.11Z"      fill="white"/>
        <path d="M280.994 2583.38L318.771 2572.53L329.618 2610.31L291.84 2621.15L280.994 2583.38Z"      fill="black"/>
        <path d="M525.064 1787.66L508.271 1695.6L600.335 1678.81L617.127 1770.87L525.064 1787.66Z"      fill="white"/>
        <path d="M543.006 1761.72L534.22 1713.54L582.393 1704.76L591.179 1752.93L543.006 1761.72Z"      fill="black"/>
        <path d="M0 839.717L41.6368 788.537L92.8169 830.174L51.1801 881.354L0 839.717Z"                 fill="white"/>
        <path d="M22.125 837.442L43.9117 810.662L70.692 832.448L48.9053 859.229L22.125 837.442Z"        fill="black"/>

        {/* Star as SVG <g> — perfectly locked to path, no pixel math */}
        <g ref={starGRef} transform={`translate(${PTS[0].x}, ${PTS[0].y})`}>
          <g transform={`translate(${-STAR_VB / 2}, ${-STAR_VB / 2}) scale(${STAR_VB / 337})`}>
            <path d="M193.957 141.433L194.347 145.043L259.331 158.656L202.071 184.353L198.757 185.84L199.147 189.451L205.891 251.848L163.759 205.333L161.32 202.64L158.006 204.128L100.746 229.823L131.966 175.379L133.774 172.228L131.334 169.535L89.2011 123.018L154.185 136.631L155.992 133.48L187.212 79.034L193.957 141.433Z" fill="white" stroke="black" strokeWidth="10"/>
            <path d="M198.815 147.025L198.481 150.641L259.473 176.874L198.253 190.701L194.711 191.501L194.376 195.119L188.608 257.613L156.541 203.665L154.685 200.541L151.141 201.342L89.9223 215.167L131.323 167.999L133.719 165.268L131.863 162.146L99.7946 108.195L160.787 134.428L163.182 131.699L204.583 84.528L198.815 147.025Z" fill="black" stroke="white" strokeWidth="10"/>
            <path d="M202.834 154.329L201.702 157.78L255.311 196.951L192.549 196.781L188.917 196.771L187.785 200.223L168.229 259.858L148.996 200.118L147.883 196.66L144.251 196.65L81.49 196.479L132.364 159.727L135.309 157.6L134.196 154.142L114.963 94.3999L168.571 133.571L171.515 131.444L222.391 94.6911L202.834 154.329Z" fill="white" stroke="black" strokeWidth="10"/>
          </g>
        </g>
      </svg>
    </div>
  );
}
