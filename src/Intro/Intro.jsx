import { useState } from "react";
import Border from "../Border/Border";

function Intro() {

  return (
    <>
      <div className="relative h-[100vh] w-[100vw] overflow-hidden">
        <div class="z-[99999] absolute">
          <div className="w-[50vw] h-[30vh] bg-[#fff00]"> test</div>
        </div>
        <div className="absolute top-0 left-0 z-[200]">
          <Border />
        </div>
      </div>
    </>
  );
}

export default Intro;
