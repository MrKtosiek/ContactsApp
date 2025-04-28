import React, { useEffect } from "react";
import { ContactDetailsDto } from "../dtos/ContactDetailsDto";
import { useNavigate, useParams } from "react-router-dom";
import ContactService from "../services/ContactService";
import { Header } from "../components/Header";
import { MAIN_PAGE_ROUTE } from "../Constants";
import styles from "../styles/ContactDetails.module.scss";
import UserService from "../services/UserService";
import { UpdateContactForm } from "../components/UpdateContactForm";
import { ContactDetailsDisplay } from "../components/ContactDetailsDisplay";

export const ContactDetails: React.FC = () => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = React.useState<ContactDetailsDto | null>(null);

  useEffect(() => {
    if (id) {
      ContactService.getContactById(parseInt(id))
        .then((response) => {
          setContact(response);
        })
        .catch((error) => {
          console.error("Error fetching contact details:", error);
        });
    }
  }, [id]);

  return (
    <>
      <Header />
      <div className={styles.content}>
        {contact && (
          <>
            <h3>Contact details</h3>

            {UserService.isLoggedIn() ? (
              <UpdateContactForm contact={contact} />
            ) : (
              <ContactDetailsDisplay contact={contact} />
            )}

            <a onClick={() => navigate(MAIN_PAGE_ROUTE)} className={styles.goBack}>
              Back to contacts
            </a>
          </>
        )}
      </div>
    </>
  );
};
