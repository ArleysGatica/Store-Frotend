import { useState } from 'react';
import {
  ListFilter,
  PlusCircle,
  Search,
  Trash,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/hooks/use-toast';
type Product = {
  id: number;
  name: string;
  status: 'draft' | 'active';
  price: number;
  totalSales: number;
  createdAt: string;
  stockQuantity: number;
};

export function DataTableDemo() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Laser Lemonade Machine',
      status: 'draft',
      price: 499.99,
      totalSales: 25,
      createdAt: '2023-07-12 10:42 AM',
      stockQuantity: 10,
    },
    {
      id: 2,
      name: 'Hypernova Headphones',
      status: 'active',
      price: 129.99,
      totalSales: 100,
      createdAt: '2023-10-18 03:21 PM',
      stockQuantity: 3,
    },
    {
      id: 3,
      name: 'AeroGlow Desk Lamp',
      status: 'active',
      price: 39.99,
      totalSales: 50,
      createdAt: '2023-11-29 08:15 AM',
      stockQuantity: 20,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string[]>([
    'active',
    'draft',
  ]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      filterStatus.includes(product.status)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleAddProduct = (
    newProduct: Omit<Product, 'id' | 'totalSales' | 'createdAt'>
  ) => {
    const product: Product = {
      ...newProduct,
      id: products.length + 1,
      totalSales: 0,
      createdAt: new Date().toLocaleString(),
    };
    setProducts([...products, product]);
    toast({
      title: 'Product added',
      description: `${product.name} has been added to the product list.`,
    });
  };

  const handleEditProduct = (editedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === editedProduct.id ? editedProduct : p))
    );
    setEditingProduct(null);
    toast({
      title: 'Product updated',
      description: `${editedProduct.name} has been updated.`,
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    toast({
      title: 'Product deleted',
      description: 'The product has been removed from the list.',
      variant: 'destructive',
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8 w-[200px] lg:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={filterStatus.includes('active')}
                      onCheckedChange={(checked) =>
                        setFilterStatus(
                          checked
                            ? [...filterStatus, 'active']
                            : filterStatus.filter((s) => s !== 'active')
                        )
                      }
                    >
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filterStatus.includes('draft')}
                      onCheckedChange={(checked) =>
                        setFilterStatus(
                          checked
                            ? [...filterStatus, 'draft']
                            : filterStatus.filter((s) => s !== 'draft')
                        )
                      }
                    >
                      Draft
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add Product</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new product below.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      handleAddProduct({
                        name: formData.get('name') as string,
                        status: formData.get('status') as 'draft' | 'active',
                        price: parseFloat(formData.get('price') as string),
                        stockQuantity: parseInt(
                          formData.get('stockQuantity') as string,
                          10
                        ),
                      });
                      e.currentTarget.reset();
                    }}
                  >
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                          Status
                        </Label>
                        <select
                          id="status"
                          name="status"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="draft">Draft</option>
                          <option value="active">Active</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Price
                        </Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stockQuantity" className="text-right">
                          Stock Quantity
                        </Label>
                        <Input
                          id="stockQuantity"
                          name="stockQuantity"
                          type="number"
                          min="0"
                          className="col-span-3"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Product</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead>In Stock</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === 'active' ? 'default' : 'secondary'
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {
                        <span className="font-semibold flex items-center justify-center">
                          {product.totalSales}
                        </span>
                      }
                    </TableCell>
                    <TableCell>{product.createdAt}</TableCell>
                    <TableCell>
                      <span
                        className={
                          product.stockQuantity < 5
                            ? 'text-red-500 font-semibold flex items-center justify-center'
                            : 'text-green-500 font-semibold flex items-center justify-center'
                        }
                      >
                        {product.stockQuantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingProduct(product)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>
                                Make changes to the product details below.
                              </DialogDescription>
                            </DialogHeader>
                            {editingProduct && (
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  const formData = new FormData(
                                    e.currentTarget
                                  );
                                  handleEditProduct({
                                    ...editingProduct,
                                    name: formData.get('name') as string,
                                    status: formData.get('status') as
                                      | 'draft'
                                      | 'active',
                                    price: parseFloat(
                                      formData.get('price') as string
                                    ),
                                    stockQuantity: parseInt(
                                      formData.get('stockQuantity') as string,
                                      10
                                    ),
                                  });
                                }}
                              >
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="edit-name"
                                      className="text-right"
                                    >
                                      Name
                                    </Label>
                                    <Input
                                      id="edit-name"
                                      name="name"
                                      defaultValue={editingProduct.name}
                                      className="col-span-3"
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="edit-status"
                                      className="text-right"
                                    >
                                      Status
                                    </Label>
                                    <select
                                      id="edit-status"
                                      name="status"
                                      defaultValue={editingProduct.status}
                                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                      required
                                    >
                                      <option value="draft">Draft</option>
                                      <option value="active">Active</option>
                                    </select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="edit-price"
                                      className="text-right"
                                    >
                                      Price
                                    </Label>
                                    <Input
                                      id="edit-price"
                                      name="price"
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      defaultValue={editingProduct.price}
                                      className="col-span-3"
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="edit-stockQuantity"
                                      className="text-right"
                                    >
                                      Stock Quantity
                                    </Label>
                                    <Input
                                      id="edit-stockQuantity"
                                      name="stockQuantity"
                                      type="number"
                                      min="0"
                                      defaultValue={
                                        editingProduct.stockQuantity
                                      }
                                      className="col-span-3"
                                      required
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                              </form>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1} to{' '}
              {Math.min(indexOfLastItem, filteredProducts.length)} of{' '}
              {filteredProducts.length} products
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
