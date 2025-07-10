import { useEffect, useState } from "react";
import heroBg from "../../../assets/heroImg/dashboardBg.webp";
import heroBgPhone from "../../../assets/heroImg/dashboardBgPhone.webp";

import "./dbhero.css";

export function DBHero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="db-hero-main-container">
      {windowWidth <= 600 ? (
        <>
          <img src={heroBgPhone} />
          <h1 className="outfit-font ">Welcome</h1>
          <h1 className="outfit-font green-text">To Your</h1>
          <h1 className="outfit-font green-text">Dashboard</h1>
        </>
      ) : (
        <>
          <img src={heroBg} />{" "}
          <h1 className="outfit-font green-text">Welcome</h1>
          <h1 className="outfit-font green-text">To Your</h1>
          <h1
            style={{ marginBottom: "10px" }}
            className="outfit-font green-text"
          >
            Dashboard
          </h1>
        </>
      )}
    </section>
  );
}
