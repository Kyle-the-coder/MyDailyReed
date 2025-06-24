import { lazy } from "react";

const Login = lazy(() => import("./Login"));

export const loginRoute = {
  element: <Login />,
};
