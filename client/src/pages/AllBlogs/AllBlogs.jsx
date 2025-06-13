import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { db } from "../../firebaseConfig"; // adjust path as needed
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./allblogs.css";
import { scrollToSection } from "../../components/SmoothScroll";

function AllBlogs() {
  const [seriesGroups, setSeriesGroups] = useState({});
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlogs() {
      const q = query(collection(db, "blogs"));
      const snapshot = await getDocs(q);

      const rawGroups = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        const series = data.series?.trim();
        if (!series) return;

        if (!rawGroups[series]) rawGroups[series] = [];
        rawGroups[series].push({ id: doc.id, ...data });
      });

      const finalGroups = Object.fromEntries(
        Object.entries(rawGroups).map(([seriesTitle, blogs]) => [
          seriesTitle,
          blogs
            .sort((a, b) => Number(a.part || 0) - Number(b.part || 0))
            .slice(0, 3),
        ])
      );

      setSeriesGroups(finalGroups);
      setIsReady(true); // ✅ Only render Carousel once this is true
    }

    fetchBlogs();
  }, []);
  console.log(seriesGroups);
  return (
    <section className="all-blogs-main">
      <div className="blogs-title-container">
        <h1 className="outfit-font">Blogs</h1>
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
        {isReady && (
          <Carousel
            key={Object.keys(seriesGroups).join("-")}
            showStatus={false}
            infiniteLoop={true}
            showArrows={true}
            swipeable={false}
            showThumbs={false}
            className="carousel"
          >
            {Object.entries(seriesGroups).map(([seriesTitle, blogs]) => (
              <div key={seriesTitle}>
                <h2 className="series-title">
                  {seriesTitle.replace(/\b\w/g, (char) => char.toUpperCase())}
                </h2>
                <div className="series-blogs-grid">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="blogs-info-container"
                      onClick={() => {
                        navigate(`/singleBlog/${blog.id}`);
                        window.scrollTo({ top: 0 });
                      }}
                    >
                      <img
                        src={blog.imgUrl || articleImg}
                        alt={blog.title || "Blog image"}
                      />
                      <p className="playfair-thin-font">{blog.subTitle}</p>
                      <h3>
                        {blog.title || "Untitled"}{" "}
                        {blog.part ? `Part ${blog.part}` : ""}
                      </h3>
                      <p className="playfair-thin-font silver-text">
                        {blog.author || "Unknown Author"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
}

export const allBlogsRoute = {
  element: <AllBlogs />,
};
