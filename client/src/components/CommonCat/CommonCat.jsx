import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig"; // adjust path if needed
import { doc, getDoc } from "firebase/firestore";
import "./commoncat.css";
import { useCategoryRefresh } from "../../contexts/CategoryContext";

export function CommonCat() {
  const [categories, setCategories] = useState([]);
  const { refresh } = useCategoryRefresh();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const docRef = doc(db, "commonCat", "YTLA8LnhCtzvU07csqsx");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCategories(data.categories || []);
        } else {
          console.warn("No commonCat document found.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [refresh]);

  const getSizeClass = (text) => {
    if (text.length > 10) return "size-c";
    if (text.length >= 6) return "size-b";
    return "size-a";
  };

  return (
    <section className="common-cat-container green-bg">
      <h1 className="outfit-font">Common Categories:</h1>

      <div className="category-bento-container">
        {categories.map((cat, index) => (
          <h3
            key={index}
            className={`category silver-bg outfit-font ${getSizeClass(cat)}`}
          >
            {cat}
          </h3>
        ))}
      </div>
    </section>
  );
}
