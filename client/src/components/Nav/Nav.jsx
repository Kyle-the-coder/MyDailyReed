import { useEffect, useState, useCallback, act } from "react";
import { useNavigate } from "react-router-dom";
import { Hamburger } from "../Hamburger/Hamburger";
import logo from "../../assets/logo/MDRLogoB.png";
import fb from "../../assets/icons/facebookBlack.png";
import insta from "../../assets/icons/instagramBlack.png";
import linked from "../../assets/icons/linkedinBlack.png";
import gsap from "gsap";
import "./nav.css";
import { scrollToSection } from "../SmoothScroll";
import { ArrowButton } from "../Buttons/ArrowButton/ArrowButton";

export function Nav() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //Phone States
  const [isHamburgerActive, setIsHamburgerActive] = useState(null);
  const [isAnimationActive, setIsAnimtionActive] = useState(null);
  const navigate = useNavigate();

  const links = [
    { linkName: "Home", link: "/" },
    { linkName: "About", link: "/about" },
    { linkName: "Blogs", link: "/blogs" },
    { linkName: "Contact", link: "#footer" },
  ];

  const handleMouseEnter = useCallback((index) => {
    setHoverIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (hoverIndex !== null) {
      gsap.from(".active", {
        scaleX: 0,
        transformOrigin: "50% 50%",
        ease: "power4.out",
        duration: 0.8,
      });
    }
  }, [hoverIndex]);

  function handleActivateHamburger() {
    if (!isHamburgerActive) {
      setIsHamburgerActive(true);
      setIsAnimtionActive(true);
    } else if (isHamburgerActive) {
      setIsAnimtionActive(false);
      gsap.to(".navbar-phone-dropdown-container", {
        x: "-100%",
        duration: 1.2,
        ease: "power4.in",
        onComplete: () => {
          setIsHamburgerActive(false);
        },
      });
    }
  }

  function handleScrollTo(link) {
    if (isHamburgerActive) {
      if (link === "#footer") {
        handleActivateHamburger();
        setTimeout(() => {
          scrollToSection(link);
        }, 1300);
      } else {
        navigate(link);
        handleActivateHamburger();
      }
    } else {
      if (link === "#footer") {
        scrollToSection(link);
      } else {
        navigate(link);
      }
    }
  }

  useEffect(() => {
    if (isHamburgerActive) {
      gsap.from(".navbar-phone-dropdown-container", {
        transform: "translateX(-100%)",
        duration: 1.2,
        ease: "power3.inOut",
      });
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isHamburgerActive]);

  return (
    <nav id="nav" className="nav-main-container charcoal-bg">
      {windowWidth <= 800 ? (
        <>
          <div className="logo-ham-container">
            <div className="logo ">
              <img src={logo} />
            </div>
            <div
              className="nav-hamburger-container "
              onClick={() => handleActivateHamburger()}
            >
              <Hamburger isOpened={isAnimationActive} />
            </div>
          </div>

          <div className="quick-search-container">
            <input
              type="text"
              className="playfair-font"
              placeholder="Quick Search..."
            />
            <ArrowButton />
          </div>

          {isHamburgerActive && (
            <div className="navbar-phone-dropdown-container dark-silver-bg">
              <div className="dropdown-links-container">
                {links.map((link, index) => (
                  <div key={link.linkName}>
                    <h3
                      className="outfit-font dropdown-link-name "
                      onClick={() => {
                        handleMouseEnter(index);
                        handleScrollTo(link.link);
                      }}
                    >
                      {link.linkName}
                      {hoverIndex === index && <div className="active"></div>}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="quick-search-container">
            <input
              type="text"
              className="playfair-font"
              placeholder="Quick Search..."
            />
            <ArrowButton />
          </div>
          <div className="logo-links ">
            <img src={logo} />
            <div className="links ">
              {links.map((link, index) => (
                <div
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleScrollTo(link.link)}
                  key={link.linkName}
                  className="link-container"
                >
                  <h1 className="outfit-font">{link.linkName}</h1>
                  {hoverIndex === index && <div className="active"></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="socials ">
            <img src={fb} />
            <img src={insta} />
            <img src={linked} />
          </div>
        </>
      )}
    </nav>
  );
}
