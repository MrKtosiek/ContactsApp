import React, { useEffect, useState } from "react";
import ContactService from "../services/ContactService";
import { ContactSummaryDto } from "../dtos/ContactSummaryDto";
import { ContactEntry } from "./ContactEntry";
import "../styles/ContactList.scss";

export const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<ContactSummaryDto[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      ContactService.getAllContacts()
        .then((response) => {
          setContacts(response);
        })
        .catch((error) => {
          console.error("Error fetching contacts:", error);
        });
    };
    fetchContacts();
  }, []);

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactEntry key={contact.id} contact={contact} />
      ))}
    </div>
  );
};
