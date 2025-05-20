import { useEffect, useState } from "react";
import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";
import { getBlogs } from "../../utils/blogApi";
import { useParams } from "react-router-dom";
import { PostLoader } from "../../components/Loader/PostLoader/PostLoader";

function SearchPage() {
  const [blogs, setBlogs] = useState([]);
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [none, setNone] = useState(null);

  useEffect(() => {
    const fetchAndFilterBlogs = async () => {
      setIsLoading(true);
      setNone(false);

      try {
        const data = await getBlogs();
        console.log("refresh", category);
        console.log("data", data);

        const sortedBlogs = [...data].sort((a, b) => {
          if (typeof a.likes === "number" && typeof b.likes === "number") {
            return (b.likes || 0) - (a.likes || 0);
          }
          const dateA = a.datePosted?.toDate?.() || new Date(0);
          const dateB = b.datePosted?.toDate?.() || new Date(0);
          return dateB - dateA;
        });

        setBlogs(sortedBlogs);

        if (category) {
          const trimmed = category.trim().toLowerCase();

          if (trimmed) {
            const filtered = sortedBlogs.filter(
              (blog) =>
                Array.isArray(blog.categories) &&
                blog.categories.some((cat) => cat.toLowerCase() === trimmed)
            );

            if (filtered.length > 0) {
              setFilteredBlogs(filtered);
              setNone(false);
            } else {
              setFilteredBlogs([]);
              setNone(true);
              console.warn(`No blogs found with category: ${trimmed}`);
            }
          } else {
            setFilteredBlogs([]);
            setNone(true);
          }
        } else {
          setFilteredBlogs([]);
          setNone(true);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFilterBlogs();
  }, [category]);

  return (
    <div className="display-column" style={{ padding: "40px 20px" }}>
      {isLoading ? (
        <>
          <div className="title-container">
            <div className="info-container">
              <h1 className="outfit-font">{`Blogs with category:`}</h1>
              <h1 className="outfit-font">{` ${category}`}</h1>
            </div>
            <div className="line-blog"></div>
          </div>
          <div style={{ marginTop: "100px", marginBottom: "100px" }}>
            <PostLoader />
          </div>
        </>
      ) : (
        <>
          {none ? (
            <>
              <div className="title-container">
                <div className="info-container">
                  <h1 className="outfit-font">{`Blogs with category:`}</h1>
                  <h1 className="outfit-font">{` ${category}`}</h1>
                </div>

                <div className="line-blog"></div>
              </div>

              <h1
                className="outfit-font display-column"
                style={{
                  textAlign: "center",
                  marginTop: "100px",
                  marginBottom: "100px",
                }}
              >
                No blogs were found with that category
              </h1>
            </>
          ) : (
            <>
              <BlogsContainer
                blogArray={filteredBlogs}
                nav="singleBlog"
                title={`Blogs with category: `}
                subTitle={` ${category}`}
                maxCount={100}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export const searchPageRoute = {
  element: <SearchPage />,
};
