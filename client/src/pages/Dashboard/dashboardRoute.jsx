import { lazy } from "react";

const Dashboard = lazy(() => import("./Dashboard"));

export const dashboardRoute = {
  element: <Dashboard />,
};
