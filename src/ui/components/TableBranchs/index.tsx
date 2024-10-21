import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useAppSelector } from '../../../app/hooks';
import { store } from '../../../app/store';
import { Typography } from '../../../shared/components/ui/Typography';
import { fetchTablaBranches } from '../../../app/slices/tablaBranchsSlice';

export const TableBranches = () => {
  const data = useAppSelector((state) => state.inventory.tablaBranches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    store.dispatch(fetchTablaBranches());
  }, []);
  const tableHeaders = [
    { key: 'name', label: 'Nombre' },
    { key: 'Product', label: 'Producto' },
    { key: 'Units', label: 'Unidades' },
    { key: 'Acciones', label: 'Acciones' },
  ];
  const handleOpenModal = (branch: any) => {
    setIsModalOpen(true);
  };

  console.log(data, 'data');

  return (
    <>
      <div className="w-full justify-items-center">
        <Typography component="h3" bold>
          Tabla de branches
        </Typography>
        <div className="container--table">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHead key={header.key}>{header.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((data) => (
                <TableRow key={data.sucursalId}>
                  <TableCell>{data.nombre}</TableCell>
                  <TableCell>{data.descripcion}</TableCell>
                  <TableCell>{data.stock}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenModal(data)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver detalles
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles de la Sucursal</DialogTitle>
          </DialogHeader>
          {/* {selectedBranch.id && (
            <DialogDescription>
              <div className="flex flex-col gap-2">
                <Typography component="p" bold>
                  Nombre de la sucursal
                </Typography>
                <Typography component="p">{selectedBranch.code}</Typography>
                <Typography component="p" bold>
                  Dirección
                </Typography>
                <Typography component="p">{selectedBranch.code}</Typography>
                <Typography component="p" bold>
                  Teléfono
                </Typography>
                <Typography component="p">{selectedBranch.phone}</Typography>
                <Typography component="p" bold>
                  Código
                </Typography>
                <Typography component="p">{selectedBranch.code}</Typography>
              </div>
            </DialogDescription>
          )} */}
        </DialogContent>
      </Dialog>
    </>
  );
};
