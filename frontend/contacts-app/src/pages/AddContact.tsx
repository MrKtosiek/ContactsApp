import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { MAIN_PAGE_ROUTE } from "../Constants";
import styles from "../styles/AddContact.module.scss";
import UserService from "../services/UserService";
import { AddContactForm } from "../components/AddContactForm";

export const AddContact: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!UserService.isLoggedIn()) {
      navigate(MAIN_PAGE_ROUTE);
      return;
    }
  }, []);

  
  return (
    <>
      <Header />
      <div className={styles.content}>
        <h3>Add contact</h3>

        <AddContactForm />

        <a onClick={() => navigate(MAIN_PAGE_ROUTE)} className={styles.goBack}>
          Cancel
        </a>
      </div>
    </>
  );
};
