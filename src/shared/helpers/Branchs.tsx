import { Branch, fetchBranchesById } from '../../app/slices/branchSlice';
import { store } from '../../app/store';

export const fetchBranches = async (id: string): Promise<Branch[]> => {
  try {
    const response = await store.dispatch(fetchBranchesById(id)).unwrap();
    return response;
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw new Error('Failed to fetch branches');
  }
};
