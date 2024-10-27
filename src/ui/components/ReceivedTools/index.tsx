import { useState } from 'react';
import { Eye, MoreVertical, ArrowDownToLine } from 'lucide-react';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ReceivedTools from './NotUse';
import { CardReceived } from './CardReceived';

export interface ToolShipmentData {
  id: string;
  status: 'Pendiente' | 'En tránsito' | 'Recibido';
  consecutive: string;
  warehouse: string;
  date: string;
  sentBy: string;
}

const toolShipments: ToolShipmentData[] = [
  {
    id: '1',
    status: 'Pendiente',
    consecutive: '1234567890',
    warehouse: 'Nombre de bodega',
    date: '10/10/23',
    sentBy: 'Pedro Castañeda',
  },
  {
    id: '2',
    status: 'Pendiente',
    consecutive: '1234567890',
    warehouse: 'Nombre de bodega',
    date: '10/10/23',
    sentBy: 'Pedro Cdweastañeda',
  },
];

export default function ReceivedTools2() {
  const [searchTerm] = useState('');

  const filteredShipments = toolShipments.filter(
    (shipment) =>
      shipment.consecutive.includes(searchTerm) ||
      shipment.warehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.sentBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = [
    { key: 'estado', label: 'Estado' },
    { key: 'consecutivo', label: 'Consecutivo' },
    { key: 'bodegaEnvia', label: 'Bodega que envía' },
    { key: 'fechaEnvio', label: 'Fecha de envío' },
    { key: 'enviadoPor', label: 'Enviado por' },
    { key: 'acciones', label: 'Acciones' },
  ];

  const ShipmentTable = ({ shipments }: { shipments: ToolShipmentData[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHead key={header.key}>{header.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {shipments.map((shipment) => (
          <TableRow key={shipment.id}>
            <TableCell>
              <Badge
                variant={
                  shipment.status === 'Pendiente'
                    ? 'secondary'
                    : shipment.status === 'En tránsito'
                      ? 'default'
                      : 'outline'
                }
              >
                {shipment.status}
              </Badge>
            </TableCell>
            <TableCell>{shipment.consecutive}</TableCell>
            <TableCell>{shipment.warehouse}</TableCell>
            <TableCell>{shipment.date}</TableCell>
            <TableCell>{shipment.sentBy}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Ver detalles
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                      <span className="sr-only">Opciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Opción 1</DropdownMenuItem>
                    <DropdownMenuItem>Opción 2</DropdownMenuItem>
                    <DropdownMenuItem>Opción 3</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Recibir
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Recibir Pedido</DialogTitle>
                    </DialogHeader>
                    <ReceivedTools />
                  </DialogContent>
                </Dialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container mx-auto ">
      <CardReceived orders={filteredShipments} />
      <Tabs defaultValue="receive">
        <ShipmentTable shipments={filteredShipments} />
      </Tabs>
    </div>
  );
}
