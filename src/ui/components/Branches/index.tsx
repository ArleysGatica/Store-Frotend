import { useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { BranchCard } from './BranchCard';
import { store } from '@/app/store';
import { fetchBranches } from '@/app/slices/branchSlice';
import { useAppSelector } from '@/app/hooks';

export default function BranchDashboard() {
  const branches = useAppSelector((state) => state.branches.branches);

  useEffect(() => {
    store.dispatch(fetchBranches());
  }, []);

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
          <Button className="w-full sm:w-auto">Desplegar filtros</Button>
        </div>
      </nav>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {branches.length > 0 &&
          branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
      </div>
    </div>
  );
}
