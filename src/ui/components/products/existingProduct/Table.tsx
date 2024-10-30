import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {  PlusCircle, Trash } from 'lucide-react';
import { IBranch, IProductShortage } from '@/interfaces/branchInterfaces';
import { IRoles } from '@/app/slices/login';

interface IUserRole {
  _id: string;
  username: string;
  role: IRoles;
  sucursalId?: IBranch;
}

interface ProductsTableProps {
  products: IProductShortage[];
  userRoles?: IUserRole | undefined;
}

const ProductsTable = ({
  products,
  userRoles,
}: ProductsTableProps) => {

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            {userRoles?.role !== 'admin' && (
              <TableHead>
                <span className="">Actions</span>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.nombre}</TableCell>
              <TableCell>{product.descripcion}</TableCell>
              <TableCell>
                {userRoles?.role !== 'admin' && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Agregar a sucursal
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductsTable;
