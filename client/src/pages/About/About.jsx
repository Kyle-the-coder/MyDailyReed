import { AboutInfo } from "../../sections/AboutSections/AboutInfo/AboutInfo";
import { AboutTitle } from "../../sections/AboutSections/AboutTitle/AboutTitle";

function About() {
  return (
    <div className="display-column">
      <AboutTitle />
      <AboutInfo />
    </div>
  );
}

export const aboutRoute = {
  element: About(),
};
