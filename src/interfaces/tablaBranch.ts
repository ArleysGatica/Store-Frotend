import { IStatus } from './branchInterfaces';

export interface ITablaBranchSlice {
  status: IStatus;
  error: string | null;
  tablaBranches: ITablaBranch[];
}

export interface ITablaBranch {
  id: string;
  name: string;
  units: number;
  product: string;
}
