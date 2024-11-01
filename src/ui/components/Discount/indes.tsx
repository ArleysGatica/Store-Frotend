import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { useAppSelector } from '@/app/hooks';
import { getAllGroupsSlice } from '@/app/slices/groups';
import { store } from '@/app/store';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { SelectSearch } from '@/shared/components/ui/SelectSearch';
import { useFilteredBranches } from '@/shared/hooks/useSelectedBranch';
import {
  cleanDataSales,
  createDiscountSales,
  getDiscounts,
} from '@/app/slices/salesSlice';
import { fetchAllProducts } from '@/app/slices/productsSlice';

export interface IDescuentoCreate {
  nombre: string;
  tipoDescuento: 'porcentaje' | 'valor';
  valorDescuento: number;
  fechaInicio: Date;
  fechaFin: Date;
  minimoCompra: number;
  minimoCantidad: number;
  activo: boolean;
  moneda_id: string;
  codigoDescunto: string;
  deleted_at: Date | null;
  tipoDescuentoEntidad: 'Product' | 'Group';
  ProductId: string;
  grupoId: string;
  sucursalId: string;
}

export default function DiscountManager() {
  const [discounts, setDiscounts] = useState<IDescuentoCreate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const data = useAppSelector((state) => state.sales.discounts);
  const { branches, selectedBranch, setSelectedBranch } = useFilteredBranches();
  const dataAllProducts = useAppSelector((state) => state.products.products);
  const GroupsAll = useAppSelector((state) => state.categories.groups);
  const [formState, setFormState] = useState<IDescuentoCreate>({
    nombre: '',
    tipoDescuento: 'porcentaje',
    valorDescuento: 0,
    fechaInicio: new Date(),
    fechaFin: new Date(),
    minimoCompra: 0,
    minimoCantidad: 0,
    activo: true,
    moneda_id: '64b7f1b4b4f1b5f1c7e7f2a9',
    codigoDescunto: '',
    deleted_at: null,
    tipoDescuentoEntidad: 'Product',
    ProductId: '',
    grupoId: '',
    sucursalId: '',
  });
  const stateProduct = formState.tipoDescuentoEntidad === 'Product';

  const [, setSelectedGroup] = useState<{
    nombre: string;
    _id: string;
  } | null>(null);

  const [, setSelectedProduct] = useState<{
    nombre: string;
    _id: string;
  } | null>(null);

  const groupsAllOptions = GroupsAll.filter((branch) => branch._id).map(
    (branch) => ({
      id: branch._id as string,
      nombre: branch.nombre,
    })
  );
  const options = branches
    .filter((branch) => branch._id)
    .map((branch) => ({
      id: branch._id as string,
      nombre: branch.nombre,
    }));

  const opcionesProductos = dataAllProducts
    .filter((branch) => branch?.id)
    .map((branch) => ({
      id: branch.id as string,
      nombre: branch.nombre,
    }));

  const handleSelectChangeBranch = (value: string) => {
    const branch = branches.find((b) => b._id === value);
    if (branch) {
      setSelectedBranch({ nombre: branch.nombre, _id: branch._id ?? '' });
    }

    setFormState((prevState) => ({
      ...prevState,
      sucursalId: branch?._id ?? '',
    }));
  };

  const handleSelectChange = (value: string) => {
    const selectedGroupId = value;
    const category = GroupsAll.find((b) => b._id === selectedGroupId);

    if (category) {
      setSelectedGroup({
        nombre: category.nombre,
        _id: category._id ?? '',
      });

      setFormState((prevState) => ({
        ...prevState,
        grupoId: category._id ?? '',
      }));
    }
  };

  const handleProducts = (value: string) => {
    const selectedProduct = dataAllProducts.find((d) => d.id === value);

    if (selectedProduct) {
      setSelectedProduct({
        nombre: selectedProduct.nombre,
        _id: selectedProduct.id ?? '',
      });

      setFormState((prevState) => ({
        ...prevState,
        ProductId: selectedProduct.id ?? '',
      }));
    }
  };

  useEffect(() => {
    store.dispatch(getAllGroupsSlice()).unwrap();
    store.dispatch(getDiscounts()).unwrap();
    store.dispatch(fetchAllProducts()).unwrap();
  }, []);

  const updateFormState = (field: keyof IDescuentoCreate, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const openAddModal = () => {
    cleanDataSales();
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: string) => {
    const discount = discounts.find(
      (d) => d.ProductId === id || d.grupoId === id
    );
    if (discount) {
      setEditingId(id);
      setFormState(discount);
      setIsModalOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      setDiscounts((prev) =>
        prev.map((d) =>
          d.ProductId === editingId || d.grupoId === editingId ? formState : d
        )
      );
    } else {
      setDiscounts((prev) => [...prev, formState]);
      store.dispatch(createDiscountSales(formState)).unwrap();
    }

    setIsModalOpen(false);
    cleanDataSales();
  };

  return (
    <div>
      <Button onClick={openAddModal}>Add Discount</Button>
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Tipo Descuento</TableHead>
            <TableHead>Valor Descuento</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Fecha Fin</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((discount) => (
            <tr key={discount.ProductId || discount.grupoId}>
              <td className="px-4 py-2">{discount.nombre}</td>
              <td className="px-4 py-2">{discount.tipoDescuento}</td>
              <td className="px-4 py-2">{discount.valorDescuento}</td>
              <td className="px-4 py-2">
                {format(new Date(discount.fechaInicio), 'dd/MM/yyyy')}
              </td>
              <td className="px-4 py-2">
                {format(new Date(discount.fechaFin), 'dd/MM/yyyy')}
              </td>
              <td className="px-4 py-2">
                <Button onClick={() => openEditModal(discount.ProductId)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Edit Discount' : 'Add Discount'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  className="w-full"
                  id="nombre"
                  value={formState.nombre}
                  onChange={(e) => updateFormState('nombre', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tipoDescuento">Tipo</Label>
                <Select
                  value={formState.tipoDescuentoEntidad || ''}
                  onValueChange={(value) => {
                    updateFormState('tipoDescuentoEntidad', value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Group">Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-full gap-4">
                <div>
                  <Label htmlFor="tipoDescuento">Categorias</Label>
                  <SelectSearch
                    key={formState.tipoDescuentoEntidad}
                    options={
                      stateProduct ? opcionesProductos : groupsAllOptions
                    }
                    placeholder={stateProduct ? 'Product' : 'Categoria'}
                    initialValue={
                      stateProduct
                        ? formState.ProductId || ''
                        : formState.grupoId || ''
                    }
                    onChange={
                      stateProduct ? handleProducts : handleSelectChange
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="tipoDescuento">Sucursal</Label>
                  <SelectSearch
                    options={options}
                    placeholder="Selecione su categoria"
                    initialValue={selectedBranch?._id || ''}
                    onChange={handleSelectChangeBranch}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tipoDescuento">Tipo Descuento</Label>
                <Select
                  value={formState.tipoDescuento}
                  onValueChange={(value) =>
                    updateFormState(
                      'tipoDescuento',
                      value as 'porcentaje' | 'valor'
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="porcentaje">Porcentaje</SelectItem>
                    <SelectItem value="valor">Valor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="valorDescuento">Valor Descuento</Label>
                <Input
                  id="valorDescuento"
                  type="number"
                  value={formState.valorDescuento}
                  onChange={(e) =>
                    updateFormState('valorDescuento', e.target.value)
                  }
                />
              </div>
              <div className="flex w-full gap-4">
                <div>
                  <Label>Fecha Inicio</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          formState.fechaInicio && 'text-muted-foreground'
                        )}
                      >
                        {formState.fechaInicio ? (
                          format(formState.fechaInicio, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formState.fechaInicio}
                        onSelect={(date) => {
                          if (date) {
                            updateFormState('fechaInicio', date.toISOString());
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Fecha Fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          formState.fechaFin && 'text-muted-foreground'
                        )}
                      >
                        {formState.fechaFin ? (
                          format(formState.fechaFin, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formState.fechaFin}
                        onSelect={(date) => {
                          if (date) {
                            updateFormState('fechaFin', date.toISOString());
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="minimoCompra">Mínimo Compra</Label>
                <Input
                  id="minimoCompra"
                  type="number"
                  value={formState.minimoCompra}
                  onChange={(e) =>
                    updateFormState('minimoCompra', e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="minimoCantidad">Mínimo Cantidad</Label>
                <Input
                  id="minimoCantidad"
                  type="number"
                  value={formState.minimoCantidad}
                  onChange={(e) =>
                    updateFormState('minimoCantidad', e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="codigoDescunto">Código Descuento</Label>
                <Input
                  id="codigoDescunto"
                  value={formState.codigoDescunto}
                  onChange={(e) =>
                    updateFormState('codigoDescunto', e.target.value)
                  }
                />
              </div>
              <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
