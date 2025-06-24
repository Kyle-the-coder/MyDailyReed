import { lazy } from "react";

const AboutPage = lazy(() => import("./About"));

export const aboutRoute = {
  element: <AboutPage />,
};
