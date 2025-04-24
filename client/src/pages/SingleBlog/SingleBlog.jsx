import { useEffect } from "react";
import { SbTitle } from "../../sections/SingleBlogSections/SbTitle/SbTitle";
import { scrollToSection } from "../../components/SmoothScroll";
import { SbArticle } from "../../sections/SingleBlogSections/SbArticle/SbArticle";

function SingleBlog() {
  return (
    <section id="single-blog" className="display-column">
      <SbTitle />
      <SbArticle />
    </section>
  );
}

export const singleBlogRoute = {
  element: SingleBlog(),
};
