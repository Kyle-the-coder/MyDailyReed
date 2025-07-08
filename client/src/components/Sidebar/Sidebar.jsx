// Sidebar.jsx
import { useEffect, useRef, useState } from "react";
import { BlogsContainer } from "../BlogsContainer/BlogsContainer";
import { useLocation } from "react-router-dom";
import "./sidebar.css";

export function Sidebar({ author, series }) {
  const containerRef = useRef(null);
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setSidebarHeight(containerRef.current.offsetHeight);
      }
    };

    setTimeout(() => {
      updateHeight();
    }, [500]);

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [location]);

  return (
    <div ref={containerRef} className="sidebar-main-container silver-bg">
      {series && (
        <BlogsContainer
          series={series}
          nav="singleBlog"
          title="More in this Series"
          maxCount={100}
        />
      )}

      <BlogsContainer nav="singleBlog" title="Latest" maxCount={3} />
      <BlogsContainer
        trending={true}
        nav="singleBlog"
        title="Trending"
        maxCount={2}
      />
    </div>
  );
}
