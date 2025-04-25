import { useEffect } from "react";
import { SbTitle } from "../../sections/SingleBlogSections/SbTitle/SbTitle";
import { scrollToSection } from "../../components/SmoothScroll";
import { SbArticle } from "../../sections/SingleBlogSections/SbArticle/SbArticle";
import { Social } from "../../sections/SingleBlogSections/Social/Social";

function SingleBlog() {
  return (
    <section id="single-blog" className="display-column">
      <SbTitle />
      <SbArticle />
      <Social />
    </section>
  );
}

export const singleBlogRoute = {
  element: SingleBlog(),
};
