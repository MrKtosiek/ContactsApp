import React from "react";
import { useNavigate } from "react-router-dom";
import ContactService from "../services/ContactService";
import { Header } from "../components/Header";
import { MAIN_PAGE_ROUTE } from "../Constants";
import styles from "../styles/ContactDetails.module.scss";
import { useForm } from "react-hook-form";
import { NewContactDto } from "../dtos/NewContactDto";

export const AddContact: React.FC = () => {
  const FIRST_NAME_INPUT = "firstName";
  const LAST_NAME_INPUT = "lastName";
  const EMAIL_INPUT = "email";
  const PHONE_NUMBER_INPUT = "phoneNumber";
  const BIRTH_DATE_INPUT = "birthDate";
  const CATEGORY_DROPDOWN = "category";
  const SUBCATEGORY_DROPDOWN = "subCategory";
  const CUSTOM_SUBCATEGORY_DROPDOWN = "customSubCategory";

  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm<NewContactDto>();
  const category = watch(CATEGORY_DROPDOWN);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setValue(CATEGORY_DROPDOWN, selectedCategory);

    if (selectedCategory === "Work") {
      setValue(SUBCATEGORY_DROPDOWN, "Boss");
      setValue(CUSTOM_SUBCATEGORY_DROPDOWN, null);
    } else if (selectedCategory === "Other") {
      setValue(SUBCATEGORY_DROPDOWN, null);
      setValue(CUSTOM_SUBCATEGORY_DROPDOWN, "");
    } else {
      setValue(SUBCATEGORY_DROPDOWN, null);
      setValue(CUSTOM_SUBCATEGORY_DROPDOWN, null);
    }
  };

  const onSubmit = async (data: NewContactDto) => {
    try {
      data.password = "password";
      await ContactService.addContact(data);
      navigate(MAIN_PAGE_ROUTE);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.content}>
        <h3>Add contact</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={FIRST_NAME_INPUT}>First name</label>
          <input id={FIRST_NAME_INPUT} {...register(FIRST_NAME_INPUT, { required: true })} />

          <label htmlFor={LAST_NAME_INPUT}>Last name</label>
          <input id={LAST_NAME_INPUT} {...register(LAST_NAME_INPUT, { required: true })} />

          <label htmlFor={EMAIL_INPUT}>Email</label>
          <input type="email" id={EMAIL_INPUT} {...register(EMAIL_INPUT, { required: true })} />

          <label htmlFor={PHONE_NUMBER_INPUT}>Phone number</label>
          <input type="tel" id={PHONE_NUMBER_INPUT} {...register(PHONE_NUMBER_INPUT, { required: true })} />

          <label htmlFor={BIRTH_DATE_INPUT}>Birth date</label>
          <input type="date" id={BIRTH_DATE_INPUT} {...register(BIRTH_DATE_INPUT, { required: true })} />

          <label htmlFor={CATEGORY_DROPDOWN}>Category</label>
          <select
            id={CATEGORY_DROPDOWN}
            {...register(CATEGORY_DROPDOWN, { required: true, onChange: handleCategoryChange })}
          >
            <option value="Private">Private</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>

          {category === "Work" && (
            <>
              <label htmlFor={SUBCATEGORY_DROPDOWN}>Subcategory</label>
              <select id={SUBCATEGORY_DROPDOWN} {...register(SUBCATEGORY_DROPDOWN, { required: true })}>
                <option value="Boss">Boss</option>
                <option value="Client">Client</option>
              </select>
            </>
          )}

          {category === "Other" && (
            <>
              <label htmlFor={CUSTOM_SUBCATEGORY_DROPDOWN}>Subcategory</label>
              <input id={CUSTOM_SUBCATEGORY_DROPDOWN} {...register(CUSTOM_SUBCATEGORY_DROPDOWN, { required: true })} />
            </>
          )}

          <button type="submit">Save</button>
        </form>

        <a onClick={() => navigate(MAIN_PAGE_ROUTE)} className={styles.goBack}>
          Cancel
        </a>
      </div>
    </>
  );
};
