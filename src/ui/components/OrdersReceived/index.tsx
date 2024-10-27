import { useAppSelector } from '@/app/hooks';
import { receiveTransfer } from '@/app/slices/transferSlice';
import { store } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { IShippedOrder } from '@/interfaces/transferInterfaces';
import { Table } from 'lucide-react';
import { useEffect } from 'react';

export const OrdersReceived = () => {
  const user = useAppSelector((state) => state.auth.signIn.user);
  const receivedTransfer = useAppSelector((state) => state.transfer.received);

  useEffect(() => {
    if (!user?.sucursalId) return;
    store.dispatch(receiveTransfer(user.sucursalId._id));
  }, []);
  console.log(receivedTransfer, 'receivedTransfer');

  return (
    <>
      <div className="container mx-auto p-4 space-y-6">
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
                <Input
                  type="text"
                  placeholder="Search..."
                  className="max-w-sm"
                />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Enviado por</TableHead>
                  <TableHead>Recibido por</TableHead>
                  <TableHead>Fecha de registro</TableHead>
                  <TableHead>Fecha de envío</TableHead>
                  <TableHead>Fecha de recepción</TableHead>
                  <TableHead>Estado del traslado</TableHead>
                </TableRow>
              </TableHeader>
              {/* <TableBody>
                {receivedTransfer.map((order, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.nombre}</TableCell>
                    <TableCell>{order.sucursalOrigenId}</TableCell>
                    <TableCell>{order.sucursalDestinoId}</TableCell>
                    <TableCell>{order.usuarioIdEnvia}</TableCell>
                    <TableCell>{order.usuarioIdRecibe}</TableCell>
                    <TableCell>{order.fechaRegistro}</TableCell>
                    <TableCell>{order.fechaEnvio}</TableCell>
                    <TableCell>{order.fechaRecepcion}</TableCell>
                    <TableCell>{order.estatusTraslado}</TableCell>
                    <TableCell>
                      {order.estado ? 'Activo' : 'Inactivo'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
