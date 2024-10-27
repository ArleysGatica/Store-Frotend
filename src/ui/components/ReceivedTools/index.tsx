import { useEffect, useState } from 'react';
import { Eye, ArrowDown, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  getFormatedDate,
  getTimeElapsed,
  incomingShipmentTableHeaders,
} from '@/shared/helpers/transferHelper';
import { store } from '@/app/store';
import { getPendingTransfers } from '@/app/slices/transferSlice';
import { useAppSelector } from '@/app/hooks';
import {
  IPendingShipmentDetailsProps,
  IPendingTransfer,
} from '@/interfaces/transferInterfaces';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function ReceivedTools2() {
  const user = useAppSelector((state) => state.auth.signIn.user);
  const pendingTransfer = useAppSelector((state) => state.transfer.pending);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShipments = pendingTransfer.filter(
    (shipment) =>
      (shipment.consecutivo &&
        shipment.consecutivo?.toString().includes(searchTerm)) ||
      shipment.sucursalDestinoId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      shipment.usuarioIdEnvia.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!user?.sucursalId) return;
    store.dispatch(getPendingTransfers(user.sucursalId._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto ">
      <Tabs defaultValue="receive">
        <Card className="product__list">
          <br />
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Consecutivo, bodega, enviado por..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <IncomingShipmentTable shipments={filteredShipments} />
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}

const IncomingShipmentTable = ({
  shipments,
}: {
  shipments: IPendingTransfer[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {incomingShipmentTableHeaders.map((header) => (
            <TableHead
              key={header.key}
              className={`${['acciones'].includes(header.key) ? 'flex items-center justify-center' : ''}`}
            >
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {shipments.map((shipment) => (
          <TableRow key={shipment._id}>
            <TableCell>
              <Badge
                variant={
                  shipment.estatusTraslado === 'En Proceso'
                    ? 'secondary'
                    : shipment.estatusTraslado === 'Terminado'
                      ? 'default'
                      : 'outline'
                }
              >
                {shipment.estatusTraslado === 'En Proceso'
                  ? 'Pendiente'
                  : shipment.estatusTraslado === 'Terminado'
                    ? 'Recibido'
                    : shipment.estatusTraslado === 'Terminado incompleto'
                      ? 'Incompleto'
                      : 'Solicitado'}
              </Badge>
            </TableCell>
            <TableCell>{shipment.consecutivo}</TableCell>
            <TableCell>{shipment.sucursalDestinoId}</TableCell>
            <TableCell>{getFormatedDate(shipment.fechaEnvio)}</TableCell>
            <TableCell>{shipment.usuarioIdEnvia}</TableCell>
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
                    <PendingShipmentDetails pendingShipment={shipment} />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  Recibir
                  <ArrowDown />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const PendingShipmentDetails = ({
  pendingShipment,
}: IPendingShipmentDetailsProps) => {
  const imageCount = pendingShipment.archivosAdjuntos?.length ?? 0;
  const archivosAdjuntos = pendingShipment.archivosAdjuntos ?? [];
  const firma = pendingShipment.firmaEnvio ?? '';
  const images = [firma, ...archivosAdjuntos];

  const getGridClass = () => {
    switch (imageCount) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-2';
      case 4:
        return 'grid-cols-2';
      default:
        return 'grid-cols-3';
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader className="flex flex-row items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 bg-green-700 rounded-full cursor-pointer">
          <span className="text-lg font-semibold text-white">
            {pendingShipment.usuarioIdEnvia.charAt(0) ?? 'A'}
          </span>
        </div>
        <div>
          <h3 className="font-semibold">{pendingShipment.usuarioIdEnvia}</h3>
          <p className="text-sm text-muted-foreground">
            {getTimeElapsed(pendingShipment.fechaEnvio)}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{pendingShipment.comentarioEnvio}</p>
        {imageCount > 0 && (
          <div className={`grid ${getGridClass()} gap-1`}>
            {images.slice(0, 6).map((src, index) => (
              <div
                key={index}
                className={`
                ${imageCount === 3 && index === 2 ? 'col-span-2' : ''}
                ${imageCount >= 5 && index >= 3 ? 'col-span-1' : ''}
                ${imageCount === 1 ? 'col-span-1' : ''}
                relative aspect-square overflow-hidden rounded-lg
                ${index === 0 ? 'border border-gray-300' : ''}
              `}
              >
                <img
                  src={src}
                  alt={index === 0 ? 'Firma' : `Imagen adjunta ${index}`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
