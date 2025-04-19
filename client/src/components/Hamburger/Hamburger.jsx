import { useEffect, useState } from "react";
import "./hamburger.css";
export function Hamburger({ isOpened }) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <button className="ham-button">
      <svg
        className={`hamburger ${
          hasLoaded ? (isOpened ? "open" : "close") : ""
        }`}
        onClick={() => {
          setHasLoaded(true);
        }}
        fill="#c1ff72"
        viewBox="0 0 100 100"
        width="50"
      >
        <line
          className="line top"
          x1="10"
          x2="90"
          y1="30"
          y2="30"
          stroke="#c1ff72"
          strokeWidth="10"
          strokeDasharray="80"
          strokeDashoffset="0"
        ></line>
        <line
          className="line middle"
          x1="10"
          x2="90"
          y1="50"
          y2="50"
          stroke="#c1ff72"
          strokeWidth="10"
          strokeDasharray="80"
          strokeDashoffset="0"
        ></line>
        <line
          className="line bottom"
          x1="10"
          x2="90"
          y1="70"
          y2="70"
          stroke="#c1ff72"
          strokeWidth="10"
          strokeDasharray="80"
          strokeDashoffset="0"
        ></line>
      </svg>
    </button>
  );
}
