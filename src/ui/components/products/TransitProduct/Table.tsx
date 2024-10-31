import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IBranch } from '@/interfaces/branchInterfaces';
import { IRoles } from '@/app/slices/login';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InventarioSucursal } from '@/interfaces/transferInterfaces';

interface IUserRole {
  _id: string;
  username: string;
  role: IRoles;
  sucursalId?: IBranch;
}

interface ProductsTableProps {
  products: InventarioSucursal[];
  userRoles?: IUserRole | undefined;
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  console.log(products, 'dataI');
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-fit">Description</TableHead>
            <TableHead>Ultimo Movimiento</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">
                {product?.productoId?.nombre}
              </TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-64 overflow-hidden whitespace-nowrap text-ellipsis">
                    {product.productoId?.descripcion}
                  </TooltipTrigger>
                  <TooltipContent>
                    {product.productoId?.descripcion}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TableCell>{product.ultimo_movimiento}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{`$${product.precio.$numberDecimal}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductsTable;
