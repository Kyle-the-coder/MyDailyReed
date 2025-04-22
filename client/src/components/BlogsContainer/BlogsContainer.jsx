import articleImg from "../../assets/placeholders/Artc1.png";
import articleImg2 from "../../assets/placeholders/Artc2.jpg";
import articleImg3 from "../../assets/placeholders/Artc3.jpg";
import "./blogscontainer.css";

export function BlogsContainer({ isVertical = false, title }) {
  return (
    <section className="main-page">
      <div className="title-container">
        <h1 className="outfit-font">{title}</h1>
        <div className="line"></div>
      </div>

      <div
        className={`blog-column-container ${
          isVertical ? "vertical" : "horizontal"
        }`}
      >
        {[articleImg, articleImg2, articleImg3, articleImg].map(
          (img, index) => (
            <div className="blog-info-container" key={index}>
              <img src={img} alt={`Blog ${index + 1}`} />
              <p className="playfair-thin-font">Category</p>
              <h3>This is the title of the article</h3>
              <p className="playfair-thin-font silver-text">Author</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
