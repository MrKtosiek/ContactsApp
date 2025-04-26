import { useNavigate } from "react-router-dom";
import React from "react";
import { LOGIN_ROUTE, MAIN_MENU_ROUTE } from "../Constants";
import "../styles/Header.scss";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="header">
        <a onClick={() => navigate(MAIN_MENU_ROUTE)} className="title">Contacts App</a>
        <a onClick={() => navigate(LOGIN_ROUTE)} className="login-button">Login</a>
      </nav>
    </>
  );
};
