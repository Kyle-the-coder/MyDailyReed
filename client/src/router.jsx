import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorLayout } from "./layouts/ErrorLayout";
import { landingRoute } from "./pages/Landing/Landing";
import { aboutRoute } from "./pages/About/About";
import { singleBlogRoute } from "./pages/SingleBlog/SingleBlog";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { path: "/", ...landingRoute },
      { path: "/about", ...aboutRoute },
      { path: "/singleBlog", ...singleBlogRoute },
    ],
  },
]);
