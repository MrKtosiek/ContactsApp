import React, { useEffect } from "react";
import { ContactDetailsDto } from "../dtos/ContactDetailsDto";
import { useNavigate, useParams } from "react-router-dom";
import ContactService from "../services/ContactService";
import { Header } from "./Header";
import { MAIN_PAGE_ROUTE } from "../Constants";
import styles from "../styles/ContactDetails.module.scss";
import { useForm } from "react-hook-form";
import { UpdateContactDto } from "../dtos/UpdateContactDto";

export const ContactDetails: React.FC = () => {
  const FIRST_NAME_INPUT_ID = "firstName";
  const LAST_NAME_INPUT_ID = "lastName";
  const EMAIL_INPUT_ID = "email";
  const PHONE_NUMBER_INPUT_ID = "phoneNumber";
  const BIRTH_DATE_INPUT_ID = "birthDate";
  const CATEGORY_DROPDOWN_ID = "category";
  const SUBCATEGORY_DROPDOWN_ID = "subCategory";
  const CUSTOM_SUBCATEGORY_DROPDOWN_ID = "customSubCategory";

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, reset, watch, setValue } = useForm<UpdateContactDto>();
  const category = watch(CATEGORY_DROPDOWN_ID);
  const [contact, setContact] = React.useState<ContactDetailsDto | null>(null);

  useEffect(() => {
    if (id) {
      ContactService.getContactById(parseInt(id))
        .then((response) => {
          setContact(response);
          reset(response);
        })
        .catch((error) => {
          console.error("Error fetching contact details:", error);
        });
    }
  }, [id, reset]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setValue(CATEGORY_DROPDOWN_ID, selectedCategory);

    if (selectedCategory === "Work") {
      setValue(SUBCATEGORY_DROPDOWN_ID, contact?.subCategory || "Boss");
      setValue(CUSTOM_SUBCATEGORY_DROPDOWN_ID, null);
    } else if (selectedCategory === "Other") {
      setValue(SUBCATEGORY_DROPDOWN_ID, null);
      setValue(CUSTOM_SUBCATEGORY_DROPDOWN_ID, contact?.customSubCategory || "");
    } else {
      setValue(SUBCATEGORY_DROPDOWN_ID, null);
      setValue(CUSTOM_SUBCATEGORY_DROPDOWN_ID, null);
    }
  };

  const onSubmit = async (data: UpdateContactDto) => {
    if (id) {
      try {
        data.password = "password";
        await ContactService.updateContact(parseInt(id), data);
        navigate(MAIN_PAGE_ROUTE);
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className={styles.content}>
        {contact && (
          <>
            <h3>Contact details</h3>
            <form className={styles.updateForm} onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor={FIRST_NAME_INPUT_ID}>First name</label>
              <input id={FIRST_NAME_INPUT_ID} {...register(FIRST_NAME_INPUT_ID, { required: true })} />

              <label htmlFor={LAST_NAME_INPUT_ID}>Last name</label>
              <input id={LAST_NAME_INPUT_ID} {...register(LAST_NAME_INPUT_ID, { required: true })} />

              <label htmlFor={EMAIL_INPUT_ID}>Email</label>
              <input type="email" id={EMAIL_INPUT_ID} {...register(EMAIL_INPUT_ID, { required: true })} />

              <label htmlFor={PHONE_NUMBER_INPUT_ID}>Phone number</label>
              <input type="tel" id={PHONE_NUMBER_INPUT_ID} {...register(PHONE_NUMBER_INPUT_ID, { required: true })} />

              <label htmlFor={BIRTH_DATE_INPUT_ID}>Birth date</label>
              <input type="date" id={BIRTH_DATE_INPUT_ID} {...register(BIRTH_DATE_INPUT_ID, { required: true })} />

              <label htmlFor={CATEGORY_DROPDOWN_ID}>Category</label>
              <select id={CATEGORY_DROPDOWN_ID} {...register(CATEGORY_DROPDOWN_ID, { required: true, onChange: handleCategoryChange })}>
                <option value="Private">Private</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>

              {category === "Work" && (
                <>
                  <label htmlFor={SUBCATEGORY_DROPDOWN_ID}>Subcategory</label>
                  <select id={SUBCATEGORY_DROPDOWN_ID} {...register(SUBCATEGORY_DROPDOWN_ID, { required: true })}>
                    <option value="Boss">Boss</option>
                    <option value="Client">Client</option>
                  </select>
                </>
              )}

              {category === "Other" && (
                <>
                  <label htmlFor={CUSTOM_SUBCATEGORY_DROPDOWN_ID}>Subcategory</label>
                  <input id={CUSTOM_SUBCATEGORY_DROPDOWN_ID} {...register(CUSTOM_SUBCATEGORY_DROPDOWN_ID, { required: true })} />
                </>
              )}

              <button type="submit">Save</button>
            </form>

            <a onClick={() => navigate(MAIN_PAGE_ROUTE)} className={styles.goBack}>
              Back to contacts
            </a>
          </>
        )}
      </div>
    </>
  );
};
