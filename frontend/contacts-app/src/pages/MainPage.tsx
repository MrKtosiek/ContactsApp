import { useNavigate } from "react-router-dom";
import { ContactList } from "../components/ContactList";
import { Header } from "../components/Header";
import { ADD_CONTACT_ROUTE } from "../Constants";
import styles from "../styles/MainPage.module.scss";
import UserService from "../services/UserService";

export const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className={styles.content}>
        <h3>Contacts</h3>
        
        <ContactList />

        {UserService.isLoggedIn() && (
          <a onClick={() => navigate(ADD_CONTACT_ROUTE)} className={styles.addContactButton}>
            Add contact
          </a>
        )}
      </div>
    </>
  );
};
