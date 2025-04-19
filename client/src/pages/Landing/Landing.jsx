import { Hero } from "../../sections/LPSections/Hero/Hero";

function LandingPage() {
  return (
    <div className="main-page">
      <Hero />
    </div>
  );
}

export const landingRoute = {
  element: LandingPage(),
};
