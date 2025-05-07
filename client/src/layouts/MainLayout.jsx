import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";
import { CommonCat } from "../components/CommonCat/CommonCat";
import "../styles/main.css";
import { Loader } from "../components/Loader/Loader";

export function MainLayout() {
  const { state } = useNavigation();

  return (
    <div className="main-container">
      {/* Component */}
      <Nav />
      {state === "loading" ? (
        <Loader />
      ) : (
        <div>
          <Outlet />
        </div>
      )}
      {/* Component */}
      <CommonCat />
      {/* Component */}
      <Footer />
    </div>
  );
}
