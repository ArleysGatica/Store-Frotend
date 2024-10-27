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
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { MapIndex } from './mapIndex';
import { Link } from 'react-router-dom';

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
  console.log(filteredBranche.map((branch) => branch.nombre));

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
  useEffect(() => {
    if (filteredBranche.length === 1) {
      const branch = filteredBranche[0];
      setSelectedBranch({ nombre: branch.nombre, _id: branch._id ?? '' });
    }
  }, []);

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
                  <TableCell>Fecha de envío</TableCell>
                  <TableCell>Sucursal Envia</TableCell>
                  <TableCell>Sucursal Destino</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Enviado por</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DataAlls.map((order) => (
                  //   <Link
                  //     key={order._id}
                  //     to={`/transfer/recibido/${order._id}/itemdepedido`}
                  //   >
                  <MapIndex order={order} key={order._id} />
                  //   </Link>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
