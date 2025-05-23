import { useEffect, useState, useCallback, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { scrollToSection } from "../SmoothScroll";
import { useNavigate } from "react-router-dom";
import { Hamburger } from "../Hamburger/Hamburger";
import { db } from "../../firebaseConfig";
import logo from "../../assets/logo/MDRLogoB.png";
import fb from "../../assets/icons/facebookBlack.png";
import insta from "../../assets/icons/instagramBlack.png";
import linked from "../../assets/icons/linkedinBlack.png";
import arrow from "../../assets/icons/arrow.png";
import gsap from "gsap";
import "./nav.css";

export function Nav() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //Phone States
  const [isHamburgerActive, setIsHamburgerActive] = useState(null);
  const [isAnimationActive, setIsAnimtionActive] = useState(null);
  const navigate = useNavigate();
  //Search States
  const [searchInput, setSearchInput] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const searchResultsRef = useRef(null);
  const [isSearched, setIsSearched] = useState(null);

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

  //fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllBlogs(blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setFilteredBlogs([]);
        setIsSearched(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //filter blogs
  const handleSearch = () => {
    const trimmed = searchInput.trim().toLowerCase();
    if (!trimmed) {
      console.log("nothing");
      setFilteredBlogs([]);
      return;
    }

    const firstChar = trimmed[0];
    const matchingCategorySet = new Set();

    allBlogs.forEach((blog) => {
      if (Array.isArray(blog.categories)) {
        blog.categories.forEach((cat) => {
          if (cat.toLowerCase().includes(trimmed)) {
            matchingCategorySet.add(cat.toLowerCase());
          }
        });
      }
    });

    const filtered = allBlogs.filter((blog) => {
      const title = blog.title?.toLowerCase() || "";
      const subtitle = blog.subtitle?.toLowerCase() || "";
      const categories = Array.isArray(blog.categories)
        ? blog.categories.map((cat) => cat.toLowerCase())
        : [];

      return (
        title.includes(trimmed) ||
        subtitle.includes(trimmed) ||
        title[0] === firstChar ||
        categories.some((cat) => cat.includes(trimmed)) ||
        categories.some((cat) => matchingCategorySet.has(cat))
      );
    });

    setFilteredBlogs(filtered);
    setIsSearched(true);
  };

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
      {windowWidth <= 700 ? (
        <>
          <div className="logo-ham-container">
            <div className="logo">
              <img
                src={logo}
                onClick={() => {
                  navigate("/"), setHoverIndex(0);
                }}
              />
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
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setIsSearched(false);
              }}
            />
            <button
              onClick={() => {
                handleSearch();
              }}
              className="arrow-button green-bg"
              style={{ zIndex: "1" }}
            >
              <img src={arrow} />
            </button>
            <div
              ref={searchResultsRef}
              className="search-results-container silver-bg"
            >
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="search-result"
                  style={{ padding: "20px" }}
                  onClick={() => {
                    navigate(`/singleBlog/${blog.id}`);
                    setSearchInput(""); // clear input after navigating
                    setFilteredBlogs([]);
                    setIsSearched(null);
                  }}
                >
                  <img
                    style={{
                      width: "250px",
                      height: "120px",
                      marginBottom: "10px",
                      objectFit: "cover",
                    }}
                    src={blog.imgUrl}
                    alt={blog.title}
                  />
                  <div className="display-column" style={{ textAlign: "left" }}>
                    <h3 className="outfit-font" style={{ marginBottom: "5px" }}>
                      {blog.title} {blog.part && `Part ${blog.part}`}
                    </h3>
                    <p className="outfit-font">
                      <span
                        className="d-silver-text"
                        style={{ textDecoration: "underline" }}
                      >
                        Catgories:
                      </span>{" "}
                    </p>
                    <p style={{ textAlign: "center", marginTop: "5px" }}>
                      {blog.categories?.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
              {isSearched && filteredBlogs.length === 0 && (
                <p
                  className="outfit-font"
                  style={{ padding: "20px", textAlign: "center" }}
                >
                  No results found for "{searchInput}"
                </p>
              )}
            </div>
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
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setIsSearched(false);
              }}
            />
            <button
              onClick={() => {
                console.log("Search button clicked!");
                handleSearch();
              }}
              className="arrow-button green-bg"
              style={{ zIndex: "9" }}
            >
              <img src={arrow} />
            </button>
            <div
              ref={searchResultsRef}
              className="search-results-container silver-bg"
            >
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="search-result"
                  style={{ padding: "20px" }}
                  onClick={() => {
                    navigate(`/singleBlog/${blog.id}`);
                    setSearchInput(""); // clear input after navigating
                    setFilteredBlogs([]);
                    setIsSearched(null);
                  }}
                >
                  <img
                    style={{
                      width: "250px",
                      height: "120px",
                      marginBottom: "10px",
                      objectFit: "cover",
                    }}
                    src={blog.imgUrl}
                    alt={blog.title}
                  />
                  <div className="display-column" style={{ textAlign: "left" }}>
                    <h3 className="outfit-font" style={{ marginBottom: "5px" }}>
                      {blog.title} {blog.part && `Part ${blog.part}`}
                    </h3>
                    <p className="outfit-font">
                      <span
                        className="d-silver-text"
                        style={{ textDecoration: "underline" }}
                      >
                        Catgories:
                      </span>{" "}
                    </p>
                    <p style={{ textAlign: "center", marginTop: "5px" }}>
                      {blog.categories?.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
              {isSearched && filteredBlogs.length === 0 && (
                <p
                  className="outfit-font"
                  style={{ padding: "20px", textAlign: "center" }}
                >
                  No results found for "{searchInput}"
                </p>
              )}
            </div>
          </div>
          <div className="logo-links">
            <img
              src={logo}
              onClick={() => {
                navigate("/"), setHoverIndex(0);
              }}
            />
            <div className="links">
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
