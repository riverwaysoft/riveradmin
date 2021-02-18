export type TokenStorage = {
  getToken(): string | null;
  setToken(token: string): void;
  removeToken(): void;
};
