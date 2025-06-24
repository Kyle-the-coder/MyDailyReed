import { lazy } from "react";

const SearchPage = lazy(() => import("./SearchPage"));

export const searchPageRoute = {
  element: <SearchPage />,
};
