import { ContactList } from "../components/ContactList";
import { Header } from "../components/Header";
import "../styles/MainPage.scss";

export const MainPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="content">
        <h3>Contacts</h3>
        <ContactList />
      </div>
    </>
  );
};
