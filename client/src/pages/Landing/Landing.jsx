import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";
import { Hero } from "../../sections/LPSections/Hero/Hero";

function LandingPage() {
  return (
    <div className="main-page">
      <Hero />
      <BlogsContainer title="Latest" isVertical={false} />
      <BlogsContainer title="Trending" isVertical={false} />
    </div>
  );
}

export const landingRoute = {
  element: LandingPage(),
};
