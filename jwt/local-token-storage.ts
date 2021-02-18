import { TokenStorage } from './token-storage';

export class LocalTokenStorage implements TokenStorage {
  constructor(private key: string) {}

  getToken(): string | null {
    return localStorage.getItem(this.key);
  }

  removeToken() {
    localStorage.removeItem(this.key);
  }

  setToken(token: string): void {
    localStorage.setItem(this.key, token);
  }
}
