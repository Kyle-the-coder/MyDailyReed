import placeholder from "../../../assets/placeholders/Artc1.png";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";
import DOMPurify from "dompurify";

import "./sbtitle.css";

export function SbTitle({
  title,
  subTitle,
  author,
  datePosted,
  readTime,
  titleImg,
  part,
  description,
  redirectLink,
}) {
  console.log("desc", description);
  return (
    <div className="sb-title-main-container charcoal-bg white-text">
      <h1 className="sb-title  playfair-font">{title}</h1>
      <h3 className="sb-title playfair-font" style={{ marginBottom: "40px" }}>
        {subTitle}
      </h3>
      {part && <h6 className="sb-part playfair-font">Part 2</h6>}

      <img src={titleImg} />
      <p
        className="sb-title-blerb outfit-thin-font"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(description),
        }}
      />
      {redirectLink && <WordButton text="Part 1" />}

      <div className="sb-title-info-container">
        <div className="sb-title-info">
          <h6 className="outfit-xthin-font">Author:</h6>
          <h5 className="playfair-font">{author}</h5>
        </div>
        <div className="sb-title-info">
          <h6 className="outfit-xthin-font">Read Time:</h6>
          <h5 className="playfair-font">{readTime}</h5>
        </div>
        <div className="sb-title-info">
          <h6 className="outfit-xthin-font">Date Posted:</h6>
          <h5 className="playfair-font">
            {" "}
            {new Date(datePosted).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h5>
        </div>
      </div>
    </div>
  );
}
