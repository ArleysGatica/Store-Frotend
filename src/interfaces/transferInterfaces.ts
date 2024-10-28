import React from 'react';
import { IBranch, IStatus, ITablaBranch } from './branchInterfaces';
import { IUser } from '@/app/slices/login';

export interface IShippedOrder {
  _id: string;
  nombre: string;
  fechaRegistro: Date;
  fechaRecepcion: Date;
  sucursalOrigenId: {
    _id: string;
    nombre: string;
    direccion: string;
    ciudad: string;
    pais: string;
    telefono: string;
    deleted_at: string | null;
    createdAt: string;
    updatedAt: string;
  };
  sucursalDestinoId: {
    _id: string;
    nombre: string;
    direccion: string;
    ciudad: string;
    pais: string;
    telefono: string;
    deleted_at: string | null;
    createdAt: string;
    updatedAt: string;
  };
  usuarioIdRecibe: {
    _id: string;
    username: string;
    password: string;
    role: string;
    sucursalId: string | null;
    deleted_at: string | null;
  };
  estado: boolean;
  comentarioEnvio: string;
  consecutivo: number;
  comentarioRecepcion: string;
  estatusTraslado: IStatusTransfer;
  archivosAdjuntos: string[] | null;
  firmaEnvio: string;
  firmaRecepcion: string;
  deleted_at: string | null;
  created_at: string;
  update_at: string;
  fechaEnvio: Date;
  usuarioIdEnvia: {
    _id: string;
    username: string;
    password: string;
    role: string;
    sucursalId: string | null;
    deleted_at: string | null;
  };
}

export interface ITransferSlice {
  data: IShippedOrder[];
  sent: ITransfer[];
  received: ITransfer[];
  pending: IPendingTransfer[];
  selectedPending: IPendingTransfer | null;
  selectedPendingProducts: any[] | null;
  status: IStatus;
  error: string | null;
  selectedItem: IDetalleSelected;
}

export interface ITransfer extends ITransferDetails {
  _id: string;
  status: string;
  listDetalleTraslado: ITransferProduct[];
}

export interface ITransferPost extends ITransferDetails {
  listDetalleTraslado: ITransferProduct[];
}

export interface ITransferDetails {
  sucursalOrigenId: string;
  sucursalDestinoId: string | null;
  comentarioEnvio: string | null;
  firmaEnvio: string | null;
  archivosAdjuntos: string[];
  usuarioIdEnvia: string;
}

export interface ITransferProduct {
  inventarioSucursalId: string | undefined;
  cantidad: number;
  comentarioEnvio: string | null;
  archivosAdjuntos: string[];
}

export interface IToolTransferProps {
  userId: string;
  destinationBranchId: string | null;
  sourceBranchId: string;
  shipmentTools: ITool[];
  setShipmentTools: React.Dispatch<React.SetStateAction<ITool[]>>;
}

export interface ITool extends ITablaBranch {
  quantityToSend: number;
  comment: string | null;
  gallery: Array<string>;
}

export interface IPendingTransfer {
  _id: string;
  nombre: string;
  fechaRegistro: Date;
  fechaEnvio: Date;
  fechaRecepcion: Date | null;
  sucursalOrigenId: IBranch;
  sucursalDestinoId: IBranch;
  usuarioIdEnvia: IUser;
  usuarioIdRecibe: IUser | null;
  estado: string;
  comentarioEnvio: string;
  consecutivo?: number;
  comentarioRecepcion: string | null;
  estatusTraslado?: IStatusTransfer;
  archivosAdjuntos: string[] | null;
  firmaEnvio: string;
  firmaRecepcion: string;
  deleted_at: Date | null;
}

export type IStatusTransfer =
  | 'Solicitado'
  | 'En Proceso'
  | 'Terminado'
  | 'Terminado incompleto';

export interface IPendingShipmentDetailsProps {
  pendingShipment: IPendingTransfer;
}

interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  monedaId: string;
  deleted_at: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Precio {
  $numberDecimal: string;
}

interface InventarioSucursal {
  _id: string;
  productoId: Producto;
  sucursalId: string;
  stock: number;
  precio: Precio;
  ultimo_movimiento: string;
  deleted_at: string | null;
  created_at: string;
  update_at: string;
}

export interface ListItemDePedido {
  _id: string;
  inventarioSucursalId: InventarioSucursal;
  trasladoId: string;
  cantidad: number;
  archivosAdjuntos: string[] | null;
  comentarioRecepcion: string | null;
  comentarioEnvio: string | null;
  recibido?: boolean;
}

export interface IDetalleSelected {
  traslado?: IPendingTransfer;
  listItemDePedido: ListItemDePedido[];
}
