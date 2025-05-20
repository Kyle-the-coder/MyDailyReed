import { useState, useEffect } from "react";
import { PostLoader } from "../../components/Loader/PostLoader/PostLoader";
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCategoryRefresh } from "../../contexts/CategoryContext";
import submit from "../../assets/icons/formIcons/check.png";
import del from "../../assets/icons/x-button.png";
import "./editcat.css";

export function EditCat() {
  const [preLoadCategories, setPreLoadCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const { triggerRefresh } = useCategoryRefresh();

  const docRef = doc(db, "commonCat", "YTLA8LnhCtzvU07csqsx");
  useEffect(() => {
    const fetchCategories = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPreLoadCategories(data.categories || []);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = (catToDelete) => {
    setCategories((prev) => prev.filter((cat) => cat !== catToDelete));
    setPreLoadCategories((prev) => prev.filter((cat) => cat !== catToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const combinedCategories = Array.from(
        new Set([...preLoadCategories, ...categories])
      );

      await updateDoc(docRef, { categories: combinedCategories });
      triggerRefresh();
      alert("Categories updated!");
    } catch (err) {
      console.error("Failed to update categories:", err);
      alert("An error occurred while updating.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="edit-cat-main">
      <h1
        style={{ fontSize: "2rem", marginBottom: "30px", marginTop: "50px" }}
        className="outfit-font"
      >
        Edit Common Categories
      </h1>
      <div className="display-column">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="input-label outfit-font">
              Add Categories (use comma to add category):
            </label>
            <input
              className="input playfair-font"
              type="text"
              placeholder="e.g. Monday Devotion, Tuesday Article"
              onChange={(e) =>
                setCategories(
                  e.target.value
                    .split(",")
                    .map((cat) => cat.trim())
                    .filter((cat) => cat !== "")
                )
              }
            />

            {preLoadCategories.length > 0 && (
              <div className="category-container outfit-font">
                <h1 className="outfit-font">Categories:</h1>
                {preLoadCategories.map((cat) => (
                  <div key={cat} className="cat1 silver-bg">
                    {cat}
                    <img
                      src={del}
                      className="del-button"
                      onClick={() => deleteCategory(cat)}
                    />
                  </div>
                ))}
                {categories.length > 0 && (
                  <>
                    {categories.map((cat) => (
                      <div key={cat} className="cat1 outfit-font silver-bg">
                        {cat}
                        <img
                          src={del}
                          className="del-button"
                          onClick={() => deleteCategory(cat)}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="post-loader-container">
              <PostLoader />
            </div>
          ) : (
            <img
              src={submit}
              onClick={(e) => handleSubmit(e)}
              className="form-icon  off-white-bg"
              alt="submit"
            />
          )}
        </form>
      </div>
    </section>
  );
}
