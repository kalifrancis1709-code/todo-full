import type { User } from "../../Interfaces/User";

const TOKEN_KEY = "access_token";
const USER_KEY = "user";

export function login(token: string, user: User): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  const isAuthenticated = !!getToken();
  console.log("Est connecté", isAuthenticated);
  return isAuthenticated;
}

export function getAuthHeader(): Record<string, string> {
  const token = getToken();
  if (!token) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}
