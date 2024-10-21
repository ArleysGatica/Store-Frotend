import { ChangeEvent, useEffect, useState } from 'react';
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
import {
  createBranchs,
  fetchBranches,
  updateBranchs,
} from '@/app/slices/branchSlice';
import { useAppSelector } from '@/app/hooks';
import { Label } from '@radix-ui/react-label';
import { Link } from 'react-router-dom';

export default function BranchDashboard() {
  const branches = useAppSelector((state) => state.branches.branches);

  console.log(branches, 'branches');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState(false);
  const [newBranch, setNewBranch] = useState({
    _id: '',
    nombre: '',
    direccion: '',
    ciudad: '',
    pais: '',
    telefono: '',
  });

  useEffect(() => {
    store.dispatch(fetchBranches());
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewBranch({
      ...newBranch,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveNew = () => {
    store.dispatch(createBranchs(newBranch));
    setIsDialogOpen(false);
  };
  const handleEdit = (id: string) => {
    store.dispatch(updateBranchs({ branch: newBranch, id }));
    setEditingSucursal(true);
    setIsDialogOpen(true);
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

          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            value={newBranch.nombre}
            onChange={handleInputChange}
            placeholder="Nombre de la sucursal"
          />
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            name="direccion"
            value={newBranch.direccion}
            onChange={handleInputChange}
            placeholder="Dirección de la sucursal"
          />
          <Label htmlFor="ciudad">Ciudad</Label>
          <Input
            id="ciudad"
            name="ciudad"
            value={newBranch.ciudad}
            onChange={handleInputChange}
            placeholder="Ciudad de la sucursal"
          />
          <Label htmlFor="pais">País</Label>
          <Input
            id="pais"
            name="pais"
            value={newBranch.pais}
            onChange={handleInputChange}
            placeholder="País de la sucursal"
          />
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            name="telefono"
            value={newBranch.telefono}
            onChange={handleInputChange}
            placeholder="Teléfono de la sucursal"
          />

          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (editingSucursal) {
                  handleEdit(newBranch._id);
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {branches.length > 0 &&
          branches.map((branch) => (
            <Link to={`/branches/${branch._id}/products`}>
              <BranchCard
                key={branch._id}
                branch={branch}
                onEdit={() => openDialog(true)}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
