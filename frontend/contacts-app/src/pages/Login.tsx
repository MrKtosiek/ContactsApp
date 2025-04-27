import { Header } from "../components/Header";
import styles from "../styles/Login.module.scss";

export const Login: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.loginBackground}>
        <form className={styles.loginForm}>
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
