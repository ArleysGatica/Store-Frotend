import { AxiosResponse } from 'axios';
import { createAxiosInstance } from '../axios';

export const getAll = async (): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance('', '');
  const response = await axiosInstance.get('/');
  return response.data;
};

export const deleteBranchById = async (id: string): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance('', '');
  const response = await axiosInstance.delete(`/${id}`);
  return response;
};
