import { lazy } from "react";

const CreateBlog = lazy(() => import("./CreateBlog"));

export const createBlogRoute = {
  element: <CreateBlog />,
};
