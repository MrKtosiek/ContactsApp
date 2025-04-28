import React from "react";
import { ContactSummaryDto } from "../dtos/ContactSummaryDto";
import { useNavigate } from "react-router-dom";
import { CONTACT_ROUTE } from "../Constants";
import styles from "../styles/ContactEntry.module.scss";
import ContactService from "../services/ContactService";

export const ContactEntry: React.FC<{ contact: ContactSummaryDto, refresh: () => void }> = ({ contact, refresh }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`${CONTACT_ROUTE}/${contact.id}`);
  };

  const handleDeleteClick = async () => {
    await ContactService.deleteContact(contact.id);
    refresh();
  };

  return (
    <div className={styles.contactEntry}>
      <span className={styles.contactName}>{contact.firstName} {contact.lastName}</span>
      <span className={styles.contactCategory}>{contact.category}</span>
      <button className={styles.detailsButton} onClick={handleDetailsClick}>Details</button>
      <button className={styles.deleteButton} onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}
