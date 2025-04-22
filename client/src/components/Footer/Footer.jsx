import { ToTopButton } from "../Buttons/ToTopButton/ToTopButton";
import logo from "../../assets/logo/MDRLogoB.png";
import linked from "../../assets/icons/linkedInBlack.png";
import fb from "../../assets/icons/facebookBlack.png";
import insta from "../../assets/icons/instagramBlack.png";
import "./footer.css";
import { WordButton } from "../Buttons/WordButton/WordButton";
import { scrollToSection } from "../SmoothScroll";

export function Footer() {
  return (
    <section id="footer" className="footer-main-container">
      <div className="footer-blerb">
        <h3 className="outfit-font">
          How has Mydailyreed connected to you? Leave a Comment, Get email
          updates. Follow on social.
        </h3>
      </div>
      <div className="footer-logo-signup">
        <img src={logo} />
        <div className="footer-newsletter">
          <h3 className="playfair-font">Sign up for Newsletter:</h3>
          <input type="text playfair-font" placeholder="Type your email..." />
          <WordButton text="Submit" />
        </div>
      </div>

      <div className="footer-contact">
        <h1 className="outfit-font">Contacts:</h1>
        <div className="footer-icons">
          <img src={linked} />
          <img src={fb} />
          <img src={insta} />
        </div>
      </div>

      <div className="to-top-button" onClick={() => scrollToSection("#nav")}>
        <ToTopButton />
      </div>
    </section>
  );
}
