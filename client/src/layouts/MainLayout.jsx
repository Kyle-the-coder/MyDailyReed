import { useEffect, useState, Suspense } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";
import { CommonCat } from "../components/CommonCat/CommonCat";
import "../styles/main.css";
import { Loader } from "../components/Loader/Loader";
import { getBlogs } from "../utils/blogApi";
import { BlogsContext } from "../contexts/BlogsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export function MainLayout() {
  const { state } = useNavigation();

  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoadingBlogs(false);
      }
    }

    fetchBlogs();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const docRef = doc(db, "commonCat", "YTLA8LnhCtzvU07csqsx");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCategories(docSnap.data().categories || []);
        } else {
          console.warn("No commonCat document found.");
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    }

    fetchCategories();
  }, []);

  if (loadingBlogs || loadingCategories) {
    return <Loader />;
  }

  return (
    <BlogsContext.Provider value={blogs}>
      <CategoriesContext.Provider value={categories}>
        <div className="main-container">
          <Nav />
          <Suspense fallback={<Loader />}>
            {state === "loading" ? <Loader /> : <Outlet />}
          </Suspense>
          <CommonCat />
          <Footer />
        </div>
      </CategoriesContext.Provider>
    </BlogsContext.Provider>
  );
}
