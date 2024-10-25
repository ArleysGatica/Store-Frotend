import { ListFilter, PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ProductForm from './ProductForm';
import { ITablaBranch } from '@/interfaces/branchInterfaces';
import { IProductoGroups } from '@/api/services/groups';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string[];
  setFilterStatus: (statuses: string[]) => void;
  onAddProduct: (newProduct: ITablaBranch) => void;
  sucursalId: string | undefined;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedGroup: {
    nombre: string;
    _id: string;
  } | null;
  groups: IProductoGroups[];
}

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  onAddProduct,
  sucursalId,
  handleSelectChange,
  selectedGroup,
  groups,
}: SearchAndFilterProps) => {
  return (
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
          {/* <DropdownMenuContent align="end">
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
          </DropdownMenuContent> */}
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
          <ProductForm
            handleSelectChange={handleSelectChange}
            selectedGroup={selectedGroup}
            groups={groups}
            onSubmit={onAddProduct}
            sucursalId={sucursalId!}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchAndFilter;
