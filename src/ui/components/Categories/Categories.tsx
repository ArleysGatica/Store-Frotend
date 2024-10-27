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
import { deleteGroupSlice } from '@/app/slices/groups';
import { store } from '@/app/store';
import { toast, Toaster } from 'sonner';
export const CategoriesCard = ({
  categoriesData,
  onEdit,
}: ICategoriesProps) => {
  const handleOnDelete = () => {
    store.dispatch(deleteGroupSlice(categoriesData._id as string));
    toast.success('Categoria eliminada exitosamente');
  };

  // /api/inventory/groups/:id/products
  return (
    <>
      <Toaster richColors position="bottom-right" />
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
          <div className="text-sm font-medium"></div>
          <div className="mt-2">
            <h4 className="text-sm font-semibold">Datos</h4>
            <p className="text-sm text-muted-foreground">
              {categoriesData.descripcion}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-between gap-2"></CardFooter>
      </Card>
    </>
  );
};
