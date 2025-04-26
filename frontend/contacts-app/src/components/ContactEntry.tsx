import React from "react";
import { ContactSummaryDto } from "../dtos/ContactSummaryDto";
import "../styles/ContactEntry.scss";

export const ContactEntry: React.FC<{ contact: ContactSummaryDto }> = ({ contact }) => {
  return (
    <div className="contact-entry">
      <span className="contact-name">{contact.firstName} {contact.lastName}</span>
      <span className="contact-category">{contact.category}</span>
      <button className="details-button">Details</button>
    </div>
  );
}
