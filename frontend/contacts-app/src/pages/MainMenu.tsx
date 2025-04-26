import { ContactList } from "../components/ContactList";
import { Header } from "../components/Header";

export const MainMenu: React.FC = () => {
  return (
    <>
      <Header />
      <h3>Contacts</h3>
      <ContactList />
    </>
  );
};
