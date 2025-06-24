import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";
import { Hero } from "../../sections/HeroSection/Hero";

export default function LandingPage() {
  return (
    <div className="display-column">
      {/* Section: */}
      <Hero />
      {/* Component: */}
      <div style={{ padding: "0px 20px" }} className="display-column ">
        <BlogsContainer
          nav="singleBlog"
          title="Latest"
          isVertical={false}
          marginBottom="40px"
        />
        <BlogsContainer
          nav="singleBlog"
          title="Trending"
          isVertical={false}
          marginBottom="40px"
          trending
        />
      </div>
    </div>
  );
}
