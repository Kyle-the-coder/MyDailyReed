import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";
import { Hero } from "../../sections/HeroSection/Hero";

function LandingPage() {
  return (
    <div className="display-column">
      {/* Section: */}
      <Hero />
      {/* Component: */}
      <BlogsContainer title="Latest" isVertical={false} />
      <BlogsContainer title="Trending" isVertical={false} />
    </div>
  );
}

export const landingRoute = {
  element: LandingPage(),
};
