import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "../../utils/useBlogs";
import { SbTitle } from "../../sections/SingleBlogSections/SbTitle/SbTitle";
import { scrollToSection } from "../../components/SmoothScroll";
import { SbArticle } from "../../sections/SingleBlogSections/SbArticle/SbArticle";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Loader } from "../../components/Loader/Loader";

export default function SingleBlog() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { id } = useParams();
  const blogs = useBlogs();

  // Find the blog with matching ID
  const blog = blogs.find((b) => b.id === id);

  // Resize logic
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    scrollToSection("#nav");
  }, [id]);

  if (!blog) return <Loader />;

  const description = blog.content.find(
    (item) => item.type === "Description"
  )?.value;
  const redirect = blog.content.find((item) => item.type === "Redirect")?.value;

  return (
    <section id="single-blog" className="display-column">
      {windowWidth < 620 ? (
        <>
          <SbTitle
            title={blog.title}
            subTitle={blog.subTitle}
            author={blog.author}
            datePosted={blog.datePosted}
            readTime={blog.readTime}
            titleImg={blog.imgUrl}
            part={blog.part}
            partName={redirect?.partName}
            partUrl={redirect?.partUrl}
            description={description}
            redirectLink={blog.redirectLink}
          />
          <div className="padding-20">
            <SbArticle content={blog.content} />
          </div>
          <Sidebar series={blog.series || null} author="My Daily Reed" />
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
            partName={redirect?.partName}
            partUrl={redirect?.partUrl}
            part={blog.part}
            description={description}
          />
          <div className="flex-between padding-40 pos-relative">
            <SbArticle content={blog.content} />
            <Sidebar series={blog.series || null} author="My Daily Reed" />
          </div>
        </>
      )}
    </section>
  );
}
