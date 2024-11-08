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
import { toast, Toaster } from 'sonner';
import { ITablaBranch } from '@/interfaces/branchInterfaces';
import { store } from '@/app/store';
import SearchAndFilter from './sear';
import ProductsTable from './ProductTable';
import Pagination from '../../../shared/components/ui/Pagination/Pagination';
import { useAppSelector } from '@/app/hooks';
import { getAllGroupsSlice } from '@/app/slices/groups';
import { GetBranches } from '@/shared/helpers/Branchs';
import { createProduct } from '@/app/slices/branchSlice';
import { Boxes } from 'lucide-react';

export function DataTableDemo() {
  const { Id } = useParams<{ Id: string }>();
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

  const dataProduct = useAppSelector(
    (state) => state.branches.selectedBranch?.products
  );

  const handleSelectChange = (value: string) => {
    const selectedBranchId = value;
    const branch = GroupsAll.find((b) => b._id === selectedBranchId);
    if (branch) {
      setSelectedGroup({ nombre: branch.nombre, _id: branch._id ?? '' });
    }
  };

  const fetchData = async () => {
    if (!Id) return;
    await GetBranches(Id);
  };

  useEffect(() => {
    fetchData();
    store.dispatch(getAllGroupsSlice()).unwrap();
  }, []);

  const filteredProducts = dataProduct?.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil((filteredProducts ?? []).length / itemsPerPage);

  const handleAddProduct = async (newProduct: ITablaBranch) => {
    try {
      const product: ITablaBranch = {
        ...newProduct,
      };
      await store.dispatch(createProduct(product)).unwrap();
      toast.success(`Producto ${product.nombre} creado exitosamente`);
    } catch (error) {
      toast.error('Error al crear producto: ' + error);
    }
  };

  return (
    <>
      <Toaster richColors position="bottom-right" />
      <div className="flex flex-col w-full">
        <main className="flex-1 p-4 md:p-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Boxes size={20} />
                <CardTitle>Products</CardTitle>
              </div>
              <CardDescription>Gestione sus productos</CardDescription>
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
              {filteredProducts?.length === 0 ? (
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
    </>
  );
}
