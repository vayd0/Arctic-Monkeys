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
        <svg
          className="absolute -bottom-100 right-10"
          width="665"
          height="665"
          viewBox="0 0 665 665"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M123.999 398.633L191.968 421.595L209.42 341.685L182.783 257.182L209.42 214.931L571.312 90.0139L502.424 241.568L551.105 467.521L484.972 530.898L394.959 509.772L371.996 421.595L418.84 372.914H484.972L447.314 241.568H387.61L249.834 295.76V390.366L261.775 523.55L200.235 596.112L91.8508 585.09L48.6809 475.787L123.999 398.633Z"
            fill="white"
            stroke="black"
          />
        </svg>
      </div>
    </>
  );
}

export default App;
