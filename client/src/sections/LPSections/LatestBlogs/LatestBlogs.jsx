import articleImg from "../../../assets/placeholders/Artc1.png";
import articleImg2 from "../../../assets/placeholders/Artc2.jpg";
import articleImg3 from "../../../assets/placeholders/Artc3.jpg";
import "./latestblogs.css";

export function LatestBlogs() {
  return (
    <section className="main-page">
      <div className="title-container">
        <h1 className="outfit-font">Latest</h1>
        <div className="line"></div>
      </div>

      <div className="blog-column-container">
        <div className="blog-info-container">
          <img src={articleImg} />
          <p className="playfair-thin-font">Category</p>
          <h3 className="">This is the title of the article</h3>
          <p className="playfair-thin-font silver-text">Author</p>
        </div>
        <div className="blog-info-container">
          <img src={articleImg2} />
          <p className="playfair-thin-font">Category</p>
          <h3 className="">This is the title of the article</h3>
          <p className="playfair-thin-font silver-text">Author</p>
        </div>
        <div className="blog-info-container">
          <img src={articleImg3} />
          <p className="playfair-thin-font">Category</p>
          <h3 className="">This is the title of the article</h3>
          <p className="playfair-thin-font silver-text">Author</p>
        </div>
        <div className="blog-info-container">
          <img src={articleImg} />
          <p className="playfair-thin-font">Category</p>
          <h3 className="">This is the title of the article</h3>
          <p className="playfair-thin-font silver-text">Author</p>
        </div>
      </div>
    </section>
  );
}
