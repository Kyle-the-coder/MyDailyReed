import { lazy } from "react";

const AllBlogsPage = lazy(() => import("./AllBlogs"));

export const allBlogsRoute = {
  element: <AllBlogsPage />,
};
