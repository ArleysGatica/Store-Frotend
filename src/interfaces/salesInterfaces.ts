export interface IListDescuentoResponse {
  descuentosPorProductosGenerales: IDescuentosProductos[];
  descuentosPorProductosEnSucursal: IDescuentosProductos[];
  descuentosPorGruposGenerales: IDescuentoGrupo[];
  descuentosPorGruposEnSucursal: IDescuentoGrupo[];
}

export interface IDescuentosProductos {
  descuentoId: IDescuento;
  productId: string;
  sucursalId?: string;
  deleted_at: Date | null;
}

export interface IDescuentoGrupo {
  descuentoId: IDescuento;
  grupoId: string;
  sucursalId?: string;
  deleted_at: Date | null;
}

export interface IDescuento {
  _id: string;
  nombre: string;
  tipoDescuento: IDisccountType;
  valorDescuento: number;
  fechaInicio: Date;
  fechaFin: Date;
  minimoCompra: { $numberDecimal: number };
  minimoCantidad: number;
  activo: boolean;
  moneda_id: string;
  codigoDescunto: string;
  deleted_at: Date | null;
}

export type IDisccountType = 'porcentaje' | 'valor';
