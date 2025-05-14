import placeholder from "../../../assets/placeholders/Artc1.png";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";
import DOMPurify from "dompurify";
import "./sbtitle.css";
import { useNavigate } from "react-router-dom";

export function SbTitle({
  title,
  subTitle,
  author,
  datePosted,
  readTime,
  titleImg,
  part,
  partUrl,
  partName,
  description,
}) {
  const navigate = useNavigate();
  const formattedDate = datePosted?.toDate
    ? datePosted.toDate().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date(datePosted).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <div className="sb-title-main-container charcoal-bg white-text">
      <p className="sb-sub outfit-font">{subTitle}</p>
      <h1 className="sb-title playfair-font" style={{ marginBottom: "40px" }}>
        {title}
      </h1>
      {part && (
        <h6
          className="sb-part silver-bg outfit-font"
          style={{ padding: "5px 20px", borderRadius: "5rem", color: "black" }}
        >
          Part: {part}
        </h6>
      )}

      <img src={titleImg || placeholder} alt="Blog banner" />

      <p
        className="sb-title-blerb outfit-thin-font"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(description),
        }}
      />

      {partName && (
        <WordButton
          onClick={() => (window.location.href = partUrl)}
          text={partName}
        />
      )}

      <div className="sb-title-info-container">
        <div className="sb-title-info">
          <h6 className="outfit-xthin-font">Author:</h6>
          <h5 className="playfair-font">{author || "Unknown"}</h5>
        </div>
        <div className="sb-title-info">
          <h6 className="outfit-xthin-font">Read Time:</h6>
          <h5 className="playfair-font">{readTime || "N/A"}</h5>
        </div>
        <div className="sb-title-info">
          <h6 className="outfit-xthin-font">Date Posted:</h6>
          <h5 className="playfair-font">{formattedDate}</h5>
        </div>
      </div>
    </div>
  );
}
