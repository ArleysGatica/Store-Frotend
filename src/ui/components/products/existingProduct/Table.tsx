import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle } from 'lucide-react';
import { IBranch, ITablaBranch } from '@/interfaces/branchInterfaces';
import { IRoles } from '@/app/slices/login';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProductFormExist } from './ProductForm';
import { useState } from 'react';
import { Branch } from '@/app/slices/branchSlice';
import { store } from '@/app/store';
import { updateProduct } from '@/app/slices/productsSlice';

interface IUserRole {
  _id: string;
  username: string;
  role: IRoles;
  sucursalId?: IBranch;
}

interface ProductsTableProps {
  products: ITablaBranch[];
  userRoles?: IUserRole | undefined;
  branches: Branch[];
  handleSelectChangeBranch: (value: string) => void;
  selectedBranch: {
    nombre: string;
    _id: string;
  } | null;
}

export const ProductsTable = ({
  products,
  userRoles,
  branches,
  selectedBranch,
  handleSelectChangeBranch,
}: ProductsTableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ITablaBranch | null>(
    null
  );

  const handleAddToBranch = (product: ITablaBranch) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleSubmit = (data: ITablaBranch) => {
    store.dispatch(updateProduct(data?.id!)).unwrap();
  };
  console.log(products, 'data');

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
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
              <TableCell>{product.stock}</TableCell>
              <TableCell>${product?.precio?.$numberDecimal}</TableCell>
              <TableCell>
                {userRoles?.role !== 'admin' && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddToBranch(product)}
                    >
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

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <ProductFormExist
              handleSelectChangeBranch={handleSelectChangeBranch}
              initialData={editingProduct}
              onSubmit={handleSubmit}
              branches={branches}
              selectedBranch={selectedBranch}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
