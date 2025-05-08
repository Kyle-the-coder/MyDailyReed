import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../../utils/blogApi";
import { scrollToSection } from "../SmoothScroll.jsx";
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
  const [visibleCount, setVisibleCount] = useState(4); // default
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        const data = response;

        // Check if trending and at least one blog has a likes property
        const hasLikes = data.some((blog) => typeof blog.likes === "number");

        let sortedBlogs;

        if (trending && hasLikes) {
          sortedBlogs = [...data].sort(
            (a, b) => (b.likes || 0) - (a.likes || 0)
          );
        } else {
          sortedBlogs = [...data].sort(
            (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
          );
        }

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
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
        {blogs.slice(0, visibleCount).map((blog, index) => (
          <div
            key={blog._id || index}
            className="blog-info-container"
            style={{ marginBottom: marginBottom }}
            onClick={() => {
              navigate(`/singleBlog/${blog._id}`);
              scrollToSection("#nav");
            }}
          >
            <img
              src={blog.imgUrl || articleImg}
              style={{ height: height }}
              alt={blog.title}
            />
            <p className="playfair-thin-font">
              {blog.categories?.[0] || "Uncategorized"}
            </p>
            <h3>{blog.title}</h3>
            <p className="playfair-thin-font silver-text">
              {blog.author || "Unknown Author"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
