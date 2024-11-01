import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash } from 'lucide-react';
import { IBranch, ITablaBranch } from '@/interfaces/branchInterfaces';
import ProductForm from './ProductForm';
import { IProductoGroups } from '@/api/services/groups';
import { IRoles } from '@/app/slices/login';
import { store } from '@/app/store';
import { removeProduct } from '@/app/slices/transferSlice';

interface ProductsTableProps {
  products: ITablaBranch[];
  handleSelectChange: (value: string) => void;
  selectedGroup: {
    nombre: string;
    _id: string;
  } | null;
  groups: IProductoGroups[];
  userRoles:
    | {
        _id: string;
        username: string;
        role: IRoles;
        sucursalId?: IBranch;
      }
    | undefined;
}

const ProductsTable = ({
  products,
  handleSelectChange,
  selectedGroup,
  groups,
  userRoles,
}: ProductsTableProps) => {
  const [editingProduct, setEditingProduct] = useState<ITablaBranch | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProduct = (updatedProduct: ITablaBranch) => {
    console.log('Product updated:', updatedProduct);
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleOnDelete = (id: string) => {
    store.dispatch(removeProduct(id));
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Punto de compra</TableHead>
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
              <TableCell>{product.id}</TableCell>
              <TableCell className="font-medium">{product.nombre}</TableCell>
              <TableCell>${product.precio.$numberDecimal}</TableCell>
              <TableCell>{product.descripcion}</TableCell>
              <TableCell>{product?.stock || '0'}</TableCell>
              <TableCell>{product?.puntoReCompra || '0'}</TableCell>
              <TableCell>
                {userRoles?.role !== 'admin' && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingProduct(product);
                        setIsEditing(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOnDelete(product?.id!)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
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
            <DialogDescription>
              Make changes to the product details below.
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleEditProduct}
              sucursalId={editingProduct.sucursalId}
              handleSelectChange={handleSelectChange}
              selectedGroup={selectedGroup}
              groups={groups}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductsTable;
