import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // adjust path as needed
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./allblogs.css";
import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";

function AllBlogs() {
  const [seriesGroups, setSeriesGroups] = useState({});

  useEffect(() => {
    async function fetchBlogs() {
      const q = query(
        collection(db, "blogs"),
        orderBy("createdAt", "desc"),
        limit(100)
      );
      const snapshot = await getDocs(q);

      const groups = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        const series = data.series || "Uncategorized";

        if (!groups[series]) {
          groups[series] = [];
        }

        if (groups[series].length < 4) {
          groups[series].push({ id: doc.id, ...data });
        }
      });

      setSeriesGroups(groups);
    }

    fetchBlogs();
  }, []);

  return (
    <section className="all-blogs-main">
      <div className="blogs-title-container">
        <h1 className="outfit-font">Blogs</h1>
        <div className="line-blogs"></div>
      </div>

      <BlogsContainer nav="singleBlog" title="Latest" />
      <div style={{ height: "100px" }}></div>

      <BlogsContainer nav="singleBlog" title="Trending" trending={true} />

      <div style={{ marginTop: "100px" }} className="title-container">
        <div className="info-container">
          <h1 className="outfit-font">Series</h1>
        </div>
        <div className="line-blog"></div>
      </div>

      <div className="blogs-series-carousel">
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
          {Object.entries(seriesGroups).map(([seriesTitle, blogs]) => (
            <div key={seriesTitle}>
              <h2 className="series-title">{seriesTitle}</h2>
              <div className="series-blogs-grid">
                {blogs.map((blog) => (
                  <div key={blog.id} className="series-blog-card">
                    <h3>{blog.title}</h3>
                    <p>
                      {blog.subtitle || blog.content?.slice(0, 100) + "..."}
                    </p>
                    {/* Add image and link to single blog if needed */}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export const allBlogsRoute = {
  element: <AllBlogs />,
};
