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
import { Eye, PenTool } from 'lucide-react';

interface IOrder {
  dataTable: ListItemDePedido;
  dataAuxiliar: IPendingTransfer | undefined;
}

export const AuxiliarMap = ({ dataTable, dataAuxiliar }: IOrder) => {
  const originBranch = dataAuxiliar?.sucursalOrigenId.nombre;
  const destinationBranch = dataAuxiliar?.sucursalDestinoId.nombre;

  return (
    <TableRow key={dataTable._id}>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{dataTable._id.slice(0, 8)}...</TooltipTrigger>
            <TooltipContent>
              <TableCell>{dataTable._id}</TableCell>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>

      <TableCell>{dataTable.inventarioSucursalId.productoId.nombre}</TableCell>
      <TableCell>
        {dataTable.inventarioSucursalId.precio.$numberDecimal}
      </TableCell>
      <TableCell> {dataTable.cantidad}</TableCell>
      <TableCell> {dataTable.recibido ? 'Si' : 'No'}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger>
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              Ver detalles
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DetallesEnvio
              pedidoId={dataAuxiliar?.nombre ?? ''}
              fechaCreacion={dataAuxiliar?.fechaRegistro ?? new Date()}
              origen={originBranch ?? ''}
              destino={destinationBranch ?? ''}
              fechaEnvio={dataAuxiliar?.fechaEnvio ?? new Date()}
              fechaRecepcion={dataAuxiliar?.fechaRecepcion ?? new Date()}
              productos={dataTable.archivosAdjuntos ?? []}
              firmaRecepcion={dataAuxiliar?.firmaEnvio ?? ''}
              comentarioEnvio={dataAuxiliar?.comentarioEnvio ?? ''}
            />
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="sm">
            <PenTool className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
