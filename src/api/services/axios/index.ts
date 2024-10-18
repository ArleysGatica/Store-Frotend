import axios, { AxiosInstance } from 'axios';

export const createAxiosInstance = (
  JWT: string,
  PATH?: string
): AxiosInstance => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL as string}${PATH}`;

  const headers = {
    Authorization: `Bearer ${JWT}`,
    'Content-Type': 'application/json',
  };

  const clientAxios = axios.create({
    baseURL,
    headers,
  });

  return clientAxios;
};
