import { AxiosResponse } from 'axios';
import { createAxiosInstance, PATH_LIST } from '../axios';
import { Token } from '../../../shared/hooks/useJWT';
import { ITablaBranch } from '@/interfaces/branchInterfaces';

interface IBranch {
  nombre: string;
  direccion: string;
  telefono: string;
  pais: string;
  ciudad: string;
}

export const createBranch = async ({
  ...branch
}: IBranch): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(Token(), PATH_LIST.Branch);
  const response = await axiosInstance.post('/', branch);
  return response;
};

export const getAll = async (): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(Token(), PATH_LIST.Branch);
  const response = await axiosInstance.get('/');
  return response.data;
};

export const getBranchesById = async (id: string): Promise<ITablaBranch[]> => {
  const axiosInstance = createAxiosInstance(Token(), PATH_LIST.Branch);
  const response = await axiosInstance.get(`/${id}/products`); // Esto devuelve un AxiosResponse
  return response.data; // Aquí se retorna solo la propiedad data que debería ser un arreglo de Branch
};

export const updateBranch = async (branch: IBranch, id: string) => {
  const axiosInstance = createAxiosInstance(Token(), PATH_LIST.Branch);
  const response = await axiosInstance.put(`/${id}`, branch);
  return response;
};

export const deleteBranchById = async (id: string): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(PATH_LIST.Branch, '');
  const response = await axiosInstance.delete(`/${id}`);
  return response;
};
