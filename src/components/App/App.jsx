import { useState } from "react";
import "./App.css";
import Intro from "../Intro";
import Group from "../Group";

function App() {
  return (
    <>
      <Intro />
      <div className="relative h-[100vh] overflow-hidden">
        <svg
          width="1902"
          height="375"
          viewBox="0 0 1902 375"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[-10rem] left-[-10rem]"
        >
          <path
            d="M260.281 335.467L398.281 262.467L1236.78 185.467L1781.28 335.467L1859.78 108.569L57.7812 32.4668L260.281 335.467Z"
            fill="white"
            stroke="white"
            strokeWidth="60"
          />
        </svg>
        <svg
          className="absolute top-[-14rem] right-[-20rem] rotate-[20deg] hidden md:block"
          width="1000"
          height="898"
          viewBox="0 0 1457 898"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "scaleY(-1) scaleX(-1)" }}
        >
          <path
            d="M2.87878 559.381L264.879 766.381L323.379 896.881L1311.38 711.881L1578.38 383.881H1258.38L1311.38 1.88086L819.379 283.881L478.379 29.3809V383.881L126.879 246.381L305.879 559.381H2.87878Z"
            fill="white"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        <div className="mt-7">
          <Group />
        </div>
      </div>
    </>
  );
}

export default App;
