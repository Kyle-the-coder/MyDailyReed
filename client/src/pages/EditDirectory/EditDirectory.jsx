import { BlogsContainer } from "../../components/BlogsContainer/BlogsContainer";

export default function EditDirectory() {
  return (
    <div className="display-column" style={{ padding: "40px 20px" }}>
      <BlogsContainer
        del={true}
        nav="editBlog"
        title="Edit a Blog"
        maxCount={100}
      />
    </div>
  );
}
