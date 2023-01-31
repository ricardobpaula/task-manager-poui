import { getSmartclientToken } from "src/shared/session-storage";

const token = getSmartclientToken()

export const environment = {
  production: true,
  baseUrl: 'http://127.0.0.1:3000/rest',
  token: `Bearer ${token}`
};
