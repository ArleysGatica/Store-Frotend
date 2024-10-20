import axios, { AxiosInstance } from 'axios';

export enum PATH_LIST {
  PREFIX = '/prod/',
  Login = 'users',
}

export const createAxiosInstance = (
  JWT: string,
  PATH: string
): AxiosInstance => {
  const baseURL = `${import.meta.env.VITE_API_URL_BACKEND?.replace(/\/?$/, '/')}${PATH}`;

  const headers =
    PATH === PATH_LIST.Login
      ? {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      : {
          Authorization: `Bearer ${JWT}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        };

  return axios.create({
    baseURL,
    headers,
  });
};
