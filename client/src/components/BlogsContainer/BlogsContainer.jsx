import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../../utils/blogApi";
import { scrollToSection } from "../SmoothScroll.jsx";
import { PostLoader } from "../Loader/PostLoader/PostLoader.jsx";
import articleImg from "../../assets/placeholders/Artc1.png";
import "./blogscontainer.css";

export function BlogsContainer({
  isVertical = false,
  title,
  height,
  marginBottom,
  trending = false,
}) {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await getBlogs();

        const hasLikes = data.some((blog) => typeof blog.likes === "number");

        let sortedBlogs;
        if (trending && hasLikes) {
          sortedBlogs = [...data].sort(
            (a, b) => (b.likes || 0) - (a.likes || 0)
          );
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

    fetchBlogs();
  }, [trending]);

  return (
    <section className="display-column">
      <div className="title-container">
        <h1 className="outfit-font">{title}</h1>
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
                navigate(`/singleBlog/${blog.id}`);
                scrollToSection("#nav");
              }}
            >
              <img
                src={blog.imgUrl || articleImg}
                alt={blog.title || "Blog image"}
                style={{ height: height }}
              />
              <p className="playfair-thin-font">
                {blog.categories?.[0] || "Uncategorized"}
              </p>
              <h3>{blog.title || "Untitled"}</h3>
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
