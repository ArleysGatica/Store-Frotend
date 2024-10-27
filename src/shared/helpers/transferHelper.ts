import { ITransferDetails } from '@/interfaces/transferInterfaces';
import { toast } from 'sonner';

export const isValidTransfer = (
  toolTransfer: ITransferDetails,
  shipmentToolsLength: number
) => {
  if (!toolTransfer.sucursalOrigenId) {
    toast.warning('Seleccione una origen de envío');
    return false;
  }

  if (!toolTransfer.sucursalDestinoId) {
    toast.warning('Seleccione un destino de envío');
    return false;
  }

  if (shipmentToolsLength === 0) {
    toast.warning('No hay herramientas para enviar');
    return false;
  }

  if (!toolTransfer.firmaEnvio) {
    toast.warning('Escriba una firma para realizar la transferencia');
    return false;
  }

  return true;
};
