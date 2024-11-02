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
import { Pencil, PlusCircle, Trash } from 'lucide-react';
import { IBranch, ITablaBranch } from '@/interfaces/branchInterfaces';
import ProductForm from './ProductForm';
import { IProductoGroups } from '@/api/services/groups';
import { IRoles } from '@/app/slices/login';
import { getFormatedDate } from '@/shared/helpers/transferHelper';
import { InventarioSucursal, InventarioSucursalWithPopulated } from '@/interfaces/transferInterfaces';
import { store } from '@/app/store';
import { createProduct, updateProduct } from '@/app/slices/productsSlice';
import { inventoryUpdateProduct } from '@/api/services/products';

interface ProductsTableProps {
  products: InventarioSucursalWithPopulated[];
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
  const [editingProduct, setEditingProduct] = useState<InventarioSucursal | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const data = {
    productos: products.map((product) => ({
      nombre: product.productoId.nombre,
      descripcion: product.productoId.descripcion,
      precio: product?.precio?.$numberDecimal ?? 0,
      stock: product.stock,
    })),
    sucursalId: userRoles?.sucursalId?._id ?? '',
  };

  console.log(data, 'data');

  const handleEditProduct = (updatedProduct: ITablaBranch) => {
    setIsEditing(false);
    setEditingProduct(null);

    store.dispatch(updateProduct(updatedProduct)).unwrap();
  };

  const handleAddToBranchOnly = (product: InventarioSucursal) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  console.log(
    products.map((product) => product.productoId._id),
    'product'
  );

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
            {userRoles?.role !== 'admin' && (
              <TableHead>
                <span className="">Actions</span>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.productoId._id}>
              <TableCell>{product.productoId._id}</TableCell>
              <TableCell className="font-medium">
                {product.productoId.nombre}
              </TableCell>
              <TableCell>${product.precio.$numberDecimal}</TableCell>
              <TableCell>{product.productoId.descripcion}</TableCell>
              <TableCell>{product?.stock || '0'}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleAddToBranchOnly(product as unknown as InventarioSucursal)
                  }
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Agregar a sucursal
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar producto a sucursal</DialogTitle>
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
