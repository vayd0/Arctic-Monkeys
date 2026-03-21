import Menu from "../Menu";
import Video from "../Video";
import TextBlock from "../TextBlock";
import Dither from "../Dither";
function Intro() {
  return (
    <>
      <div className="relative h-[100vh] w-[100vw] overflow-hidden flex items-center">
        <section className="w-[15rem] md:w-[30rem] flex items-center mx-auto gap-2 z-[350]">
          <div className="h-[3rem] w-[10rem] m-auto">
            <TextBlock contrast={1} content="Découvrir" />
          </div>
          <div className="h-[3rem] w-[10rem] m-auto hidden md:block">
            <TextBlock contrast={1} content="Bienvenue" />
          </div>
          <div className="h-[3rem] w-[10rem] m-auto">
            <TextBlock contrast={1} content="Musiques" />
          </div>
        </section>

        <section className="hidden md:block">
          <article className="absolute z-[0] top-[0] left-[0] p-0 w-[120vw] h-[120vh]">
            <Video name="RUM.mp4" style={{ filter: "grayscale(100%)" }} />
          </article>

        </section>
        <section className="absolute block md:hidden">
          <article className="w-[100vw] h-[100vh]">
            <Video name="LVTLC.mp4" />
          </article>
        </section>
        <div className="absolute inset-0">
          <Menu />
        </div>
      </div>
    </>
  );
}

export default Intro;
