import { STORAGE_KEYS } from "@/common/constants";

export const saveTokenToStorage = (token: string) => {
  window.localStorage.setItem(STORAGE_KEYS.token, token);
};

export const getTokenFromStorage = () => {
  const token = window.localStorage.getItem(STORAGE_KEYS.token);
  if (!token) {
    return null;
  }
  return `Bearer ${token}`;
};
export const removeTokenFromStorage = () => {
  window.localStorage.removeItem(STORAGE_KEYS.token);
};
