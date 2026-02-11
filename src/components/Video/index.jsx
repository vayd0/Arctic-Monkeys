import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
function Video({ name, border = false }) {
  const videoSrc = `/videos/${name}`;
  const articleRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!articleRef.current) return;
    if (!videoRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const randomRotate = Math.random() * 10 - 5;
    const offset = 100;

    gsap.fromTo(
      articleRef.current,
      { scale: 0.2, opacity: 0, rotate: randomRotate, y: offset },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );
  }, []);

  return (
    <article
      ref={articleRef}
      className={`relative${border ? ' border border-[1rem] border-black' : ''}`}
      style={{ margin: 0, padding: 0, width: "100%", height: "100%" }}
    >
      <div className="absolute right-2 top-1">
        <h1
          className="text-right text-white orbitron"
          style={{
            height: "auto",
            mixBlendMode: "difference"
          }}
        >
          {name}
        </h1>
      </div>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        style={{
          borderRadius: 2,
          margin: 0,
          padding: 0,
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      />
    </article>
  );
}

export default Video;
