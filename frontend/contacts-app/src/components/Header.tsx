import { useNavigate } from "react-router-dom";
import React from "react";
import { LOGIN_ROUTE, MAIN_MENU_ROUTE } from "../Constants";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <a onClick={() => navigate(MAIN_MENU_ROUTE)}><h1>Contacts App</h1></a>
        <a onClick={() => navigate(LOGIN_ROUTE)}><h1>Login</h1></a>
      </nav>
    </>
  );
};
