import "./login.css";

function Login() {
  return (
    <section className="display-column charcoal-bg neg-marg ">
      {/* <!-- From Uiverse.io by Yaya12085 -->  */}
      <div class="form-container green-bg ">
        <p class="title outfit-font">Login</p>
        <form class="form">
          <div class="input-group">
            <label for="username " className="outfit-thin-font">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="email@email.com"
              id="username"
            />
          </div>
          <div class="input-group">
            <label for="password" className="outfit-thin-font">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            <div class="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password ?
              </a>
            </div>
          </div>
          <button class="sign charcoal-bg">Sign in</button>
        </form>
        <div class="social-message">
          <div class="line"></div>
          <p class="message">Login with Google</p>
          <div class="line"></div>
        </div>
        <div class="social-icons">
          <button aria-label="Log in with Google" class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              class="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export const loginRoute = {
  element: <Login />,
};
