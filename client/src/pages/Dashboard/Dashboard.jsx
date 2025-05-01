import "./dashboard.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // adjust path if needed
import { useNavigate } from "react-router-dom";
import { DBHero } from "../../sections/Dashboard/DBHero/DBHero";
import { DBDirection } from "../../sections/Dashboard/DBDirection/DBDirection";

export function Dashboard() {
  return (
    <section className="dashboard-main">
      <DBHero />
      <DBDirection />
    </section>
  );
}
