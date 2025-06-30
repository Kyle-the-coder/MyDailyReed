import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorLayout } from "./layouts/ErrorLayout";
import { landingRoute } from "./pages/Landing/landingRoute";
import { aboutRoute } from "./pages/About/aboutRoute";
import { singleBlogRoute } from "./pages/SingleBlog/singleBlogRoute";
import { loginRoute } from "./pages/Login/loginRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { createBlogRoute } from "./pages/CreateBlog/createBlogRoute";
import { searchPageRoute } from "./pages/SearchPage/searchPageRoute";
import { allBlogsRoute } from "./pages/AllBlogs/allBlogsRoute";
import { dashboardRoute } from "./pages/Dashboard/dashboardRoute";
import { editBlogRoute } from "./pages/EditBlog/editBlogRoute";
import { editCatRoute } from "./pages/EditCat/editCatRoute";
import { editDirectoryRoute } from "./pages/EditDirectory/editDirectoryRoute";
import { emailListRoute } from "./pages/EmailList/emailListRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { path: "/", ...landingRoute },
      { path: "/about", ...aboutRoute },
      { path: "/singleBlog/:id", ...singleBlogRoute },
      { path: "/login", ...loginRoute },
      { path: "/searchPage/:category", ...searchPageRoute },
      { path: "/blogs", ...allBlogsRoute },
      {
        path: "/dashboard",
        element: <PrivateRoute>{dashboardRoute.element}</PrivateRoute>,
      },
      {
        path: "/createBlog",
        element: <PrivateRoute>{createBlogRoute.element}</PrivateRoute>,
      },
      {
        path: "/editBlog/:id",
        element: <PrivateRoute>{editBlogRoute.element}</PrivateRoute>,
      },
      {
        path: "/editDirectory",
        element: <PrivateRoute>{editDirectoryRoute.element}</PrivateRoute>,
      },
      {
        path: "/editCat",
        element: <PrivateRoute>{editCatRoute.element}</PrivateRoute>,
      },
      {
        path: "/emaillist",
        element: <PrivateRoute>{emailListRoute.element}</PrivateRoute>,
      },
    ],
  },
]);
