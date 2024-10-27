import { useAppSelector } from '@/app/hooks';
import {
  clearTransferData,
  getAllProductTransfer,
} from '@/app/slices/transferSlice';
import { store } from '@/app/store';
import { Badge } from '@/components/ui/badge';
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
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getFormatedDate } from '@/shared/helpers/transferHelper';
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
              <div className="flex  space-x-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="max-w-sm"
                />
                <div className="mb-4">
                  <label
                    htmlFor="branch-select"
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                  <Select onValueChange={handleSelectChangeBranch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione Sucursal" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredBranche.map((branch) => (
                        <SelectItem
                          key={branch._id}
                          value={branch._id as string}
                        >
                          {branch.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Fecha de Registro</TableCell>
                  <TableCell>Sucursal Origen</TableCell>
                  <TableCell>Sucursal Destino</TableCell>
                  <TableCell>Estatus Traslado</TableCell>
                  <TableCell>Usuario que Envia</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DataAlls.map((order) => (
                  <TableRow key={order._id}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {order._id.slice(0, 8)}...
                        </TooltipTrigger>
                        <TooltipContent>
                          <TableCell>{order._id}</TableCell>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TableCell>{order.nombre}</TableCell>
                    <TableCell>
                      {getFormatedDate(new Date(order.fechaRecepcion))}
                    </TableCell>
                    <TableCell>{`${order.sucursalOrigenId.nombre}, ${order.sucursalOrigenId.ciudad}`}</TableCell>
                    <TableCell>{`${order.sucursalDestinoId.nombre}, ${order.sucursalDestinoId.ciudad}`}</TableCell>
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
