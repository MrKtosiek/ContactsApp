import axios, { AxiosInstance } from "axios";
import { API_URL } from "../Constants";
import { ContactSummaryDto } from "../dtos/ContactSummaryDto";
import { NewContactDto } from "../dtos/NewContactDto";
import { UpdateContactDto } from "../dtos/UpdateContactDto";
import { ContactDetailsDto } from "../dtos/ContactDetailsDto";

export class ContactService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async addContact(contact: NewContactDto) {
    try {
      await this.axiosInstance.post("/contacts", contact);
    } catch (error) {
      console.error("Error adding contact:", error);
      throw error;
    }
  }

  async getAllContacts(): Promise<ContactSummaryDto[]> {
    try {
      const response = await this.axiosInstance.get("/contacts");
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  }

  async getContactById(id: number): Promise<ContactDetailsDto> {
    try {
      const response = await this.axiosInstance.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching contact:", error);
      throw error;
    }
  }

  async updateContact(id: number, contact: UpdateContactDto) {
    try {
      await this.axiosInstance.put(`/contacts/${id}`, contact);
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }
}

export default new ContactService();
