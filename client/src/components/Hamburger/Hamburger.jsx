import { useEffect, useState } from "react";
import "./hamburger.css";
export function Hamburger({ isOpened }) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <button className="ham-button">
      <svg
        className={`hamburger charcoal-bg ${
          hasLoaded ? (isOpened ? "open" : "close") : ""
        }`}
        onClick={() => {
          setHasLoaded(true);
        }}
        fill="#c1ff72"
        viewBox="0 0 100 100"
        width="50"
      >
        <g className="top-group">
          <line className="line top" x1="10" x2="90" y1="30" y2="30" />
        </g>
        <g className="middle-group">
          <line className="line middle" x1="10" x2="90" y1="50" y2="50" />
        </g>
        <g className="bottom-group">
          <line className="line bottom" x1="10" x2="90" y1="70" y2="70" />
        </g>
      </svg>
    </button>
  );
}
