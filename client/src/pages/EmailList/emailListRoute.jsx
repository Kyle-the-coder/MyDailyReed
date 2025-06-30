import { lazy } from "react";

const EmailList = lazy(() => import("./EmailList"));

export const emailListRoute = {
  element: <EmailList />,
};
