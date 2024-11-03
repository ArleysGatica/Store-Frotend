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
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const SaleHistory = () => {
  return (
    <Card className="mt-4 h-[40rem]">
      <CardHeader>
        <CardTitle>Sales History</CardTitle>
        <CardDescription>Recent sales transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sale ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer Type</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {salesHistory
              .slice()
              .reverse()
              .map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>{new Date(sale.date).toLocaleString()}</TableCell>
                  <TableCell>
                    {sale.isSupplier ? 'Supplier' : 'Regular'}
                  </TableCell>
                  <TableCell>${sale.subtotal.toFixed(2)}</TableCell>
                  <TableCell>${sale.totalDiscount.toFixed(2)}</TableCell>
                  <TableCell>${sale.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedSale(sale)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>
                            Sale Details - Sale #{sale.id}
                          </DialogTitle>
                          <DialogDescription>
                            Date: {new Date(sale.date).toLocaleString()}
                            <br />
                            Customer Type:{' '}
                            {sale.isSupplier ? 'Supplier' : 'Regular'}
                          </DialogDescription>
                        </DialogHeader>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Discount</TableHead>
                              <TableHead>Total</TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {sale.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${item.price.toFixed(2)}</TableCell>
                                <TableCell>
                                  {item.discount ? (
                                    <span className="text-green-600">
                                      ${item.discount.toFixed(2)} (
                                      {item.discountPercentage}%)
                                    </span>
                                  ) : (
                                    '-'
                                  )}
                                </TableCell>
                                <TableCell>
                                  $
                                  {(
                                    item.price * item.quantity -
                                    (item.discount || 0)
                                  ).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <div className="mt-4 text-right">
                          <p>Subtotal: ${sale.subtotal.toFixed(2)}</p>
                          <p className="text-green-600">
                            Total Discount: ${sale.totalDiscount.toFixed(2)}
                          </p>
                          <p className="font-bold">
                            Total: ${sale.total.toFixed(2)}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))} */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
