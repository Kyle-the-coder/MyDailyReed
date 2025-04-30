import { BlogsContainer } from "../BlogsContainer/BlogsContainer";
import "./sidebar.css";

export function Sidebar({ author }) {
  return (
    <div className="sidebar-main-container silver-bg">
      <BlogsContainer title="Latest" marginBottom="20px" />
    </div>
  );
}
