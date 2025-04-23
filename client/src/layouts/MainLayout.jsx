import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";

import "../styles/main.css";
import { CommonCat } from "../components/CommonCat/CommonCat";
export function MainLayout() {
  const { state } = useNavigation();

  return (
    <div className="main-container">
      {/* Component */}
      <Nav />
      {state === "loading" ? (
        "loading..."
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
