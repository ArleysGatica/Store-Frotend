import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IProductSale } from './sale';
import { Button } from '@/components/ui/button';

export interface IProductSaleProps {
  products: IProductSale[];
  handleRemoveProductSale: (productId: string) => void;
}

export const ProductSale = ({
  products,
  handleRemoveProductSale,
}: IProductSaleProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Total</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((item) => (
          <TableRow key={item.productId + item.price}>
            <TableCell>{item.productName}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>${item.price.toFixed(2)}</TableCell>
            <TableCell>
              {item.discount ? (
                <span className="text-green-600">
                  ${item.discount.toFixed(2)} ({item.discountPercentage}
                  %)
                </span>
              ) : (
                '-'
              )}
            </TableCell>
            <TableCell>
              ${(item.price * item.quantity - (item.discount || 0)).toFixed(2)}
            </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveProductSale(item.productId)}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
