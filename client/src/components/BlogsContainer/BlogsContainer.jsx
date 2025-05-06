import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../../utils/blogApi";
import { scrollToSection } from "../SmoothScroll.jsx";
import articleImg from "../../assets/placeholders/Artc1.png"; // fallback image
import "./blogscontainer.css";

export function BlogsContainer({
  isVertical = false,
  title,
  height,
  marginBottom,
}) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response.data); // Ensure your API returns an array of blog objects
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="display-column">
      <div className="title-container">
        <h1 className="outfit-font">{title}</h1>
        <div className="line-blog"></div>
      </div>

      <div
        className={`blog-column-container ${
          isVertical ? "vertical" : "horizontal"
        }`}
      >
        {blogs.map((blog, index) => (
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
