import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ITablaBranch } from '@/interfaces/branchInterfaces';
import React, { useState, useEffect } from 'react';
import { IProductoGroups } from '@/api/services/groups';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductFormProps {
  initialData?: ITablaBranch;
  onSubmit: (data: ITablaBranch) => void;
  sucursalId: string;
  handleSelectChange: (value: string) => void;
  selectedGroup: {
    nombre: string;
    _id: string;
  } | null;
  groups: IProductoGroups[];
}

type FormFieldKeys = 'nombre' | 'descripcion' | 'precio' | 'stock';

const ProductForm = ({
  initialData,
  onSubmit,
  sucursalId,
  handleSelectChange,
  selectedGroup,
  groups,
}: ProductFormProps) => {
  console.log(sucursalId);
  const [formData, setFormData] = useState({
    // _id: initialData?.id || '',
    sucursalId: sucursalId,
    nombre: initialData?.nombre || '',
    descripcion: initialData?.descripcion || '',
    precio: initialData?.precio?.$numberDecimal || 0,
    stock: initialData?.stock ?? 0,
    grupoId: selectedGroup?._id || '',
    monedaId: '671342d4664051db7c1f8792',
  });

  //   useEffect(() => {
  //     if (initialData) {
  //       setFormData({
  //         _id: initialData.id || '',
  //         nombre: initialData.nombre || '',
  //         descripcion: initialData.descripcion || '',
  //         precio: initialData.precio?.$numberDecimal || '',
  //         stock: initialData.stock ?? 0,
  //         grupoId: selectedGroup?._id || '',
  //         sucursalId: initialData.sucursalId || '',
  //         monedaId: '671342d4664051db7c1f8792',
  //       });
  //     }
  //   }, [initialData]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: ITablaBranch = {
      ...formData,
      grupoId: selectedGroup?._id || '',
      monedaId: '671342d4664051db7c1f8792',
      sucursalId: sucursalId,
      //@ts-ignore
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock.toString(), 10),
    };

    onSubmit(productData);
  };

  const fields: {
    id: FormFieldKeys;
    label: string;
    type: string;
    step?: string;
    min?: string;
    readOnly?: boolean;
  }[] = [
    { id: 'nombre', label: 'Nombre', type: 'text', readOnly: true },
    { id: 'descripcion', label: 'Descripcion', type: 'text', readOnly: true },
    { id: 'precio', label: 'Precio', type: 'number' },
    { id: 'stock', label: 'Stock', type: 'number', min: '0' },
  ];
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid gap-4 py-4">
        {fields.map(({ id, label, type, step, min, readOnly }) => (
          <div key={id} className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={id} className="text-right">
              {label}
            </Label>
            <Input
              id={id}
              name={id}
              type={type}
              value={formData[id]}
              onChange={handleInputChange}
              step={step}
              min={min}
              className="col-span-3"
              required
              readOnly={readOnly}
            />
          </div>
        ))}
        <div className="items-center gap-4 flex">
          <Label htmlFor="branch-select" className="text-right">
            Categorias
          </Label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent className="flex flex-col gap-2">
              {groups.map((branch) => (
                <SelectItem key={branch._id} value={branch._id as string}>
                  {branch.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          {initialData ? 'Save Changes' : 'Add Product'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;
