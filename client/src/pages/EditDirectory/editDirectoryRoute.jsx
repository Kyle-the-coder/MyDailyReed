import { lazy } from "react";

const EditDirectory = lazy(() => import("./EditDirectory"));

export const editDirectoryRoute = {
  element: <EditDirectory />,
};
