import { ContactList } from "../components/ContactList";
import { Header } from "../components/Header";
import styles from "../styles/MainPage.module.scss";

export const MainPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <h3>Contacts</h3>
        <ContactList />
      </div>
    </>
  );
};
