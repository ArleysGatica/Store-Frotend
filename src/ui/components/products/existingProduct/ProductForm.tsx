import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ITablaBranch } from '@/interfaces/branchInterfaces';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Branch } from '@/app/slices/branchSlice';

interface ProductFormProps {
  initialData?: ITablaBranch;
  onSubmit: (data: ITablaBranch) => void;
  selectedBranch: {
    nombre: string;
    _id: string;
  } | null;
  branches: Branch[];
  handleSelectChangeBranch: (value: string) => void;
}

type FormFieldKeys = 'nombre' | 'descripcion' | 'precio' | 'stock';
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

export const ProductFormExist = ({
  initialData,
  onSubmit,
  selectedBranch,
  branches,
  handleSelectChangeBranch,
}: ProductFormProps) => {
  const [formData, setFormData] = useState({
    sucursalId: selectedBranch?._id || '',
    nombre: initialData?.nombre || '',
    descripcion: initialData?.descripcion || '',
    precio: initialData?.precio?.$numberDecimal || '',
    stock: initialData?.stock ?? 0,
    grupoId: '',
    monedaId: '671342d4664051db7c1f8792',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: ITablaBranch = {
      ...initialData,
      grupoId: '',
      monedaId: '671342d4664051db7c1f8792',
      sucursalId: selectedBranch?._id || '',
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      //@ts-ignore
      precio: parseFloat(formData.precio?.toString() ?? '0'),
      stock: parseInt(formData.stock.toString()),
    };

    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
              className={`col-span-3 ${readOnly ? 'border-none' : ''}`}
              required
              readOnly={readOnly}
            />
          </div>
        ))}
        <div className="items-center gap-4 flex">
          <Label htmlFor="branch-select" className="text-right">
            Sucursal
          </Label>
          <Select onValueChange={handleSelectChangeBranch}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent className="flex flex-col gap-2">
              {branches.map((branch) => (
                <SelectItem key={branch._id} value={branch._id as string}>
                  {branch.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Guardar Cambios</Button>
      </DialogFooter>
    </form>
  );
};
