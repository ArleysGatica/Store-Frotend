import { AxiosResponse } from 'axios';
import { createAxiosInstance, PATH_LIST } from '../axios';
import { Token } from '@/shared/hooks/useJWT';
import { ITransferPost } from '@/interfaces/transferInterfaces';

export const createTransfer = async ({
  ...transfer
}: ITransferPost): Promise<AxiosResponse> => {
  const axiosInstance = createAxiosInstance(Token(), PATH_LIST.Transfer);
  const response = await axiosInstance.post('/', transfer);
  return response;
};
