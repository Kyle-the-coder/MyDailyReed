import "./dashboard.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // adjust path if needed
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <section className="dashboard-main">
      <h1>This is the dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
}
