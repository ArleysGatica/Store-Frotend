import {
  IProduct,
  Branch as IBranch,
  IProductoGroups,
} from './branchInterfaces';

export interface IListDescuentoResponse {
  descuentosPorProductosGenerales: IDescuentosProductos[];
  descuentosPorProductosEnSucursal: IDescuentosProductos[];
  descuentosPorGruposGenerales: IDescuentoGrupo[];
  descuentosPorGruposEnSucursal: IDescuentoGrupo[];
}

export interface IDescuentosProductos {
  descuentoId: IDescuento;
  productId: IProduct;
  sucursalId?: IBranch;
  deleted_at: Date | null;
}

export interface IDescuentoGrupo {
  descuentoId: IDescuento;
  grupoId: IProductoGroups;
  sucursalId?: IBranch;
  deleted_at: Date | null;
}

export interface IDescuento {
  nombre: string;
  tipoDescuento: IDisccountType;
  valorDescuento: number;
  fechaInicio: Date;
  fechaFin: Date;
  minimoCompra: number;
  minimoCantidad: number;
  activo: boolean;
  moneda_id: string;
  codigoDescunto: string;
  deleted_at: Date | null;
}

export type IDisccountType = 'porcentaje' | 'valor';
