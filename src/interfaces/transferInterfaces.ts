import React from 'react';
import { IStatus, ITablaBranch } from './branchInterfaces';

export interface ITransferSlice {
  sent: ITransfer[];
  received: ITransfer[];
  pending: IPendingTransfer[];
  status: IStatus;
  error: string | null;
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
  sucursalOrigenId: string;
  sucursalDestinoId: string;
  usuarioIdEnvia: string;
  usuarioIdRecibe: string | null;
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
