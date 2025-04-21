import { Hero } from "../../sections/LPSections/Hero/Hero";
import { LatestBlogs } from "../../sections/LPSections/LatestBlogs/LatestBlogs";

function LandingPage() {
  return (
    <div className="main-page">
      <Hero />
      <LatestBlogs />
    </div>
  );
}

export const landingRoute = {
  element: LandingPage(),
};
