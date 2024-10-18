import { useEffect, useState } from 'react';
import { MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { BranchCard } from './BranchCard';
import { store } from '@/app/store';
import { fetchBranches } from '@/app/slices/branchSlice';
import { useAppSelector } from '@/app/hooks';
import { Label } from '@radix-ui/react-label';

export default function BranchDashboard() {
  const branches = useAppSelector((state) => state.branches.branches);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState(false);

  useEffect(() => {
    store.dispatch(fetchBranches());
  }, []);

  const handleSaveNew = () => {
    setIsDialogOpen(false);
  };

  const handleSaveEdit = () => {
    setIsDialogOpen(false);
  };

  const openDialog = (isEdit: boolean) => {
    setEditingSucursal(isEdit);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto ">
      <nav className="flex flex-col mb-6 space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <MapPin className="w-5 h-5" />
          <Input placeholder="Nombre de la bodega" className="w-full sm:w-64" />
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          <Button variant="outline" className="flex-grow sm:flex-grow-0">
            Alquileres
          </Button>
          <Button variant="outline" className="flex-grow sm:flex-grow-0">
            Herramientas
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Ver materiales disponibles
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden sm:inline-flex">
                Más opciones
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Opción 1</DropdownMenuItem>
              <DropdownMenuItem>Opción 2</DropdownMenuItem>
              <DropdownMenuItem>Opción 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => openDialog(false)}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Sucursal
          </Button>
        </div>
      </nav>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingSucursal(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSucursal ? 'Editar Sucursal' : 'Agregar Nueva Sucursal'}
            </DialogTitle>
            <DialogDescription>
              {editingSucursal
                ? 'Modifica los detalles de la sucursal aquí.'
                : 'Ingresa los detalles de la nueva sucursal.'}
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="name" className="text-center">
            Nombre
          </Label>
          {editingSucursal && (
            <div className="grid gap-4 py-4">
              {/* Inputs para editar la sucursal */}
              <div className="grid grid-cols-4 items-center gap-4">
                {/* <Input
                  id="name"
                  value={editingSucursal.name}
                  onChange={(e) =>
                    setEditingSucursal({
                      ...editingSucursal,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                /> */}
              </div>
              {/* Placeholder para contenido de edición */}
            </div>
          )}
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (editingSucursal) {
                  handleSaveEdit();
                } else {
                  handleSaveNew();
                }
              }}
            >
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mostrar las sucursales */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {branches.length > 0 &&
          branches.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              onEdit={() => openDialog(true)}
            />
          ))}
      </div>
    </div>
  );
}
