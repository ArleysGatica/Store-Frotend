import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import { ICategoriesProps } from '@/interfaces/branchInterfaces';
// import { store } from '@/app/store';
// import { Branch, deleteBranch } from '@/app/slices/branchSlice';

export const CategoriesCard = ({
  categoriesData,
  onEdit,
}: ICategoriesProps) => {
  //   console.log(categoriesData?._id, 'branch');
  const handleOnDelete = () => {
    // store.dispatch(deleteBranch(branch as Branch));
  };

  return (
    <Card key={categoriesData._id} className="flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
            {categoriesData.nombre[0]}
          </div>
          <div>
            <h3 className="font-semibold">{categoriesData.nombre}</h3>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => onEdit(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleOnDelete()}>
              <Trash className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">
          {/* {branch.pendingOrders > 0 && (
            <p>
              Pedidos pendientes de recibir{' '}
              <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                {branch.pendingOrders}
              </span>
            </p>
          )} */}
        </div>
        <div className="mt-2">
          <h4 className="text-sm font-semibold">Datos</h4>
          <p className="text-sm text-muted-foreground">
            {categoriesData.descripcion}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-2">
        {/* {branch.hasAccess ? (
          <>
            <Button variant="outline" size="sm" className="flex-grow">
              <Warehouse className="w-4 h-4 mr-2" />
              Alquileres
            </Button>
            <Button variant="outline" size="sm" className="flex-grow">
              Herramientas
            </Button>
            <Button variant="outline" size="sm" className="flex-grow">
              <Package className="w-4 h-4 mr-2" />
              Materiales
            </Button>
          </>
        ) : (
          <Button className="w-full" variant="default">
            Solicitar acceso
          </Button>
        )} */}
      </CardFooter>
    </Card>
  );
};
