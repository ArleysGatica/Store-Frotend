import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ITablaBranch } from '@/interfaces/branchInterfaces';
import { useState, useEffect } from 'react';

interface ProductFormProps {
  initialData?: ITablaBranch;
  onSubmit: (data: ITablaBranch) => void;
  sucursalId: string;
}

type FormFieldKeys = 'nombre' | 'descripcion' | 'precio' | 'stock';

const ProductForm = ({
  initialData,
  onSubmit,
  sucursalId,
}: ProductFormProps) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    descripcion: initialData?.descripcion || '',
    precio: initialData?.precio?.$numberDecimal || '',
    stock: initialData?.stock || 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre,
        descripcion: initialData.descripcion,
        precio: initialData.precio?.$numberDecimal || '',
        stock: initialData.stock,
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: ITablaBranch = {
      ...initialData,
      sucursalId: sucursalId,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: {
        $numberDecimal: parseFloat(formData.precio?.toString() ?? '0'),
      },
      stock: parseInt(formData.stock.toString()),
      createdAt:
        initialData?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onSubmit(productData);
  };

  const fields: {
    id: FormFieldKeys;
    label: string;
    type: string;
    step?: string;
    min?: string;
  }[] = [
    { id: 'nombre', label: 'Nombre', type: 'text' },
    { id: 'descripcion', label: 'Descripcion', type: 'text' },
    { id: 'precio', label: 'Precio', type: 'number', step: '0.01', min: '0' },
    { id: 'stock', label: 'Stock', type: 'number', min: '0' },
  ];
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        {fields.map(({ id, label, type, step, min }) => (
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
            />
          </div>
        ))}
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
