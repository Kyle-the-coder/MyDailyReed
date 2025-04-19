import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorLayout } from "./layouts/ErrorLayout";
import { landingRoute } from "./pages/Landing/Landing";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [{ path: "/", ...landingRoute }],
  },
]);
