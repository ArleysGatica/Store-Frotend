import { AxiosResponse } from 'axios';
import { createAxiosInstance, PATH_LIST } from '../axios';
import { Token } from '@/shared/hooks/useJWT';

export interface IProductoGroups {
  _id?: string;
  nombre: string;
  descripcion: string;
  createdAt?: string;
  updatedAt?: string;
}

export const createGroup = async (
  group: IProductoGroups
): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(Token(), PATH_LIST.Groups);
  const response = await axiosInstance.post('/', group);
  return response;
};

export const getAllGroups = async (): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(Token(), PATH_LIST.Groups);
  const response = await axiosInstance.get('/');
  console.log(response.data, 'response');
  return response.data;
};
