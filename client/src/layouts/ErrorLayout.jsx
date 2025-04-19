import { Outlet, useNavigation } from "react-router-dom";

export function ErrorLayout() {
  const { state } = useNavigation();

  return (
    <div className="main-container">
      {state === "loading" ? "loading..." : <h1>Error</h1>}
    </div>
  );
}
