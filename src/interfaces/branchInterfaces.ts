export interface IBranchSlice {
  status: IStatus;
  error: string | null;
  branches: IBranch[];
}

export interface IBranch {
  _id: string;
  pais: string;
  ciudad: string;
  nombre: string;
  telefono: string;
  direccion: string;
}

export interface IBranchProps {
  onEdit: (isEdit: boolean) => void;
  branch: IBranch;
  onEdit: (isEdit: boolean) => void;
}

export type IStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ITablaBranchSlice {
  status: IStatus;
  error: string | null;
  tablaBranches: ITablaBranch[];
}
export interface ITablaBranch {
  nombre: string;
  descripcion: string;
  precio: number;
  monedaId: string;
  grupoId: string;
  stock: number;
  sucursalId: string;
}
