import { AboutInfo } from "../../sections/AboutSections/AboutInfo/AboutInfo";
import { AboutTitle } from "../../sections/AboutSections/AboutTitle/AboutTitle";

export default function About() {
  return (
    <div className="display-column">
      <AboutTitle />
      <AboutInfo />
    </div>
  );
}
