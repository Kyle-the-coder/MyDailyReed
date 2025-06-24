import { lazy } from "react";

const Landing = lazy(() => import("./Landing"));

export const landingRoute = {
  element: <Landing />,
};
