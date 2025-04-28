import React, { useEffect, useState } from "react";
import ContactService from "../services/ContactService";
import { ContactSummaryDto } from "../dtos/ContactSummaryDto";
import { ContactEntry } from "./ContactEntry";
import styles from "../styles/ContactList.module.scss";

export const ContactList: React.FC = () => {
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
    </>
  );
};
