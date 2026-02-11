import { useState } from "react";
import Border from "../Border";
import Video from "../Video";
import TextBlock from "../TextBlock";
import Dither from "../Dither";
function Intro() {
  return (
    <>
      <div className="relative h-[100vh] w-[100vw] overflow-hidden flex items-center">
        <section className="w-[15rem] md:w-[30rem] flex items-center mx-auto gap-2 z-[350]">
          <div className="h-[3rem] w-[10rem] m-auto">
            <TextBlock content="Discover" />
          </div>
          <div className="h-[3rem] w-[10rem] m-auto hidden md:block">
            <TextBlock content="Welcome" />
          </div>
          <div className="h-[3rem] w-[10rem] m-auto">
            <TextBlock content="Musics" />
          </div>
        </section>

        {/*Desktop*/}
        <section className="hidden md:block">
          <article className="absolute z-[0] top-[0] left-[0] m-10 p-0 w-[120vw] h-[120vh]">
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <Dither
                waveColor={[1, 1, 1]}
                disableAnimation={false}
                colorNum={4}
                pixelSize={2}
                waveAmplitude={0.3}
                waveFrequency={3}
                waveSpeed={0.05}
              />
            </div>
          </article>
          <article className="absolute z-[300] top-[10rem] right-[5rem] m-10 p-0 w-[50vw]">
            <Video name="RUM.mp4" style={{ filter: "grayscale(100%)" }} />
          </article>
          <article className="absolute z-[300] top-[7rem] left-[10rem] m-10 p-0 w-[35vw]">
            <Video name="RUM.mp4" style={{ filter: "grayscale(100%)" }} />
          </article>
          <article className="absolute z-[300] bottom-[10rem] left-[15rem] m-10 p-0 w-[40vw]">
            <Video name="RUM.mp4" style={{ filter: "grayscale(100%)" }} />
          </article>
          <article className="absolute z-[300] top-[17rem] right-[15rem] m-10 p-0 w-[30vw]">
            <Video name="RUM.mp4" style={{ filter: "grayscale(100%)" }} />
          </article>
        </section>
        {/*Mobile*/}
        <section className="absolute block md:hidden">
          <article className="w-[100vw] h-[100vh]">
            <Video name="LVTLC.mp4" />
          </article>
        </section>
        <div className="absolute top-0 left-0">
          <Border />
        </div>
      </div>
    </>
  );
}

export default Intro;
