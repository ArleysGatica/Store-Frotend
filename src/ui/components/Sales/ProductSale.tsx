import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IProductSale } from './Sale';
import { Button } from '@/components/ui/button';
import { BadgeInfo, CircleDollarSign, Trash2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface IProductSaleProps {
  procesingSale: boolean;
  products: IProductSale[];
  handleRemoveProductSale: (productId: string) => void;
}

export const ProductSale = ({
  procesingSale,
  products,
  handleRemoveProductSale,
}: IProductSaleProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Discount</TableHead>
          <TableHead className="text-center">Total</TableHead>
          <TableHead className="text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((item) => (
          <TableRow key={item.productId + item.price}>
            <TableCell>{item.productName}</TableCell>
            <TableCell className="text-center">{item.quantity}</TableCell>
            <TableCell className="text-center">
              ${item.price.toFixed(2)}
            </TableCell>
            <TableCell className="text-center">
              {item.discount && item.discount?.amount > 0 ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-green-600">
                    ${item.discount.amount.toFixed(2)} (
                    {item.discount.percentage}
                    %)
                  </span>
                  <Popover>
                    <PopoverTrigger className="p-0">
                      <BadgeInfo size={18} />
                    </PopoverTrigger>
                    <PopoverContent className="flex items-center w-auto gap-1 font-sans text-sm">
                      <CircleDollarSign color="green" size={18} />
                      <span>{item.discount.name.toUpperCase()}</span>
                      <span className="font-bold text-green-600">
                        {item.discount.percentage}%
                      </span>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                '-'
              )}
            </TableCell>
            <TableCell className="text-center">
              $
              {(
                item.price * item.quantity -
                (item.discount?.amount || 0)
              ).toFixed(2)}
            </TableCell>
            <TableCell className="text-center">
              <Button
                disabled={procesingSale}
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveProductSale(item.productId)}
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
