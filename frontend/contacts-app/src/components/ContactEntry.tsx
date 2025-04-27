import React from "react";
import { ContactSummaryDto } from "../dtos/ContactSummaryDto";
import { useNavigate } from "react-router-dom";
import { CONTACT_ROUTE } from "../Constants";
import styles from "../styles/ContactEntry.module.scss";

export const ContactEntry: React.FC<{ contact: ContactSummaryDto }> = ({ contact }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`${CONTACT_ROUTE}/${contact.id}`);
  };

  return (
    <div className={styles.contactEntry}>
      <span className={styles.contactName}>{contact.firstName} {contact.lastName}</span>
      <span className={styles.contactCategory}>{contact.category}</span>
      <button className={styles.detailsButton} onClick={handleDetailsClick}>Details</button>
    </div>
  );
}
