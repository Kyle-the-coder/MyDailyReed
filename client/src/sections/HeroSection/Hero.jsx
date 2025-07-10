import { useEffect, useState } from "react";
import heroBg from "../../assets/heroImg/MDRLogoCup.webp";
import heroBgMobile from "../../assets/heroImg/MDRHeroBgPhone.webp";
import "./hero.css";
import { WordButton } from "../../components/Buttons/WordButton/WordButton";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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
          <h1
            className="playfair-font green-text"
            style={{ marginBottom: "10px" }}
          >
            Reed
          </h1>
          <WordButton
            text="See Blogs"
            onClick={() => {
              navigate("/blogs");
              window.scrollTo(0, 0);
            }}
          />
        </>
      ) : (
        <>
          <div
            style={{
              height: windowWidth > 1400 ? "90%" : "80%",
              width: "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              zIndex: 3,
              transition: "all .3s",
            }}
          >
            <h1 className="playfair-font green-text">My</h1>
            <h1 className="playfair-font green-text">Daily</h1>
            <h1 className="playfair-font green-text">Reed</h1>
            <WordButton
              text="See Blogs"
              onClick={() => {
                navigate("/blogs");
                window.scrollTo(0, 0);
              }}
            />
          </div>
          <img src={heroBg} />
        </>
      )}
    </section>
  );
}
