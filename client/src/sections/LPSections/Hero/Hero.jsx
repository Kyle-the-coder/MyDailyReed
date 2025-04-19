import { useEffect, useState } from "react";
import heroBg from "../../../assets/heroImg/MDRHeroBg2.png";
import heroBgMobile from "../../../assets/heroImg/MDRHeroBgPhone.png";
import "./hero.css";

export function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="hero-main-container">
      {windowWidth <= 800 ? (
        <>
          <img src={heroBgMobile} />
          <h1 className="playfair-font green-text">My</h1>
          <h1 className="playfair-font green-text">Daily</h1>
          <h1 className="playfair-font green-text">Reed</h1>
        </>
      ) : (
        <>
          <img src={heroBg} /> <h1 className="playfair-font green-text">My</h1>
          <h1 className="playfair-font green-text">Daily</h1>
          <h1 className="playfair-font green-text">Reed</h1>
        </>
      )}
    </section>
  );
}
