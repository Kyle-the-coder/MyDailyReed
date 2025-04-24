import { useEffect, useState } from "react";
import heroBg from "../../assets/heroImg/MDRHeroBg2.png";
import heroBgMobile from "../../assets/heroImg/MDRHeroBgPhone.png";
import "./hero.css";
import { WordButton } from "../../components/Buttons/WordButton/WordButton";

export function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="hero-main-container">
      {windowWidth <= 600 ? (
        <>
          <img src={heroBgMobile} />
          <h1 className="playfair-font green-text">My</h1>
          <h1 className="playfair-font green-text">Daily</h1>
          <h1 className="playfair-font green-text">Reed</h1>
          <WordButton text="See Blogs" />
        </>
      ) : (
        <>
          <img src={heroBg} /> <h1 className="playfair-font green-text">My</h1>
          <h1 className="playfair-font green-text">Daily</h1>
          <h1
            style={{ marginBottom: "10px" }}
            className="playfair-font green-text"
          >
            Reed
          </h1>
          <WordButton text="See Blogs" />
        </>
      )}
    </section>
  );
}
