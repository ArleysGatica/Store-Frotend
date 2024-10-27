import { useAppSelector } from '@/app/hooks';
import {
  clearTransferData,
  getAllProductTransfer,
} from '@/app/slices/transferSlice';
import { store } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IShippedOrder } from '@/interfaces/transferInterfaces';

import { useEffect, useState } from 'react';

export const ShippedOrders = () => {
  const DataAlls = useAppSelector((state) => state.transfer.data);
  const branches = useAppSelector((state) => state.branches.data);
  const userRoles = useAppSelector((state) => state.auth.signIn.user);
  const dataFilterID = branches.filter(
    (branch) => branch._id === userRoles?.sucursalId?._id
  );
  const filteredBranche = userRoles?.role === 'root' ? branches : dataFilterID;
  const [selectedBranch, setSelectedBranch] = useState<{
    nombre: string;
    _id: string;
  } | null>(null);

  useEffect(() => {
    if (selectedBranch) {
      store.dispatch(clearTransferData());

      store.dispatch(getAllProductTransfer(selectedBranch._id)).unwrap();
    }
  }, [selectedBranch]);

  const handleSelectChangeBranch = (value: string) => {
    const branch = branches.find((b) => b._id === value);
    if (branch) {
      setSelectedBranch({ nombre: branch.nombre, _id: branch._id ?? '' });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label
          htmlFor="branch-select"
          className="block text-sm font-medium text-gray-700"
        >
          Sucursal:
        </label>
        <Select onValueChange={handleSelectChangeBranch}>
          <SelectTrigger>
            <SelectValue placeholder="--Selecciona--" />
          </SelectTrigger>
          <SelectContent>
            {filteredBranche.map((branch) => (
              <SelectItem key={branch._id} value={branch._id as string}>
                {branch.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
              <TableBody>
                {DataAlls.map((order: IShippedOrder, index: number) => (
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
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
