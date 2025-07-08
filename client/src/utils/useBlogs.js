import { useContext } from "react";
import { BlogsContext } from "../contexts/BlogsContext";

export function useBlogs() {
  const blogs = useContext(BlogsContext);

  if (!blogs) {
    throw new Error("useBlogs must be used within a BlogsContext.Provider");
  }

  return blogs;
}
