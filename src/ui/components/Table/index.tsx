import { useEffect, useState } from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import { toast } from '@/components/hooks/use-toast';
import { ITablaBranch } from '@/interfaces/branchInterfaces';
import { store } from '@/app/store';
import { createProduct } from '@/app/slices/products';
import SearchAndFilter from './sear';
import ProductsTable from './ProductTable';
import Pagination from '../../../shared/components/ui/Pagination/Pagination';
import { GetBranches } from '@/shared/helpers/Branchs';

export function DataTableDemo() {
  const { Id } = useParams<{ Id: string }>();
  const [products, setProducts] = useState<ITablaBranch[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string[]>([
    'active',
    'draft',
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const fetchData = async () => {
    if (!Id) return;
    const response = await GetBranches(Id);
    console.log(response, 'response');
    setProducts(response);
  };

  useEffect(() => {
    fetchData();
  }, [Id]);

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleAddProduct = (newProduct: ITablaBranch) => {
    const product: ITablaBranch = {
      ...newProduct,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    store.dispatch(createProduct(product));
    setProducts((prevProducts) => [...prevProducts, product]);
    toast({
      title: 'Product added',
      description: `${product.nombre} has been added to the product list.`,
    });
  };

  console.log(products);

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
            <SearchAndFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              onAddProduct={handleAddProduct}
              sucursalId={Id}
            />
            {filteredProducts.length === 0 ? (
              <span className="text-center text-sm text-muted-foreground justify-center w-full flex">
                No hay productos en esta sucursal
              </span>
            ) : (
              <ProductsTable products={currentItems} />
            )}
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
