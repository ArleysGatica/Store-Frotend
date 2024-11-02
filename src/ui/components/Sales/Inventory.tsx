import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import './style.scss';
import { ITablaBranch } from '@/interfaces/branchInterfaces';

export interface InventoryProps {
  products: ITablaBranch[];
}

export const Inventory = ({ products }: InventoryProps) => {
  return (
    <Card className="inventory__card">
      <CardHeader>
        <CardTitle>Inventario</CardTitle>
        <CardDescription>Estado actual del inventario</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Producto</TableHead>
              <TableHead className="w-[20%] text-center">Precio</TableHead>
              <TableHead className="w-[20%] text-center">Stock</TableHead>
              <TableHead className="w-[20%] text-center">
                Punto Recompra
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="h-[50px]">
                <TableCell>{product.nombre}</TableCell>
                <TableCell className="text-center">
                  ${product.precio.$numberDecimal}
                </TableCell>
                <TableCell className="text-center">{product.stock}</TableCell>
                <TableCell className="text-center">
                  {product.puntoReCompra}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
