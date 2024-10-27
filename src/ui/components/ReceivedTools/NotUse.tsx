import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CardReceived } from './CardReceived';
import { Info } from 'lucide-react';
import { TableReceived } from './tablaReceived';
import './styles.scss';

const statusColors = {
  Solicitado: 'text-orange-500',
  'En Progreso': 'text-blue-500',
  Terminado: 'text-green-500',
  Imcompleto: 'text-gray-500',
};

export type OrderReceived = {
  product: string;
  value: string;
  quantity: string;
  id: string;
  delivery: string;
  status: string;
};

export default function ReceivedTools() {
  const [orders, setOrders] = useState<OrderReceived[]>([
    {
      product: 'Horlicks',
      value: '$5370',
      quantity: '5 PrODUCTOS',
      id: '2427',
      delivery: '9/1/23',
      status: 'Solicitado',
    },
    {
      product: 'Coca-Cola',
      value: '$450',
      quantity: '3 Packets',
      id: '2428',
      delivery: '9/1/23',
      status: 'En Progreso',
    },
    {
      product: 'Pepsi',
      value: '$320',
      quantity: '2 Packets',
      id: '2429',
      delivery: '9/1/23',
      status: 'Imcompleto',
    },
    {
      product: 'Sprite',
      value: '$250',
      quantity: '4 Packets',
      id: '2430',
      delivery: '9/1/23',
      status: 'Terminado',
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 10;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const receiveOrder = (id: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: 'Received' } : order
      )
    );
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* <CardReceived orders={orders} /> */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <Button variant="outline">Filters</Button>
              <Button variant="outline">Order History</Button>
            </div>
            <div className="flex items-center space-x-2">
              <Input type="text" placeholder="Search..." className="max-w-sm" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date sended</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recibir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center space-x-2">
                    {order.id}
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-0">
                            <Info className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="dialogContent">
                          <DialogHeader>
                            <DialogTitle> Details</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <TableReceived />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                  <TableCell>{order.quantity}</TableCell>

                  <TableCell>{order.delivery}</TableCell>
                  <TableCell
                    className={
                      statusColors[order.status as keyof typeof statusColors]
                    }
                  >
                    {order.status}
                  </TableCell>

                  <TableCell>
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
                        <div className="py-4">
                          <p>
                            ¿Está seguro que desea marcar este pedido como
                            recibido?
                          </p>
                          <p>Producto: {order.product}</p>
                          <p>Valor: {order.value}</p>
                          <p>Cantidad: {order.quantity}</p>
                          <div className="flex w-full justify-between">
                            <Button onClick={() => receiveOrder(order.id)}>
                              Comentarios
                            </Button>
                            <br />
                            <Button onClick={() => receiveOrder(order.id)}>
                              Imagen
                            </Button>
                          </div>
                        </div>

                        <Button onClick={() => receiveOrder(order.id)}>
                          Confirmar Recepción
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
