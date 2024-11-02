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
import { IProductoGroups, ITablaBranch } from '@/interfaces/branchInterfaces';
import { store } from '@/app/store';
import SearchAndFilter from './sear';
import ProductsTable from './ProductTable';
import Pagination from '../../../shared/components/ui/Pagination/Pagination';
import { GetBranches } from '@/shared/helpers/Branchs';
import { useAppSelector } from '@/app/hooks';
import { getAllGroupsSlice } from '@/app/slices/groups';
import { createProduct } from '@/app/slices/branchSlice';

export function Products() {
  const user = useAppSelector((state) => state.auth.signIn.user);
  const [products, setProducts] = useState<ITablaBranch[]>([]);
  const userRoles = useAppSelector((state) => state.auth.signIn.user);
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
    };
    store.dispatch(createProduct(product));
    setProducts((prevProducts) => [...prevProducts, product]);
    toast({
      title: 'Product added',
      description: `${product.nombre} has been added to the product list.`,
    });
  };

  const GroupsAll = useAppSelector((state) => state.categories.groups);
  const [selectedGroup, setSelectedGroup] = useState<{
    nombre: string;
    _id: string;
  } | null>(null);

  const [, setGroups] = useState<IProductoGroups[]>([]);

  const handleSelectChange = (value: string) => {
    const selectedBranchId = value;
    const branch = GroupsAll.find((b) => b._id === selectedBranchId);

    if (branch) {
      setSelectedGroup({ nombre: branch.nombre, _id: branch._id ?? '' });
    }
  };

  const fetchDataGroup = async () => {
    if (!selectedGroup) return;

    const response = await GetBranches(selectedGroup._id);
    setGroups(response);
  };

  useEffect(() => {
    store.dispatch(getAllGroupsSlice()).unwrap();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchDataGroup();
    }
  }, [selectedGroup]);

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
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              onAddProduct={handleAddProduct}
              sucursalId={user?.sucursalId?._id}
              handleSelectChange={handleSelectChange}
              selectedGroup={selectedGroup}
              groups={GroupsAll}
            />
            {filteredProducts.length === 0 ? (
              <span className="flex justify-center w-full text-sm text-center text-muted-foreground">
                No hay productos en esta sucursal
              </span>
            ) : (
              <ProductsTable
                products={currentItems}
                selectedGroup={selectedGroup}
                groups={GroupsAll}
                userRoles={userRoles}
                handleSelectChange={handleSelectChange}
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
