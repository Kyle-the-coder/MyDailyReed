import arrow from "../../../assets/icons/arrowUp.png";
import "./totopbutton.css";

export function ToTopButton() {
  return (
    <button className="to-top-button green-bg">
      <img src={arrow} />
    </button>
  );
}
