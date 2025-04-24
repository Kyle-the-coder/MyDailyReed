import placeholder from "../../../assets/placeholders/Artc1.png";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";
import "./sbtitle.css";

export function SbTitle() {
  return (
    <div className="sb-title-main-container charcoal-bg white-text">
      <h1 className="sb-title  playfair-font">Retirement?</h1>
      <h3 className="sb-title playfair-font" style={{ marginBottom: "40px" }}>
        Imagine Your Last Day
      </h3>
      <h6 className="sb-part playfair-font">Part 2</h6>
      <img src={placeholder} />
      <p className="sb-title-blerb outfit-thin-font">
        Thursday Lessons From a Grocery Store What must I accomplish before I
        have my sunset moment? This was the question we left open in part one
        while we explored whether or not it is out of God's will to retire. Go
        back and read that if you haven't.
      </p>

      <WordButton text="Part 1" />
      <div className="sb-title-info-container">
        <div className="sb-title-info">
          <h6 className="outfit-xthin-font">Author:</h6>
          <h5 className="playfair-font">My Daily Reed</h5>
        </div>
        <div className="sb-title-info">
          <h6 className="outfit-xthin-font">Read Time:</h6>
          <h5 className="playfair-font">3 minutes</h5>
        </div>
        <div className="sb-title-info">
          <h6 className="outfit-xthin-font">Date Posted:</h6>
          <h5 className="playfair-font">April 10, 2023</h5>
        </div>
      </div>
    </div>
  );
}
