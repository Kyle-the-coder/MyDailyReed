import { Outlet, useNavigation } from "react-router-dom";
import { Suspense } from "react";
import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";
import { CommonCat } from "../components/CommonCat/CommonCat";
import "../styles/main.css";
import { Loader } from "../components/Loader/Loader";

export function MainLayout() {
  const { state } = useNavigation();

  return (
    <div className="main-container">
      {/* Nav Bar */}
      <Nav />

      {/* Suspense for lazy-loaded routes */}
      <Suspense fallback={<Loader />}>
        {state === "loading" ? <Loader /> : <Outlet />}
      </Suspense>

      {/* Shared Components */}
      <CommonCat />
      <Footer />
    </div>
  );
}
