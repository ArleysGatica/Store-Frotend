import { useEffect, useState } from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { ITablaBranch } from '@/interfaces/branchInterfaces';
import { store } from '@/app/store';
import Pagination from '../../../../shared/components/ui/Pagination/Pagination';
import { useAppSelector } from '@/app/hooks';
import {
  fetchBranches,
  searchForStockProductsAtBranch,
} from '@/app/slices/branchSlice';
import { ProductsTable } from './Table';
import { SearchComponent } from '@/shared/components/ui/Search';
import { GetBranches } from '@/shared/helpers/Branchs';

export function ExistingProductAdd() {
  const user = useAppSelector((state) => state.auth.signIn.user);
  const [products, setProducts] = useState<ITablaBranch[]>([]);
  const branches = useAppSelector((state) => state.branches.data);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedBranch, setSelectedBranch] = useState<{
    nombre: string;
    _id: string;
  } | null>(null);
  const [, setBranchs] = useState<ITablaBranch[]>([]);
  console.log(selectedBranch, 'selectedBranch');
  const fetchDataBranch = async () => {
    if (!selectedBranch) return;
    const response = await GetBranches(selectedBranch._id);
    setBranchs(response);
  };
  const handleSelectChangeBranch = (value: string) => {
    const branch = branches.find((b) => b._id === value);
    if (branch) {
      setSelectedBranch({ nombre: branch.nombre, _id: branch._id ?? '' });
    }
  };
  useEffect(() => {
    store.dispatch(fetchBranches()).unwrap();
    if (selectedBranch) {
      fetchDataBranch();
    }
  }, [selectedBranch]);

  const fetchData = async () => {
    if (user?.sucursalId) {
      const response = await store
        .dispatch(searchForStockProductsAtBranch(user.sucursalId._id))
        .unwrap();
      setProducts(response);
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
          </CardHeader>
          <CardContent>
            <SearchComponent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            {filteredProducts.length === 0 ? (
              <span className="flex justify-center w-full text-sm text-center text-muted-foreground">
                No hay productos en esta sucursal
              </span>
            ) : (
              <ProductsTable
                selectedBranch={selectedBranch}
                branches={branches}
                products={currentItems}
                handleSelectChangeBranch={handleSelectChangeBranch}
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
