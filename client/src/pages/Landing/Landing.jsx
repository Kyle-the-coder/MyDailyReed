import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";
import { Hero } from "../../sections/LPSections/Hero/Hero";

function LandingPage() {
  return (
    <div className="main-page">
      {/* Section: */}
      <Hero />
      {/* Component: */}
      <BlogsContainer title="Latest" isVertical={false} />
      <BlogsContainer title="Trending" isVertical={false} />
      {/* Section: */}
    </div>
  );
}

export const landingRoute = {
  element: LandingPage(),
};
