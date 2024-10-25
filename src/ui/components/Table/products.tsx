import { useEffect, useState } from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { toast } from '@/components/hooks/use-toast';
import { ITablaBranch } from '@/interfaces/branchInterfaces';
import { store } from '@/app/store';
import { createProduct } from '@/app/slices/products';
import SearchAndFilter from './sear';
import ProductsTable from './ProductTable';
import Pagination from '../../../shared/components/ui/Pagination/Pagination';
import { GetBranches } from '@/shared/helpers/Branchs';
import { useAppSelector } from '@/app/hooks';

export function Products() {
  const user = useAppSelector((state) => state.auth.signIn.user);
  const [products, setProducts] = useState<ITablaBranch[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string[]>([
    'active',
    'draft',
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchData = async () => {
    if (user?.sucursalId) {
      const response = await GetBranches(user.sucursalId._id);
      setProducts(response);
    } else {
      console.log('admin user debe obtener productos generales');
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
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
              sucursalId={user?.sucursalId?._id}
              handleSelectChange={function (
                e: React.ChangeEvent<HTMLSelectElement>
              ): void {
                throw new Error('Function not implemented.');
              }}
              selectedGroup={null}
              groups={[]}
            />
            {filteredProducts.length === 0 ? (
              <span className="flex justify-center w-full text-sm text-center text-muted-foreground">
                No hay productos en esta sucursal
              </span>
            ) : (
              <ProductsTable
                products={currentItems}
                handleSelectChange={function (
                  e: React.ChangeEvent<HTMLSelectElement>
                ): void {
                  throw new Error('Function not implemented.');
                }}
                selectedGroup={null}
                groups={[]}
              />
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
