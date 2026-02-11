import { useState } from "react";
import Border from "../Border";
import Video from "../Video";
function TextBlock(props) {
  return (
    <>
      <div
      className="flex justify-center items-center"
        style={{
          backdropFilter: "blur(10px) invert(0.8)",
          backgroundColor:"rgba(0,0,0,0.1)",
          height:"100%",
          width:"100%"
        }}
      >
        <h1 className="orbitron" style={{
            mixBlendMode:"difference",
            color:"white",
            backdropFilter:"invert(1)"
        }}>{props.content}</h1>
      </div>
    </>
  );
}

export default TextBlock;
