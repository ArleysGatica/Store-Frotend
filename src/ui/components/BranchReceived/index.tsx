import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { store } from '@/app/store';
import {
  clearTransferDataReceived,
  receiveTransfer,
} from '@/app/slices/transferSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { MapIndex } from './table';
import { Loader } from '@/shared/components/ui/Loader';

const orderStatusOptions = [
  { value: 'Todos', label: 'Ver Todos' },
  { value: 'En Proceso', label: 'Pendiente' },
  { value: 'Terminado', label: 'Recibido' },
  { value: 'Terminado incompleto', label: 'Incompleto' },
  { value: 'Solicitado', label: 'Solicitado' },
];

export const BranchReceived = () => {
  const DataAlls = useAppSelector((state) => state.transfer.dataBranchReceived);
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
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (filteredBranche.length === 1 && !selectedBranch) {
      const branch = filteredBranche[0];
      setSelectedBranch({ nombre: branch.nombre, _id: branch._id ?? '' });
    }
  }, [filteredBranche, selectedBranch]);

  useEffect(() => {
    if (selectedBranch) {
      setLoading(true);
      store.dispatch(clearTransferDataReceived());

      store
        .dispatch(receiveTransfer(selectedBranch._id))
        .unwrap()
        .finally(() => setLoading(false));
    }
  }, [selectedBranch]);

  const handleSelectChangeBranch = (value: string) => {
    const branch = branches.find((b) => b._id === value);
    if (branch) {
      setSelectedBranch({ nombre: branch.nombre, _id: branch._id ?? '' });
    }
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const filteredProducts = DataAlls?.filter((product) => {
    const matchesNombre = product?.nombre
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSucursalDestino = product?.sucursalDestinoId?.nombre
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSucursalOrigen = product?.sucursalOrigenId?.nombre
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'Todos' || product.estatusTraslado === selectedStatus;

    return (
      (matchesNombre || matchesSucursalDestino || matchesSucursalOrigen) &&
      matchesStatus
    );
  });

  return (
    <div className="container p-4 mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estados de Pedido</SelectLabel>
                    {orderStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button variant="outline">Order History</Button>
            </div>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Search..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {userRoles?.role === 'root' && (
                <div className="mb-4">
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
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          ) : selectedBranch ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Fecha de envío</TableCell>
                  <TableCell>Sucursal Envia</TableCell>
                  <TableCell>Sucursal Destino</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Enviado por</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts.map((order) => (
                    <MapIndex order={order} key={order._id} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No hay órdenes para mostrar.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="flex justify-center items-center h-40 text-red-600">
              Seleccione una sucursal
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
