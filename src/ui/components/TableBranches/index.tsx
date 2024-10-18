'use client';

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
import { fetchTablaBranches } from '../../../app/slices/tablaBranchSlice';
import { Typography } from '../../../shared/components/ui/Typography';

const dataDescription = [
  {
    id: '1',
    name: 'Nombre de la sucursal',
    description: 'Nombre de la sucursal',
    phone: '123456789',
    code: '123456789',
  },
];

export const TableBranches = () => {
  const data = useAppSelector((state) => state.tablaBranches.tablaBranches);
  const [selectedBranch, setSelectedBranch] = useState(dataDescription[0]);
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
    setSelectedBranch(branch);
    setIsModalOpen(true);
  };

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
              {data.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.product}</TableCell>
                  <TableCell>{branch.units}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenModal(branch)}
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
          {selectedBranch.id && (
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
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
