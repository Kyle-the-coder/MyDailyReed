import logo from "../../assets/logo/MDRLogoB.png";
import linked from "../../assets/icons/linkedInBlack.png";
import fb from "../../assets/icons/facebookBlack.png";
import insta from "../../assets/icons/instagramBlack.png";
import login from "../../assets/icons/import.png";
import { ToTopButton } from "../Buttons/ToTopButton/ToTopButton";
import { WordButton } from "../Buttons/WordButton/WordButton";
import { scrollToSection } from "../SmoothScroll";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import "./footer.css";

export function Footer() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const db = getFirestore(app);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const newsletterRef = collection(db, "newsletter");
      const q = query(newsletterRef, where("email", "==", email.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("You are already subscribed with this email.");
        return;
      }

      await addDoc(newsletterRef, {
        email: email.trim(),
        createdAt: new Date(),
      });

      alert("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      console.error("Error checking or adding email:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const NewsletterInput = (
    <div className="footer-newsletter">
      <h3 className="playfair-font">Sign up for Newsletter:</h3>
      <input
        className="playfair-font"
        type="email"
        placeholder="Type your email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <WordButton
        text="Submit"
        fontSize="1.3rem"
        onClick={handleSubmit}
        title="Submit"
      />
    </div>
  );

  return (
    <section id="footer" className="footer-main-container">
      {windowWidth < 800 ? (
        <>
          <div className="footer-logo-signup">
            <img src={logo} />
          </div>

          <div className="footer-contact">
            <h1 className="outfit-font">Contacts:</h1>
            <div className="footer-icons">
              <img src={linked} />
              <img src={fb} />
              <img src={insta} />
            </div>
          </div>

          <div className="footer-blerb">
            <h3 className="outfit-font">
              How has Mydailyreed connected to you? Leave a Comment, Get email
              updates. Follow on social.
            </h3>
          </div>

          {NewsletterInput}

          <div
            className="to-top-button"
            onClick={() => scrollToSection("#nav")}
          >
            <ToTopButton />
          </div>
          <a href="#nav">
            <img
              src={login}
              className="login-button"
              onClick={() => {
                navigate("/login");
              }}
            />
          </a>
        </>
      ) : (
        <>
          <div className="footer-blerb">
            <h3 className="outfit-font">
              How has Mydailyreed connected to you? Leave a Comment, Get email
              updates. Follow on social.
            </h3>
          </div>
          <div className="footer-logo-signup">
            <img src={logo} />
            {NewsletterInput}
          </div>
          <div className="footer-contact">
            <h1 className="outfit-font">Contacts:</h1>
            <div className="footer-icons">
              <img src={linked} />
              <img src={fb} />
              <img src={insta} />
            </div>
          </div>
          <div
            className="to-top-button"
            onClick={() => scrollToSection("#nav")}
          >
            <ToTopButton />
          </div>
          <a href="#nav">
            <img
              src={login}
              className="login-button"
              onClick={() => {
                navigate("/login");
              }}
            />
          </a>
        </>
      )}
    </section>
  );
}
