export interface ContactDetailsDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  subCategory: string | null;
  customSubCategory: string | null;
  phoneNumber: string;
  birthDate: Date;
}
