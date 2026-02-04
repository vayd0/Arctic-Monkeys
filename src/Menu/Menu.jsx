import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";

function Menu() {
  const linksSectionRef = useRef(null);
  useEffect(() => {
    if (menuContainerRef.current) {
      gsap.set(menuContainerRef.current, {
        bottom: isOpen ? "5rem" : "-16rem",
      });
    }
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const menuContainerRef = useRef(null);

  const openMenu = () => {
    gsap.to(menuContainerRef.current, {
      bottom: "5rem",
      duration: 0.1,
      ease: "cubic-bezier(0.10,0.01,0.03,0.99)",
    });
    setIsOpen(true);
    setTimeout(() => {
      if (linksSectionRef.current) {
        gsap.fromTo(
          linksSectionRef.current,
          { x: 200, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
        );
      }
    }, 120);
  };

  const closeMenu = () => {
    if (isOpen) {
      gsap.to(menuContainerRef.current, {
        bottom: "-16rem",
        duration: 0.1,
        ease: "cubic-bezier(0.10,0.01,0.03,0.99)",
      });
      if (linksSectionRef.current) {
        gsap.to(linksSectionRef.current, {
          x: 400,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
      setTimeout(() => {
        setIsOpen(false);
      }, 120);
    }
  };

  const handleMenuClick = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <div>
      <div
        ref={menuContainerRef}
        className="z-[100] absolute bottom-[-20rem] right-[-2.5rem] md:right-[1.3rem]"
        style={{ transition: "bottom 0.8s" }}
      >
        <div className="relative w-[808px] h-[512px]">
          <svg
            width="808"
            height="512"
            viewBox="0 0 808 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M775.218 491.233L86.755 491.233L397.792 246.902L488.357 33.8517L742.823 80.6499L775.218 491.233Z"
              fill="white"
            />
            <path
              d="M775.218 491.233L86.755 491.233L397.792 246.902L488.357 33.8517L742.823 80.6499L775.218 491.233Z"
              fill="white"
            />
            <path
              d="M775.218 491.233L86.755 491.233L397.792 246.902L488.357 33.8517L742.823 80.6499L775.218 491.233Z"
              stroke="white"
              strokeWidth="60"
            />
          </svg>
          <div className="absolute right-[4rem] top-[3rem] rotate-[10deg]">
            <section className="flex items-center">
              <h1
                className="text-black text-2xl font-light orbitron cursor-pointer mr-[10rem] hover:italic hover:-skew-x-6 hover:font-medium transition-all duration-200"
                onClick={handleMenuClick}
              >
                Menu
              </h1>
              <span
                className={`cursor-pointer ${isOpen ? "z-[102]" : "z-[1]"}`}
                id="closeBtn"
                onClick={closeMenu}
              >
                <X color="black" size={25} />
              </span>
            </section>
          </div>
          {isOpen && (
            <section
              ref={linksSectionRef}
              className="absolute right-[-5.5rem] top-[8rem] flex flex-col text-end"
              style={{ opacity: 0 }}
            >
              <a
                className="text-black text-2xl font-light orbitron cursor-pointer mr-[10rem] hover:italic hover:-skew-x-6 hover:font-medium transition-all duration-200"
                href="#discover"
              >
                Discover
              </a>
              <a
                className="text-black text-2xl font-light orbitron cursor-pointer mr-[10rem] hover:italic hover:-skew-x-6 hover:font-medium transition-all duration-200"
                href="#musics"
              >
                Musics
              </a>
            </section>
          )}

          <section
            className="absolute right-[7rem] bottom-[6rem] text-start text-[5vw]"
            style={{ opacity: 1 }}
          >
            <h1 className="stretched text-black">ARCTIC <br/>MOONKEYS</h1>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Menu;
