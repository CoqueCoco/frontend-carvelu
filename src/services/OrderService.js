import { apiRequest } from "../api/api";

export async function checkoutOrder() {
  return await apiRequest("/orders/checkout", "POST");
}