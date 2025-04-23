import "./wordbutton.css";

export function WordButton({ text, fontSize, margin }) {
  return (
    <button
      className="word-button green-bg outfit-font"
      style={{
        fontSize: fontSize ? fontSize : "clamp(1.8rem, 1.9vw, 2rem)",
      }}
    >
      {text}
    </button>
  );
}
