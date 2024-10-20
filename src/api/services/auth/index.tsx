import axios, { AxiosResponse } from 'axios';

export interface Iauth {
  username: string;
  password: string;
  role: string;
}

export type IAuthCredentials = Omit<Iauth, 'role'>;
// http://localhost:3000/api/users/login
const URL = 'http://localhost:3000/api/';

export const createUsers = async (data: Iauth): Promise<AxiosResponse> => {
  const response = await axios.post(`${URL}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  return response;
};

export const registerUsers = async (data: IAuthCredentials) => {
  return await axios.post(`${URL}users/login`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const getAllUsers = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${URL}users`);
  return response;
};
