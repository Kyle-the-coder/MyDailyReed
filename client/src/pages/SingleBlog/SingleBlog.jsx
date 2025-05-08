import { useEffect, useState } from "react";
import { SbTitle } from "../../sections/SingleBlogSections/SbTitle/SbTitle";
import { scrollToSection } from "../../components/SmoothScroll";
import { SbArticle } from "../../sections/SingleBlogSections/SbArticle/SbArticle";
import { Social } from "../../sections/SingleBlogSections/Social/Social";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Loader } from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../utils/blogApi";

function SingleBlog() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };

    fetchBlog();
    scrollToSection("#nav");
  }, [id]);

  return (
    <section id="single-blog" className="display-column">
      {blog ? (
        <>
          {" "}
          {windowWidth < 600 ? (
            <>
              <SbTitle
                title={blog.title}
                subTitle={blog.subTitle}
                author={blog.author}
                datePosted={blog.datePosted}
                readTime={blog.readTime}
                titleImg={blog.imgUrl}
                part={blog.part}
                description={
                  blog.content.find((item) => item.type === "Description")
                    ?.value
                }
                redirectLink={blog.redirectLink}
              />
              <div className="padding-40">
                <SbArticle content={blog.content} />
              </div>

              <Social />
              <Sidebar author="My Daily Reed" />
            </>
          ) : (
            <>
              <SbTitle
                title={blog.title}
                subTitle={blog.subTitle}
                author={blog.author}
                datePosted={blog.datePosted}
                readTime={blog.readTime}
                titleImg={blog.imgUrl}
                part={blog.part}
                description={
                  blog.content.find((item) => item.type === "Description")
                    ?.value
                }
                redirectLink={blog.redirectLink}
              />
              <div className="flex-between padding-40 pos-relative">
                <SbArticle content={blog.content} />
                <Sidebar author="My Daily Reed" />
              </div>
              <Social />
            </>
          )}
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </section>
  );
}

export const singleBlogRoute = {
  element: <SingleBlog />,
};
