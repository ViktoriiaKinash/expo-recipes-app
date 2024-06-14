import axios from "axios";

import TokensService from "./TokensService";

class Api {
  public axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
  });

  private tokenService: typeof TokensService;

  constructor() {
    this.setupAccessTokenInterceptor();
    this.tokenService = TokensService;
  }

  private setupAccessTokenInterceptor(): void {
    this.axiosInstance.interceptors.request.use((config) => {
      if (this.tokenService.accessToken) {
        config.headers.set(
          "Authorization",
          `Bearer ${this.tokenService.accessToken}`
        );
      }
      return config;
    });
  }
}

export default new Api();
