import "./login.css";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, [1000]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/dashboard");
    } catch (err) {
      setError("Incorrect Email/Password");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const allowedEmail = import.meta.env.VITE_EMAIL;

    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;

      if (userEmail !== allowedEmail) {
        await auth.signOut();
        setError("Access denied: unauthorized Google account.");
      } else {
        console.log("Google login successful");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {isLogin ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {" "}
          <section className="display-column charcoal-bg neg-marg">
            <div className="form-container green-bg">
              <p className="title outfit-font">Login</p>
              <form className="form" onSubmit={handleLogin}>
                <div className="input-group">
                  <label htmlFor="email" className="outfit-thin-font">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="email@email.com"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password" className="outfit-thin-font">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="forgot">
                    <button
                      type="button"
                      className="forgot-password-btn outfit-font"
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
                <button type="submit" className="sign charcoal-bg">
                  Sign in
                </button>
                {error && <p className="error-message">{error}</p>}
              </form>

              <div className="social-message">
                <div className="line"></div>
                <p className="message">Login with Google</p>
                <div className="line"></div>
              </div>

              <div className="social-icons">
                <button
                  type="button"
                  aria-label="Log in with Google"
                  className="icon"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export const loginRoute = {
  element: <Login />,
};
