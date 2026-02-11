import { useState } from "react";
import Border from "../Border";
import Video from "../Video";
function TextBlock({ content, contrast = 0.8, color = "white", padding = "0.5rem 1rem" }) {
  const invert = contrast;
  const bgOpacity = 0.1 + 0.4 * contrast;
  return (
    <div
      className="flex justify-center items-center"
      style={{
        backdropFilter: `blur(10px) invert(${invert})`,
        backgroundColor: `rgba(0,0,0,${bgOpacity})`,
        height: "100%",
        width: "100%",
        padding: padding,
      }}
    >
      <h1
        className="orbitron"
        style={{
          mixBlendMode: "difference",
          color: color,
          backdropFilter: `invert(${invert})`,
        }}
      >
        {content}
      </h1>
    </div>
  );
}

export default TextBlock;
