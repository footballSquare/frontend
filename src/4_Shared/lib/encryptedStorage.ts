// 암호화된 로컬스토리지 유틸리티
import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET_KEY;

export const encryptedStorage = {
  setItem: (key: string, value: unknown) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        SECRET_KEY
      ).toString();
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error("Failed to encrypt and store data:", error);
    }
  },

  getItem: (key: string) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;

      const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(
        CryptoJS.enc.Utf8
      );
      return JSON.parse(decrypted);
    } catch (error) {
      console.error("Failed to decrypt and retrieve data:", error);
      return null;
    }
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },
};
