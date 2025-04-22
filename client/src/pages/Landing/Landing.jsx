import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";
import { CommonCat } from "../../components/CommonCat/CommonCat";
import { Hero } from "../../sections/HeroSection/Hero";

function LandingPage() {
  return (
    <div className="main-page">
      {/* Section: */}
      <Hero />
      {/* Component: */}
      <BlogsContainer title="Latest" isVertical={false} />
      <BlogsContainer title="Trending" isVertical={false} />
      {/* Component: */}
      <CommonCat />
    </div>
  );
}

export const landingRoute = {
  element: LandingPage(),
};
