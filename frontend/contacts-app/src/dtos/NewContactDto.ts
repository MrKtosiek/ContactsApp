export interface NewContactDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  category: string;
  subCategory: string | null;
  customSubCategory: string | null;
  phoneNumber: string;
  birthDate: Date;
}
