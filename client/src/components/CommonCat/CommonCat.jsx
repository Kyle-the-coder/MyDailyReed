import { useNavigate } from "react-router-dom";
import { useCategories } from "../../utils/useCategories"; // your custom hook to get context
import "./commoncat.css";

export function CommonCat() {
  const categories = useCategories();
  const navigate = useNavigate();

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
            onClick={() => {
              navigate(`/searchPage/${encodeURIComponent(cat)}`);
              window.scrollTo({ top: 0 });
            }}
          >
            {cat}
          </h3>
        ))}
      </div>
    </section>
  );
}
