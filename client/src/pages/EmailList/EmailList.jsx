import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import emailjs from "emailjs-com";
import { db } from "../../firebaseConfig";
import TiptapEditor from "../../components/TipTap/TiptapEditor";
import { WordButton } from "../../components/Buttons/WordButton/WordButton";
import { PostLoader } from "../../components/Loader/PostLoader/PostLoader";
import "./emailList.css";

const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

export function useNewsletterEmails() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      const snapshot = await getDocs(collection(db, "newsletter"));
      const emailList = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return data.email ? { id: doc.id, email: data.email } : null;
        })
        .filter(Boolean); // remove any nulls
      setEmails(emailList);
      setLoading(false);
    };

    fetchEmails();
  }, []);

  return { emails, loading };
}
export default function EmailList() {
  const { emails, loading } = useNewsletterEmails();
  const [message, setMessage] = useState("");
  const [sendTo, setSendTo] = useState([]);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const handleCheckboxChange = (email) => {
    setSendTo(
      (prevSelected) =>
        prevSelected.includes(email)
          ? prevSelected.filter((e) => e !== email) // remove it
          : [...prevSelected, email] // add it
    );
  };

  useEffect(() => {
    if (!loading && emails.length > 0) {
      const allEmails = emails.map((e) => e.email);
      setSendTo(allEmails);
    }
  }, [loading, emails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      // Send one email per recipient
      for (const email of sendTo) {
        const templateParams = {
          to_email: email,
          message: message,
        };
        console.log("Sending to:", email, templateParams);

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      }

      alert("Newsletter sent successfully!");
      navigate("/dashboard");
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Failed to send newsletter.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <h2
        className="outfit-font"
        style={{ fontSize: "2rem", marginBottom: "50px", color: "white" }}
      >
        Send Newsletter
      </h2>

      {loading ? (
        <div className="email-list">
          <PostLoader />
        </div>
      ) : (
        <div className="email-list">
          <div className="check-all-wrapper">
            <button
              type="button"
              onClick={() => {
                const allEmails = emails.map((e) => e.email);
                const allSelected = allEmails.every((email) =>
                  sendTo.includes(email)
                );
                setSendTo(allSelected ? [] : allEmails);
              }}
              className="check-all-button"
            >
              {sendTo.length === emails.length ? "Uncheck All" : "Check All"}
            </button>
          </div>

          {emails.map((email) => (
            <label key={email.id} className="email-option outfit-font">
              <input
                type="checkbox"
                checked={sendTo.includes(email.email)}
                onChange={() => handleCheckboxChange(email.email)}
              />
              {email.email}
            </label>
          ))}
        </div>
      )}

      <TiptapEditor content="" onChange={setMessage} />

      <div className="email-button">
        <WordButton
          text="Send"
          disabled={sending || !sendTo.length}
          onClick={(e) => handleSubmit(e)}
        />
      </div>
    </form>
  );
}
