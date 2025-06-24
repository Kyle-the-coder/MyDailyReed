import { lazy } from "react";

const EditBlog = lazy(() => import("./EditBlog"));

export const editBlogRoute = {
  element: <EditBlog />,
};
