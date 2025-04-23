import { BlogsContainer } from "../BlogsContainer/BlogsContainer";
import "./sidebar.css";

export function Sidebar({ author }) {
  return (
    <div className="sidebar-main-container silver-bg">
      <div className="title-container">
        <h1 className="outfit-font">{author}</h1>
        <div className="line"></div>
      </div>
      <BlogsContainer
        isVertical={true}
        title="Latest"
        height="150px"
        marginBottom="20px"
      />
    </div>
  );
}
