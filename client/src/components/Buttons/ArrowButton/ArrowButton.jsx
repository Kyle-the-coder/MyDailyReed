import arrow from "../../../assets/icons/arrow.png";
import "./arrowbutton.css";

export function ArrowButton({ onClick }) {
  console.log("ArrowButton rendered with onClick:", onClick);
  return (
    <button onClick={onClick} className="arrow-button green-bg">
      <img src={arrow} />
    </button>
  );
}
