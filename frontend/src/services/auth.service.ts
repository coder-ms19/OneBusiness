import axiosInstance from "./axiosInstance";

class AuthService {
  public async login(data: any) {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  }

  public async registerAdmin(data: any) {
    const response = await axiosInstance.post("/auth/register-admin", data);
    return response.data;
  }
}

export const authService = new AuthService();
