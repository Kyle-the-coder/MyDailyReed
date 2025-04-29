import "./login.css";

function Login() {
  return (
    <section className="display-column">
      <form>
        <h1>Log into your Acount</h1>

        <div className="login-input-conatiner">
          <label>Email:</label>
          <input type="text" placeholder="email@email.com" />
        </div>
        <div className="login-input-conatiner">
          <label>Password:</label>
          <input type="password" placeholder="email@email.com" />
        </div>
      </form>
    </section>
  );
}

export const loginRoute = {
  element: Login(),
};
