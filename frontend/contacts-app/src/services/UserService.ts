import axios, { AxiosInstance } from "axios";
import { USER_API_URL } from "../Constants";
import { RegisterDto } from "../dtos/RegisterDto";
import { LoginDto } from "../dtos/LoginDto";

export class UserService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: USER_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async registerUser(user: RegisterDto) {
    try {
      await this.axiosInstance.post("/register", user);
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  async loginUser(user: LoginDto) {
    try {
      const response = await this.axiosInstance.post("/login", user);
      sessionStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  logoutUser() {
    sessionStorage.removeItem("token");
    window.location.reload();
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem("token");
    return !!token;
  }
}

export default new UserService();
