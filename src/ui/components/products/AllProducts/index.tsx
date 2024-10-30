import { useEffect, useState } from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { store } from '@/app/store';
import Pagination from '../../../../shared/components/ui/Pagination/Pagination';
import { useAppSelector } from '@/app/hooks';
import ProductsTable from './Table';
import { clearProducts, fetchAllProducts } from '@/app/slices/productsSlice';
import { SearchAndFilter } from '@/shared/components/ui/Search';
import { ITablaBranch } from '@/interfaces/branchInterfaces';

export const Allproducts = () => {
  const dataAllProducts = useAppSelector((state) => state.products.products);
  console.log(dataAllProducts, 'dataAllProducts');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [localProducts, setLocalProducts] = useState<ITablaBranch[]>([]);

  //   useEffect(() => {
  //     dataAllProducts && store.dispatch(clearProducts());
  //     store.dispatch(fetchAllProducts());
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await store.dispatch(fetchAllProducts()).unwrap();
      setLocalProducts(result); // Guarda los productos en el estado local
    };

    fetchData();
  }, []);

  const filteredProducts = localProducts.filter(
    (product) =>
      product?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.nombreSucursal?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="flex flex-col w-full bg-muted/40">
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
            {currentItems.length === 0 ? (
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
};
