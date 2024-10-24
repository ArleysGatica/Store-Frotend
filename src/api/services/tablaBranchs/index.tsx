import { AxiosResponse } from 'axios';
import { createAxiosInstance, PATH_LIST } from '../axios';
import { Token } from '../../../shared/hooks/useJWT';
import { ITablaBranch } from '../../../interfaces/branchInterfaces';

export const createTablaBranch = async (
  branch: ITablaBranch
): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(Token(), PATH_LIST.Inventory);
  const response = await axiosInstance.post('/', branch);
  return response;
};

export const inventoryGetAll = async (): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(Token(), PATH_LIST.Inventory);
  const response = await axiosInstance.get('/');
  return response.data;
};
