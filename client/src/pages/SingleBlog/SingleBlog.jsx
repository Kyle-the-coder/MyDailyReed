import { useEffect, useState } from "react";
import { SbTitle } from "../../sections/SingleBlogSections/SbTitle/SbTitle";
import { scrollToSection } from "../../components/SmoothScroll";
import { SbArticle } from "../../sections/SingleBlogSections/SbArticle/SbArticle";
import { Social } from "../../sections/SingleBlogSections/Social/Social";
import { Sidebar } from "../../components/Sidebar/Sidebar";

function SingleBlog() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section id="single-blog" className="display-column">
      {windowWidth < 600 ? (
        <>
          <SbTitle />
          <div className="padding-40">
            <SbArticle />
          </div>

          <Social />
          <Sidebar author="My Daily Reed" />
        </>
      ) : (
        <>
          <SbTitle />
          <div className="flex-between padding-40 pos-relative">
            <SbArticle />
            <Sidebar author="My Daily Reed" />
          </div>
          <Social />
        </>
      )}
    </section>
  );
}

export const singleBlogRoute = {
  element: <SingleBlog />,
};
