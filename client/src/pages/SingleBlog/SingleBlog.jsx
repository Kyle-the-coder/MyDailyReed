import { useEffect } from "react";
import { SbTitle } from "../../sections/SingleBlogSections/SbTitle/SbTitle";
import { scrollToSection } from "../../components/SmoothScroll";
import { SbArticle } from "../../sections/SingleBlogSections/SbArticle/SbArticle";
import { Social } from "../../sections/SingleBlogSections/Social/Social";
import { Sidebar } from "../../components/Sidebar/Sidebar";

function SingleBlog() {
  return (
    <section id="single-blog" className="display-column">
      <SbTitle />
      <SbArticle />
      <Sidebar />
      <Social />
    </section>
  );
}

export const singleBlogRoute = {
  element: SingleBlog(),
};
