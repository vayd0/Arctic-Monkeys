import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
function Video({ name }) {
  const videoSrc = `/videos/${name}`;
  const articleRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!articleRef.current) return;
    if (!videoRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const randomRotate = Math.random() * 10 - 5;

    gsap.fromTo(
      articleRef.current,
      { scale: 0.2, opacity: 0, rotate: randomRotate },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

    const targetRotate = Math.random() * 10 - 5;
    const handleScroll = () => {
      if (!articleRef.current) return;
      const scrollY = window.scrollY;
      const translateY = Math.min(scrollY, 200);
      const rotate = targetRotate * (translateY / 200);
      articleRef.current.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <article
      ref={articleRef}
      className="relative"
      style={{ margin: 0, padding: 0, width: "100%", height: "100%" }}
    >
      <div className="absolute right-0 top-[-2rem]">
        <h1
          className="text-right text-back orbitron"
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
