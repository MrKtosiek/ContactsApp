import { Header } from "../components/Header";
import "../styles/Login.scss";

export const Login: React.FC = () => {
  return (
    <>
      <Header />
      <div className="login-background">
        <form className="login-form">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};
