import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import add from "../../../assets/icons/add.png";
import edit from "../../../assets/icons/edit.png";
import cat from "../../../assets/icons/options-lines.png";
import "./dbdirection.css";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";

export function DBDirection() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <section
      style={{ padding: "40px 20px", gap: "50px" }}
      className="display-column charcoal-bg neg-marg"
    >
      <div
        className="db-direction-container green-bg"
        onClick={(e) => {
          e.preventDefault();
          navigate("/createBlog");
          window.scrollTo(0, 0);
        }}
      >
        <h1 className="outfit-font">Create a Blog Post</h1>
        <img src={add} />
      </div>
      <div
        className="db-direction-container green-bg"
        onClick={(e) => {
          e.preventDefault();
          navigate("/editDirectory");
          window.scrollTo(0, 0);
        }}
      >
        <h1 className="outfit-font">Edit a Blog Post</h1>
        <img src={edit} />
      </div>
      <div
        className="db-direction-container green-bg"
        onClick={(e) => {
          e.preventDefault();
          navigate("/editCat");
          window.scrollTo(0, 0);
        }}
      >
        <h1 className="outfit-font">Edit Common Categories</h1>
        <img src={cat} />
      </div>

      <WordButton
        text="Logout"
        onClick={() => {
          handleLogout();
          window.scrollTo(0, 0);
        }}
      >
        Logout
      </WordButton>
    </section>
  );
}
