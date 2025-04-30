import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
