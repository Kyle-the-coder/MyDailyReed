import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";
import { Hero } from "../../sections/HeroSection/Hero";

function LandingPage() {
  return (
    <div className="display-column">
      {/* Section: */}
      <Hero />
      {/* Component: */}
      <div style={{ padding: "0px 20px" }} className="display-column ">
        <BlogsContainer title="Latest" isVertical={false} marginBottom="40px" />
        <BlogsContainer
          title="Trending"
          isVertical={false}
          marginBottom="40px"
        />
      </div>
    </div>
  );
}

export const landingRoute = {
  element: LandingPage(),
};
