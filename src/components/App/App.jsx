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
            stroke-width="60"
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
