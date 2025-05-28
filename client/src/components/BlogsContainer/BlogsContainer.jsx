import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../../utils/blogApi";
import { PostLoader } from "../Loader/PostLoader/PostLoader.jsx";
import articleImg from "../../assets/placeholders/Artc1.png";
import x from "../../assets/icons/x-button.png";
import "./blogscontainer.css";

export function BlogsContainer({
  isVertical = false,
  title,
  subTitle,
  height,
  marginBottom,
  trending = false,
  maxCount,
  nav,
  blogArray,
  del,
}) {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const visibleCount = maxCount ?? 4;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await getBlogs();

        let sortedBlogs;

        if (trending) {
          sortedBlogs = [...data].sort((a, b) => {
            const likesA = Array.isArray(a.likes) ? a.likes.length : 0;
            const likesB = Array.isArray(b.likes) ? b.likes.length : 0;
            return likesB - likesA;
          });
        } else {
          sortedBlogs = [...data].sort((a, b) => {
            const dateA = a.datePosted?.toDate?.() || new Date(0);
            const dateB = b.datePosted?.toDate?.() || new Date(0);
            return dateB - dateA;
          });
        }

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (blogArray && blogArray.length > 0) {
      setBlogs(blogArray);
      setIsLoading(false);
    } else {
      fetchBlogs();
    }
  }, [trending, blogArray]);

  return (
    <section className="display-column">
      <div className="title-container">
        <div className="info-container">
          <h1 className="outfit-font">{title}</h1>
          <h1 className="outfit-font">{subTitle}</h1>
        </div>

        <div className="line-blog"></div>
      </div>

      <div
        ref={containerRef}
        className={`blog-column-container ${
          isVertical ? "vertical" : "horizontal"
        }`}
      >
        {isLoading ? (
          <PostLoader />
        ) : (
          blogs.slice(0, visibleCount).map((blog, index) => (
            <div
              key={blog.id || index}
              className="blog-info-container"
              style={{ marginBottom: marginBottom }}
              onClick={() => {
                navigate(`/${nav}/${blog.id}`);
                window.scrollTo({ top: 0 });
              }}
            >
              <img
                src={blog.imgUrl || articleImg}
                alt={blog.title || "Blog image"}
                style={{ height: height }}
              />
              {del && (
                <img
                  src={x}
                  style={{ width: "40px", height: "40px" }}
                  className="dele-button"
                />
              )}
              <p className="playfair-thin-font">{blog.subTitle}</p>
              <h3>
                {blog.title || "Untitled"}{" "}
                {blog.part ? `Part ${blog.part}` : ""}
              </h3>
              <p className="playfair-thin-font silver-text">
                {blog.author || "Unknown Author"}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
