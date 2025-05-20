import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";

export function EditDirectory() {
  return (
    <div className="display-column" style={{ padding: "40px 20px" }}>
      <BlogsContainer nav="editBlog" title="Edit a Blog" maxCount={100} />
    </div>
  );
}
