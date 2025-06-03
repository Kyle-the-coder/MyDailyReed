import { useState } from "react";
import "./wordbutton.css";

export function WordButton({ text, fontSize, margin, onClick }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      className="button-main green-bg outfit-font"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        fontSize: fontSize ? fontSize : "clamp(1.8rem, 1.9vw, 2rem)",
        margin: margin,
      }}
      onClick={onClick}
    >
      <p
        style={{
          zIndex: 2,
        }}
      >
        {text}
      </p>
      <div className={`hover-bg ${isHover ? "active" : ""}`}></div>
    </button>
  );
}
