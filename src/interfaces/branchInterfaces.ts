import { Branch } from '../app/slices/branchSlice';

export interface IBranchSlice {
  status: IStatus;
  error: string | null;
  //   branches: IBranch[];

  branches: IBranch | null; // La sucursal cargada
  loading: boolean;
}

export interface IBranch {
  _id: string;
  pais: string;
  ciudad: string;
  nombre: string;
  telefono: string;
  direccion: string;
  description: string;
}

export interface IBranchProps {
  onEdit: (isEdit: boolean) => void;
  branch: Branch;
}

export type IStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ITablaBranchSlice {
  status: IStatus;
  error: string | null;
  tablaBranches: ITablaBranch[];
}

export interface IProduct {
  createdAt: string;
  descripcion: string;
  monedaId: string;
  nombre: string;
  precio: { $numberDecimal: string };
  updatedAt: string;
  _id?: number;
}
export interface ITablaBranch {
  _id?: string;
  nombre: string;
  descripcion: string;
  precio: { $numberDecimal: number };
  monedaId?: string;
  grupoId?: string;
  stock: number;
  sucursalId: string;
  updatedAt?: string;
  createdAt?: string;
}
