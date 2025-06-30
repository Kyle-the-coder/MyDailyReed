import { useState } from "react";
import "./wordbutton.css";

export function WordButton({
  text,
  fontSize,
  margin,
  onClick,
  disabled = false,
}) {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      className="button-main green-bg outfit-font"
      disabled={disabled}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        fontSize: fontSize ? fontSize : "clamp(1.8rem, 2vw, 2rem)",
        margin: margin,
      }}
      onClick={onClick}
    >
      <span
        style={{
          zIndex: 2,
        }}
      >
        {text}
      </span>
      <div className={`hover-bg ${isHover ? "active" : ""}`}></div>
    </button>
  );
}
