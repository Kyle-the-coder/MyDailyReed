import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";
import { Hero } from "../../sections/HeroSection/Hero";

function LandingPage() {
  return (
    <div className="display-column">
      {/* Section: */}
      <Hero />
      {/* Component: */}
      <BlogsContainer title="Latest" isVertical={false} marginBottom="40px" />
      <BlogsContainer title="Trending" isVertical={false} marginBottom="40px" />
    </div>
  );
}

export const landingRoute = {
  element: LandingPage(),
};
