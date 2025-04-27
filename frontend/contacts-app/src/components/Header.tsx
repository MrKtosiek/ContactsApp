import { useNavigate } from "react-router-dom";
import React from "react";
import { LOGIN_ROUTE, MAIN_PAGE_ROUTE } from "../Constants";
import styles from "../styles/Header.module.scss";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className={styles.header}>
        <a onClick={() => navigate(MAIN_PAGE_ROUTE)} className={styles.title}>Contacts App</a>
        <a onClick={() => navigate(LOGIN_ROUTE)} className={styles.loginButton}>Login</a>
      </nav>
    </>
  );
};
