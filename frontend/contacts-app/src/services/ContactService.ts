import axios, { AxiosInstance } from "axios";
import { CONTACTS_API_URL, TOKEN_KEY } from "../Constants";
import { ContactSummaryDto } from "../dtos/ContactSummaryDto";
import { NewContactDto } from "../dtos/NewContactDto";
import { UpdateContactDto } from "../dtos/UpdateContactDto";
import { ContactDetailsDto } from "../dtos/ContactDetailsDto";
import { format } from "date-fns";

export class ContactService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: CONTACTS_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async addContact(contact: NewContactDto) {
    try {
      await this.axiosInstance.post(
        "",
        { ...contact, birthDate: this.formatDateOnly(contact.birthDate) },
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem(TOKEN_KEY)}` },
        }
      );
    } catch (error) {
      console.error("Error adding contact:", error);
      throw error;
    }
  }

  async getAllContacts(): Promise<ContactSummaryDto[]> {
    try {
      const response = await this.axiosInstance.get("");
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  }

  async getContactById(id: number): Promise<ContactDetailsDto> {
    try {
      const response = await this.axiosInstance.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching contact:", error);
      throw error;
    }
  }

  async updateContact(id: number, contact: UpdateContactDto) {
    try {
      await this.axiosInstance.put(
        `/${id}`,
        { ...contact, birthDate: this.formatDateOnly(contact.birthDate) },
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem(TOKEN_KEY)}` },
        }
      );
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }

  async deleteContact(id: number) {
    try {
      await this.axiosInstance.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem(TOKEN_KEY)}` },
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  }

  formatDateOnly(date: Date): string {
    return format(date, "yyyy-MM-dd");
  }
}

export default new ContactService();
