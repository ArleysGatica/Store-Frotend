import { fetchBranchesById } from '../../app/slices/branchSlice';
import { store } from '../../app/store';
import { ITablaBranch } from '@/interfaces/branchInterfaces';

export const GetBranches = async (id: string): Promise<ITablaBranch[]> => {
  try {
    const response = await store.dispatch(fetchBranchesById(id)).unwrap();
    return response;
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw new Error('Failed to fetch branches');
  }
};
