import { useState } from "react";
import Border from "../Border";
import Video from "../Video";
function Intro() {
  return (
    <>
      <div className="relative h-[100vh] w-[100vw] overflow-hidden">
        <section className="absolute z-[300] top-[5rem] right-[5rem] m-10 p-0 h-[20vw] w-[50vw]">
          <Video name="OFTR.mp4" />
        </section>
        <div className="absolute top-0 left-0 z-[200]">
          <Border />
        </div>
      </div>
    </>
  );
}

export default Intro;
