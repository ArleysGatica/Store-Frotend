import { useEffect, useState } from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { IProductShortage } from '@/interfaces/branchInterfaces';
import { store } from '@/app/store';
import Pagination from '../../../../shared/components/ui/Pagination/Pagination';
import { useAppSelector } from '@/app/hooks';
import { searchForStockProductsAtBranch } from '@/app/slices/branchSlice';
import ProductsTable from './Table';
import { SearchAndFilter } from '@/shared/components/ui/Search';

export function ExistingProductAdd() {
  const user = useAppSelector((state) => state.auth.signIn.user);
  const [products, setProducts] = useState<IProductShortage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchData = async () => {
    if (user?.sucursalId) {
      const response = await store
        .dispatch(searchForStockProductsAtBranch(user.sucursalId._id))
        .unwrap();
      setProducts(response);
    } else {
      console.log('admin user debe obtener productos generales');
    }
  };

  useEffect(() => {
    fetchData();
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
            />
            {filteredProducts.length === 0 ? (
              <span className="flex justify-center w-full text-sm text-center text-muted-foreground">
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
