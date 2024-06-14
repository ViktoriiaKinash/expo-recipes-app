import TokensService from "../TokensService";
import api from "../api";
import type { LoginValues, RegisterValues } from "./types";

class AuthApi {
  async login(values: LoginValues): Promise<unknown> {
    const response = await api.axiosInstance.post("/authenticate", values);
    TokensService.persistAccessToken(response.data.jwt);
    return response.data;
  }

  async register(values: RegisterValues): Promise<unknown> {
    const response = await api.axiosInstance.post("/register", values);
    TokensService.persistAccessToken(response.data.jwt);
    return response.data;
  }

  async getUser(): Promise<string> {
    const response = await api.axiosInstance.get<string>("/user/profile");
    return response.data;
  }

  async logout(): Promise<void> {
    TokensService.removeAccessToken();
  }
}

export default new AuthApi();
