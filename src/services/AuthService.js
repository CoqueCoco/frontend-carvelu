import { apiRequest } from "../api/api";

export async function login(credentials) {
  const response = await apiRequest("/auth/login", "POST", credentials);
  if (response.token) localStorage.setItem("token", response.token);
  return response;
}

export async function registerUser(data) {
  return await apiRequest("/auth/register", "POST", data);
}

export async function getProfile() {
  return await apiRequest("/auth/profile", "GET");
}

export function logout() {
  localStorage.removeItem("token");
}
