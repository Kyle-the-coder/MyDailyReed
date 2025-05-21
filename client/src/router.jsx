import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorLayout } from "./layouts/ErrorLayout";
import { landingRoute } from "./pages/Landing/Landing";
import { aboutRoute } from "./pages/About/About";
import { singleBlogRoute } from "./pages/SingleBlog/SingleBlog";
import { loginRoute } from "./pages/Login/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { CreateBlog } from "./pages/CreateBlog/CreateBlog";
import { EditBlog } from "./pages/EditBlog/EditBlog";
import { EditDirectory } from "./pages/EditDirectory/EditDirectory";
import { EditCat } from "./pages/EditCat/EditCat";
import { searchPageRoute } from "./pages/SearchPage/SearchPage";
import { allBlogsRoute } from "./pages/AllBlogs/AllBlogs";
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
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/createBlog",
        element: (
          <PrivateRoute>
            <CreateBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/editBlog/:id",
        element: (
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/editDirectory",
        element: (
          <PrivateRoute>
            <EditDirectory />
          </PrivateRoute>
        ),
      },
      {
        path: "/editCat",
        element: (
          <PrivateRoute>
            <EditCat />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
