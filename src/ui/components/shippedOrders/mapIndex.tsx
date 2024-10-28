import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  getFormatedDate,
  getTimeElapsed,
} from '@/shared/helpers/transferHelper';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Eye } from 'lucide-react';
import {
  IDetalleSelected,
  IShippedOrder,
} from '@/interfaces/transferInterfaces';
import { useNavigate } from 'react-router-dom';
import { store } from '@/app/store';
import { setSelectItemDetail } from '@/app/slices/transferSlice';
import { ImageGridCard } from '../PendingTools';

interface IOrder {
  order: IShippedOrder;
  items: IDetalleSelected;
}
export const MapIndex = ({ order, items }: IOrder) => {
  const imageSources = [
    order.firmaEnvio ?? '',
    ...(order.archivosAdjuntos ?? []),
  ];

  const navigate = useNavigate();

  const handleSelectItem = (items: IDetalleSelected) => {
    console.log(items, 'items');
    store.dispatch(setSelectItemDetail(items));
  };

  return (
    <TableRow key={order._id} className="cursor-pointer">
      <TableCell
        className="cursor-pointer"
        onClick={() => navigate(`/transfer/recibido/${order._id}/itemdepedido`)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{order._id.slice(0, 8)}...</TooltipTrigger>
            <TooltipContent>{order._id}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>{order.nombre}</TableCell>
      <TableCell>{getFormatedDate(order.fechaEnvio)}</TableCell>
      <TableCell>{order.sucursalOrigenId.nombre}</TableCell>
      <TableCell>{order.sucursalDestinoId.nombre}</TableCell>
      <TableCell>
        <Badge
          variant={
            order.estatusTraslado === 'En Proceso'
              ? 'secondary'
              : order.estatusTraslado === 'Terminado'
                ? 'default'
                : 'outline'
          }
        >
          {order.estatusTraslado === 'En Proceso'
            ? 'Pendiente'
            : order.estatusTraslado === 'Terminado'
              ? 'Recibido'
              : order.estatusTraslado === 'Terminado incompleto'
                ? 'Incompleto'
                : 'Solicitado'}
        </Badge>
      </TableCell>
      <TableCell>{order.usuarioIdEnvia.username}</TableCell>
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
              <ImageGridCard
                images={imageSources ?? []}
                title={order.usuarioIdEnvia.username}
                subtitle={getTimeElapsed(new Date(order.fechaEnvio))}
                description={order.comentarioEnvio}
              />
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
};
