import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs, deleteBlog } from "../../utils/blogApi";
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
  line = true,
  series,
}) {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isdel, setIsDel] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const visibleCount = maxCount ?? 4;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const data = await getBlogs();

        let filteredBlogs = data;

        if (typeof series === "string" && series.trim() !== "") {
          filteredBlogs = data
            .filter((blog) => blog.series === series)
            .sort((a, b) => (a.part ?? 0) - (b.part ?? 0)); // sort by part
        } else if (trending) {
          // Sort by likes for trending
          filteredBlogs = [...data].sort(
            (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
          );
        } else {
          // Default sort by most recent
          filteredBlogs = [...data].sort(
            (a, b) =>
              (b.datePosted?.toDate?.() ?? 0) - (a.datePosted?.toDate?.() ?? 0)
          );
        }

        setBlogs(filteredBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (blogArray?.length > 0) {
      setBlogs(blogArray);
      setIsLoading(false);
    } else {
      fetchBlogs();
    }
  }, [trending, blogArray, series]);

  const handleDelete = async () => {
    try {
      await deleteBlog(selectedBlog.id);
      setBlogs((prev) => prev.filter((b) => b.id !== selectedBlog.id));
      setIsDel(false);
      setSelectedBlog(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <section className="display-column">
      <div className="title-container">
        <div className="info-container">
          <h1 className="outfit-font">{title}</h1>
        </div>
        {line && <div className="line-blog"></div>}
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
                if (!isdel) {
                  navigate(`/${nav}/${blog.id}`);
                  window.scrollTo({ top: 0 });
                }
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
                  alt="Delete"
                  style={{
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                  className="dele-button"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent navigating
                    setIsDel(true);
                    setSelectedBlog(blog);
                  }}
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

      {isdel && selectedBlog && (
        <div className="delete-popup">
          <div className="popup-content">
            <p className="outfit-font">
              Are you sure you want to delete{" "}
              <strong>{selectedBlog.title || "this article"}</strong>
              {selectedBlog.part && <strong> part {selectedBlog.part}</strong>}?
            </p>
            <div className="popup-buttons">
              <button onClick={handleDelete}>Yes</button>
              <button
                onClick={() => {
                  setIsDel(false);
                  setSelectedBlog(null);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
