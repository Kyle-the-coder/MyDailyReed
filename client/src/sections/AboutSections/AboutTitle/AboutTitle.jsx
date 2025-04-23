import "./abouttitle.css";
import aboutTree from "../../../assets/placeholders/MDRAboutTree.png";
export function AboutTitle() {
  return (
    <section className="about-title-main-container charcoal-bg">
      <h1 className="outfit-font ">My Daily Reed</h1>
      <img src={aboutTree} />
      <h1 className="playfair-font">About Me</h1>
    </section>
  );
}
