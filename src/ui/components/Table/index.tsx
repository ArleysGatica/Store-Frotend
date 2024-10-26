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
import { useAppSelector } from '@/app/hooks';
import { getAllGroupsSlice } from '@/app/slices/groups';
import { IProductoGroups } from '@/api/services/groups';
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
  const userRoles = useAppSelector((state) => state.auth.signIn.user);
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

  const fetchData = async () => {
    if (!Id) return;
    const response = await GetBranches(Id);
    setProducts(response);
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
              sucursalId={Id}
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
                handleSelectChange={handleSelectChange}
                selectedGroup={selectedGroup}
                groups={GroupsAll}
                products={currentItems}
                userRoles={userRoles}
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
