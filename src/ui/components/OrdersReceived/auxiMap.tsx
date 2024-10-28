import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  IPendingTransfer,
  ListItemDePedido,
} from '@/interfaces/transferInterfaces';
import DetallesEnvio from '@/shared/components/ui/Details';
import { Eye } from 'lucide-react';

interface IOrder {
  dataTable: ListItemDePedido;
  dataAuxiliar: IPendingTransfer | undefined;
}

export const AuxiliarMap = ({ dataTable, dataAuxiliar }: IOrder) => {
  console.log(dataAuxiliar, dataTable, 'dataTable');

  const originBranch = dataAuxiliar?.sucursalOrigenId.nombre;
  const destinationBranch = dataAuxiliar?.sucursalDestinoId.nombre;
  return (
    <TableRow key={dataTable._id}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{dataTable._id.slice(0, 8)}...</TooltipTrigger>
          <TooltipContent>
            <TableCell>{dataTable._id}</TableCell>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TableCell>{dataTable.inventarioSucursalId.productoId.nombre}</TableCell>
      <TableCell>
        {dataTable.inventarioSucursalId.precio.$numberDecimal}
      </TableCell>
      <TableCell> {dataTable.cantidad}</TableCell>
      <TableCell> {dataTable.recibido ? 'Si' : 'No'}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <Dialog>
            <DialogTrigger>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Ver detalles
              </Button>
            </DialogTrigger>
            <DialogContent className="p-3">
              <DetallesEnvio
                pedidoId={dataAuxiliar?.nombre ?? ''}
                fechaCreacion={dataAuxiliar?.fechaRegistro ?? new Date()}
                origen={originBranch ?? ''}
                destino={destinationBranch ?? ''}
                fechaEnvio={dataAuxiliar?.fechaEnvio ?? new Date()}
                fechaRecepcion={dataAuxiliar?.fechaRecepcion ?? new Date()}
                productos={dataTable.archivosAdjuntos}
                comentarioEnvio={
                  dataAuxiliar?.comentarioEnvio ?? 'No comentario enviado'
                }
                firmaRecepcion={dataAuxiliar?.firmaEnvio ?? ''}
              />
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
};
