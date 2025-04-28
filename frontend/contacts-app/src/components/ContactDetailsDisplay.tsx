import React from "react";
import { ContactDetailsDto } from "../dtos/ContactDetailsDto";
import styles from "../styles/ContactDetailsDisplay.module.scss";

export const ContactDetailsDisplay: React.FC<{ contact: ContactDetailsDto }> = ({ contact }) => {
  return (
    <>
      <div className={styles.content}>
        
        <p className={styles.label}>First name</p>
        <p className={styles.field}>{contact.firstName}</p>

        <p className={styles.label}>Last name</p>
        <p className={styles.field}>{contact.lastName}</p>

        <p className={styles.label}>Email</p>
        <p className={styles.field}>{contact.email}</p>

        <p className={styles.label}>Phone number</p>
        <p className={styles.field}>{contact.phoneNumber}</p>

        <p className={styles.label}>Birth date</p>
        <p className={styles.field}>{contact.birthDate.toString()}</p>

        <p className={styles.label}>Category</p>
        <p className={styles.field}>{contact.category}</p>

        {contact.subCategory && (
          <>
            <p className={styles.label}>Subcategory</p>
            <p className={styles.field}>{contact.subCategory}</p>
          </>
        )}

        {contact.customSubCategory && (
          <>
            <p className={styles.label}>Custom subcategory</p>
            <p className={styles.field}>{contact.customSubCategory}</p>
          </>
        )}

      </div>
    </>
  );
};
