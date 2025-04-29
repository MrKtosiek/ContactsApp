import React, { useEffect, useState } from "react";
import { ContactDetailsDto } from "../dtos/ContactDetailsDto";
import { useNavigate, useParams } from "react-router-dom";
import ContactService from "../services/ContactService";
import { MAIN_PAGE_ROUTE } from "../Constants";
import { useForm } from "react-hook-form";
import { UpdateContactDto } from "../dtos/UpdateContactDto";
import styles from "../styles/UpdateContactForm.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const UpdateContactForm: React.FC<{ contact: ContactDetailsDto }> = ({ contact }) => {
  const FIRST_NAME_INPUT = "firstName";
  const LAST_NAME_INPUT = "lastName";
  const EMAIL_INPUT = "email";
  const PHONE_NUMBER_INPUT = "phoneNumber";
  const BIRTH_DATE_INPUT = "birthDate";
  const PASSWORD_INPUT = "password";
  const CATEGORY_DROPDOWN = "category";
  const SUBCATEGORY_DROPDOWN = "subCategory";
  const CUSTOM_SUBCATEGORY_INPUT = "customSubCategory";

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  
  const { id } = useParams<{ id: string }>();
  const schema: yup.ObjectSchema<UpdateContactDto> = yup.object({
    [FIRST_NAME_INPUT]: yup.string().required("First name is required"),
    [LAST_NAME_INPUT]: yup.string().required("Last name is required"),
    [EMAIL_INPUT]: yup.string().required("Email is required").email("Invalid email"),
    [PHONE_NUMBER_INPUT]: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must be digits only"),
    [BIRTH_DATE_INPUT]: yup.date().required("Birth date is required"),
    [PASSWORD_INPUT]: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/\d/, "Password must contain at least one number"),
    [CATEGORY_DROPDOWN]: yup.string().required("Category is required"),
    [SUBCATEGORY_DROPDOWN]: yup
      .string()
      .nullable()
      .defined()
      .when("category", {
        is: "Work",
        then: (schema) => schema.required("Subcategory is required"),
        otherwise: (schema) => schema.nullable(),
      }),
    [CUSTOM_SUBCATEGORY_INPUT]: yup
      .string()
      .nullable()
      .defined()
      .when("category", {
        is: "Other",
        then: (schema) => schema.required("Custom subcategory is required"),
        otherwise: (schema) => schema.nullable(),
      }),
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateContactDto>({ resolver: yupResolver(schema) });
  const category = watch(CATEGORY_DROPDOWN);

  useEffect(() => {
    reset(contact);
  }, [contact, reset]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setValue(CATEGORY_DROPDOWN, selectedCategory);

    if (selectedCategory === "Work") {
      setValue(SUBCATEGORY_DROPDOWN, contact?.subCategory || "Boss");
      setValue(CUSTOM_SUBCATEGORY_INPUT, null);
    } else if (selectedCategory === "Other") {
      setValue(SUBCATEGORY_DROPDOWN, null);
      setValue(CUSTOM_SUBCATEGORY_INPUT, contact?.customSubCategory || "");
    } else {
      setValue(SUBCATEGORY_DROPDOWN, null);
      setValue(CUSTOM_SUBCATEGORY_INPUT, null);
    }
  };

  const onSubmit = async (data: UpdateContactDto) => {
    if (id) {
      try {
        await ContactService.updateContact(parseInt(id), data);
        navigate(MAIN_PAGE_ROUTE);
      } catch (err: any) {
        console.error("Error updating contact:", err);
        setError(err.response?.data?.message || "An error occurred while updating the contact.");
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={FIRST_NAME_INPUT}>First name</label>
        <input id={FIRST_NAME_INPUT} {...register(FIRST_NAME_INPUT)} />
        {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}

        <label htmlFor={LAST_NAME_INPUT}>Last name</label>
        <input id={LAST_NAME_INPUT} {...register(LAST_NAME_INPUT)} />
        {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}

        <label htmlFor={EMAIL_INPUT}>Email</label>
        <input type="email" id={EMAIL_INPUT} {...register(EMAIL_INPUT)} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}

        <label htmlFor={PHONE_NUMBER_INPUT}>Phone number</label>
        <input type="tel" id={PHONE_NUMBER_INPUT} {...register(PHONE_NUMBER_INPUT)} />
        {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber.message}</span>}

        <label htmlFor={BIRTH_DATE_INPUT}>Birth date</label>
        <input type="date" id={BIRTH_DATE_INPUT} {...register(BIRTH_DATE_INPUT)} />
        {errors.birthDate && <span className={styles.error}>{errors.birthDate.message}</span>}

        <label htmlFor={PASSWORD_INPUT}>Password</label>
        <input type="text" id={PASSWORD_INPUT} {...register(PASSWORD_INPUT)} />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}

        <label htmlFor={CATEGORY_DROPDOWN}>Category</label>
        <select
          id={CATEGORY_DROPDOWN}
          {...register(CATEGORY_DROPDOWN, { onChange: handleCategoryChange })}
        >
          <option value="Private">Private</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && <span className={styles.error}>{errors.category.message}</span>}

        {category === "Work" && (
          <>
            <label htmlFor={SUBCATEGORY_DROPDOWN}>Subcategory</label>
            <select id={SUBCATEGORY_DROPDOWN} {...register(SUBCATEGORY_DROPDOWN)}>
              <option value="Boss">Boss</option>
              <option value="Client">Client</option>
            </select>
            {errors.subCategory && <span className={styles.error}>{errors.subCategory.message}</span>}
          </>
        )}

        {category === "Other" && (
          <>
            <label htmlFor={CUSTOM_SUBCATEGORY_INPUT}>Subcategory</label>
            <input id={CUSTOM_SUBCATEGORY_INPUT} {...register(CUSTOM_SUBCATEGORY_INPUT)} />
            {errors.customSubCategory && <span className={styles.error}>{errors.customSubCategory.message}</span>}
          </>
        )}

        {error && <span className={styles.error}>{error}</span>}

        <button type="submit">Save</button>
      </form>
    </>
  );
};
