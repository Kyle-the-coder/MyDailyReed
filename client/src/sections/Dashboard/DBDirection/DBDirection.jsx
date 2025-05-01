import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import add from "../../../assets/icons/add.png";
import edit from "../../../assets/icons/edit.png";
import "./dbdirection.css";

export function DBDirection() {
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
    <section
      style={{ height: "600px", padding: "40px", gap: "50px" }}
      className="display-column charcoal-bg"
    >
      <div className="db-direction-container green-bg">
        <h1 className="outfit-font">Create a Blog Post</h1>
        <img src={add} />
      </div>
      <div className="db-direction-container green-bg">
        <h1 className="outfit-font">Edit a Blog Post</h1>
        <img src={edit} />
      </div>

      <button
        className="word-button green-bg outfit-font"
        style={{ fontSize: "1.5rem" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </section>
  );
}
