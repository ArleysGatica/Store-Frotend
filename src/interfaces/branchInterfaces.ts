export interface IBranchSlice {
  status: IStatus;
  error: string | null;
  branches: IBranch[];
}

export interface IBranch {
  id: string;
  pais: string;
  ciudad: string;
  nombre: string;
  telefono: string;
  direccion: string;
  pendingOrders: number;
  hasAccess: boolean;
}

export interface IBranchProps {
  branch: IBranch;
  onEdit: (isEdit: boolean) => void;
}

export type IStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
