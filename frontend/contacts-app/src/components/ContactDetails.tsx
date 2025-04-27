import React, { useEffect } from "react";
import { ContactDetailsDto } from "../dtos/ContactDetailsDto";
import { useNavigate, useParams } from "react-router-dom";
import ContactService from "../services/ContactService";
import { Header } from "./Header";
import { MAIN_PAGE_ROUTE } from "../Constants";
import styles from "../styles/ContactDetails.module.scss";

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
            <form className={styles.updateForm}>
              <label htmlFor="firstName">First name</label>
              <input type="text" id="firstName" required defaultValue={contact.firstName} />

              <label htmlFor="lastName">Last name</label>
              <input type="text" id="lastName" required defaultValue={contact.lastName} />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" required defaultValue={contact.email} />

              <label htmlFor="category">Category</label>
              <select id="category" required defaultValue={contact.category}>
                <option value="Private">Private</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>

              <label htmlFor="subCategory">Subcategory</label>
              <select id="subCategory" required defaultValue={contact.subCategory}>
                <option value="Boss">Boss</option>
                <option value="Client">Client</option>
              </select>

              <label htmlFor="customSubCategory">Subcategory</label>
              <input type="text" id="customSubCategory" required defaultValue={contact.subCategory} />

              <button type="submit">Save</button>
            </form>

            <a onClick={() => navigate(MAIN_PAGE_ROUTE)} className={styles.goBack}>Back to contacts</a>
          </>
        )}
      </div>
    </>
  );
};
