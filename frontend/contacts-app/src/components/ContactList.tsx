import React, { useEffect, useState } from "react";
import ContactService from "../services/ContactService";
import { ContactSummaryDto } from "../dtos/ContactSummaryDto";
import { ContactEntry } from "./ContactEntry";
import styles from "../styles/ContactList.module.scss";
import { useNavigate } from "react-router-dom";
import { ADD_CONTACT_ROUTE } from "../Constants";

export const ContactList: React.FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<ContactSummaryDto[]>([]);

  const fetchContacts = async () => {
    ContactService.getAllContacts()
      .then((response) => {
        setContacts(response);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <div className={styles.contactList}>
        {contacts.map((contact) => (
          <ContactEntry key={contact.id} contact={contact} refresh={fetchContacts} />
        ))}
      </div>
      <a onClick={() => navigate(ADD_CONTACT_ROUTE)} className={styles.addContactButton}>
        Add contact
      </a>
    </>
  );
};
