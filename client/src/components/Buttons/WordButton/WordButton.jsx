import "./wordbutton.css";

export function WordButton({ text }) {
  return (
    <button
      className="word-button green-bg outfit-font"
      style={{ fontSize: "clamp(2rem, 2.5vw, 3rem)" }}
    >
      {text}
    </button>
  );
}
