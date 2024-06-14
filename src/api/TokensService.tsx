import * as SecureStore from "expo-secure-store";

class TokensService {
  private static readonly ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

  public accessToken: string | null = null;

  async init(): Promise<void> {
    try {
      const [accessToken] = await Promise.all([this.readAccessToken()]);

      this.accessToken = accessToken;
    } catch (e) {}
  }

  async persistAccessToken(token: string): Promise<void> {
    this.accessToken = token;
    return SecureStore.setItemAsync(TokensService.ACCESS_TOKEN_KEY, token);
  }

  async removeAccessToken(): Promise<void> {
    this.accessToken = null;
    return SecureStore.deleteItemAsync(TokensService.ACCESS_TOKEN_KEY);
  }

  async clear(): Promise<void> {
    this.accessToken = null;

    await Promise.allSettled([
      SecureStore.deleteItemAsync(TokensService.ACCESS_TOKEN_KEY),
    ]);
  }

  private async readAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(TokensService.ACCESS_TOKEN_KEY);
  }
}

export default new TokensService();
