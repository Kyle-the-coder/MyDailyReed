import { AboutTitle } from "../../sections/AboutSections/AboutTitle/AboutTitle";

function About() {
  return (
    <div className="display-column">
      <AboutTitle />
    </div>
  );
}

export const aboutRoute = {
  element: About(),
};
