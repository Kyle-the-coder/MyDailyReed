import { lazy } from "react";

const EditCat = lazy(() => import("./EditCat"));

export const editCatRoute = {
  element: <EditCat />,
};
