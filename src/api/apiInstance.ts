import axios, { type AxiosInstance } from "axios";
import { useUserStore } from "../store/user.ts";

let api: AxiosInstance | null = null;

const createApiInstance = () => {
  const _api = axios.create();

  _api.interceptors.request.use(
    async (config) => {
      const user = useUserStore.getState().user;

      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }

      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    },
  );

  _api.interceptors.response.use(
    async (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return _api;
};

const getApiInstance = (): AxiosInstance => {
  if (!api) {
    api = createApiInstance();
  }
  return api;
};

export default getApiInstance;
