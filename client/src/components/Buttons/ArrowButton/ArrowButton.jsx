import arrow from "../../../assets/icons/arrow.png";
import "./arrowbutton.css";

export function ArrowButton() {
  return (
    <button className="arrow-button green-bg">
      <img src={arrow} />
    </button>
  );
}
