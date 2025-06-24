import { lazy } from "react";

const SingleBlog = lazy(() => import("./SingleBlog"));

export const singleBlogRoute = {
  element: <SingleBlog />,
};
