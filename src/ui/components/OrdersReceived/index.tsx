import { OrdersReceivedById } from '@/app/slices/transferSlice';
import { store } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IDetalleSelected } from '@/interfaces/transferInterfaces';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuxiliarMap } from './auxiMap';

export const OrdersReceived = () => {
  const [items, setItems] = useState<IDetalleSelected>({
    listItemDePedido: [],
    traslado: {
      _id: '',
      nombre: '',
      fechaRegistro: new Date(),
      fechaEnvio: new Date(),
      fechaRecepcion: new Date(),
      sucursalOrigenId: {
        _id: '',
        nombre: '',
        direccion: '',
        ciudad: '',
        pais: '',
        telefono: '',
        deleted_at: null,
        createdAt: '',
        updatedAt: '',
      },
      sucursalDestinoId: {
        _id: '',
        nombre: '',
        direccion: '',
        ciudad: '',
        pais: '',
        telefono: '',
        deleted_at: null,
        createdAt: '',
        updatedAt: '',
      },
      usuarioIdEnvia: '',
      usuarioIdRecibe: null,
      estado: '',
      comentarioEnvio: '',
      comentarioRecepcion: null,
      archivosAdjuntos: null,
      firmaEnvio: '',
      firmaRecepcion: '',
      deleted_at: null,
    },
  });
  const dataGeneral = items.listItemDePedido;
  const dataAuxiliar = items.traslado;

  const { Id } = useParams<{ Id: string }>();
  const fetchData = async () => {
    if (!Id) return;
    const response = await store.dispatch(OrdersReceivedById(Id));
    setItems(response.payload as IDetalleSelected);
  };

  useEffect(() => {
    fetchData();
  }, [Id]);

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
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Recibido</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataGeneral.map((order) => (
                  <AuxiliarMap
                    dataTable={order}
                    dataAuxiliar={dataAuxiliar}
                    key={order._id}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
