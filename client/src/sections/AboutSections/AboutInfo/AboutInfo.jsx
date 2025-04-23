import { Sidebar } from "../../../components/Sidebar/Sidebar";
import "./aboutinfo.css";

export function AboutInfo() {
  return (
    <section className="about-info-main-section">
      <div className="about-info">
        <h3 className="outfit-thin-font">
          My Daily Reed. When you read and respond, in any way, it’s an
          inexplicable connection. PLEASE share your thoughts. The space between
          a writer and the reader is sacred. Because there are only so many
          heartbeats and pen strokes we can share in this life. What we share
          should be thought-provoking, meaningful, and dare I say. FUN!
        </h3>
        <ul className="playfair-font">
          <li>Monday-Devotion</li>
          <li>Tuesday-Article</li>
          <li>Wednesday-Inspiration/Insight</li>
          <li>Thursday-Lessons from a Grocery Store</li>
          <li>Friday-Your Turn</li>
        </ul>
      </div>

      <Sidebar author="My Daily Reed" />
    </section>
  );
}
