import "./commoncat.css";

const categories = [
  "Monday Devotional",
  "Thursday Lessons",
  "Tuesday Article",
  "Uncategorized",
  "Wednesday Inspiration",
  "Thoughts",
  "Taxes",
  "Experiences",
];

export function CommonCat() {
  // Helper: get size class based on string length
  const getSizeClass = (text) => {
    if (text.length > 10) return "size-b";
    if (text.length >= 6) return "size-a";
    return "size-c";
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
