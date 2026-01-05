import { isAxiosError } from "axios";
import getApiInstance from "./apiInstance.ts";
import { LOGIN_URL, REGISTER_URL } from "./constants.ts";

const createAuthRequest = (url: string) => {
  return async (email: string, password: string) => {
    const api = getApiInstance();

    try {
      const result = await api.post(url, {
        email,
        password,
      });
      return result.data;
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response && err.response.data) {
        throw new Error(err.response.data.message);
      }
    }
  };
};

export const registerRequest = createAuthRequest(REGISTER_URL);
export const loginRequest = createAuthRequest(LOGIN_URL);
