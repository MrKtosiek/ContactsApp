import { useNavigate } from "react-router-dom";
import React from "react";
import { LOGIN_ROUTE, MAIN_PAGE_ROUTE, REGISTER_ROUTE } from "../Constants";
import styles from "../styles/Header.module.scss";
import UserService from "../services/UserService";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className={styles.header}>
        <a onClick={() => navigate(MAIN_PAGE_ROUTE)} className={styles.title}>
          Contacts App
        </a>

        {UserService.isLoggedIn() ? (
          <a onClick={() => UserService.logoutUser()} className={`${styles.button} ${styles.logoutButton}`}>
            Logout
          </a>
        ) : (
          <>
            <a onClick={() => navigate(LOGIN_ROUTE)} className={`${styles.button} ${styles.loginButton}`}>
              Login
            </a>
            <a onClick={() => navigate(REGISTER_ROUTE)} className={`${styles.button} ${styles.registerButton}`}>
              Register
            </a>
          </>
        )}
      </nav>
    </>
  );
};
