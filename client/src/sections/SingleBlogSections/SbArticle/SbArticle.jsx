import "./sbarticle.css";
import { Loader } from "../../../components/Loader/Loader";
import DOMPurify from "dompurify";
import { Social } from "../Social/Social";

export function SbArticle({ content }) {
  if (!Array.isArray(content)) return <Loader />;

  return (
    <div className="sb-article-main-container">
      <div className="sb-article-container">
        {content
          .filter((item) => item.type !== "Description")
          .map((item, index) => {
            if (item.type === "Article") {
              return (
                <div
                  key={item._id || index}
                  className="outfit-thin-font sb-article-section"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item.value),
                  }}
                />
              );
            }

            if (item.type === "Image") {
              return (
                <img
                  key={item._id || index}
                  src={item.value}
                  alt={`article-section-${index}`}
                  className="sb-article-img"
                />
              );
            }

            return null;
          })}
        <Social />
      </div>
    </div>
  );
}
