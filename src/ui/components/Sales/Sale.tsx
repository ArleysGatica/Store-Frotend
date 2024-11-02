import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Check, ChevronsUpDown, DollarSign, Truck } from 'lucide-react';
import { ProductSale } from './ProductSale';
import { ITablaBranch } from '@/interfaces/branchInterfaces';
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import './style.scss';

export interface IProductSale {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  discountPercentage: number;
}

export interface ISaleProps {
  products: ITablaBranch[];
  setProducts: React.Dispatch<React.SetStateAction<ITablaBranch[]>>;
}

export const Sale = ({ products, setProducts }: ISaleProps) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [supplierMode, setSupplierMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ITablaBranch | null>(
    null
  );
  const [productSale, setProductSale] = useState<IProductSale[]>([]);

  const handleSelectProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);

    if (!product) return setSelectedProduct(null);

    setSelectedProduct(product);
    setPrice(Number(product.precio.$numberDecimal));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    product
      ? setQuantity(quantity > product.stock ? product.stock : quantity)
      : setQuantity(0);
  };

  const handlePriceChange = (productId: string, price: number) => {
    const product = products.find((p) => p.id === productId);
    product ? setPrice(price) : setPrice(0);
  };

  const handleAddProductSale = () => {
    const newProductSale: IProductSale = {
      productId: selectedProduct?.id ?? '',
      productName: selectedProduct?.nombre ?? '',
      quantity: quantity,
      price: price,
      discount: 0,
      discountPercentage: 0,
    };

    const isExistentProduct = productSale.find(
      (p) =>
        p.productId === newProductSale.productId &&
        p.price === newProductSale.price
    );

    if (isExistentProduct) {
      const updatedProductSale = productSale.map((item) =>
        item.productId === newProductSale.productId &&
        item.price === newProductSale.price
          ? { ...item, quantity: item.quantity + newProductSale.quantity }
          : item
      );
      setProductSale(updatedProductSale);
    } else {
      setProductSale([...productSale, newProductSale]);
    }

    const updatedProducts = products.map((item) =>
      item.id === newProductSale.productId
        ? { ...item, stock: item.stock - newProductSale.quantity }
        : item
    );

    setProducts(updatedProducts);
    setQuantity(0);
    setPrice(0);
  };

  const handleRemoveProductSale = (productId: string) => {
    let quantity = 0;
    const updatedProductSale = productSale.filter((item) => {
      if (item.productId === productId) {
        quantity = item.quantity;
        return false;
      }
      return true;
    });
    setProductSale(updatedProductSale);

    const updatedProducts = products.map((item) =>
      item.id === productId ? { ...item, stock: item.stock + quantity } : item
    );
    setProducts(updatedProducts);
  };

  //   useEffect(() => {
  //     checkLowInventory();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [products]);

  //   const checkLowInventory = () => {
  //     const lowInventoryAlerts = products
  //       .filter((product) => product.inventory <= product.reorderPoint)
  //       .map((product) => ({
  //         type: 'warning',
  //         message: `Low inventory alert for ${product.name}. Current stock: ${product.inventory}`,
  //       }));

  //     console.log(lowInventoryAlerts);
  //   };

  const subTotal = productSale.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = productSale.reduce(
    (sum, item) => sum + (item.discount || 0),
    0
  );
  const total = subTotal - totalDiscount;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign />
          Gestionar venta
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[80%]">
        <div className="flex items-center mb-4 space-x-2">
          <Switch
            className="p-0"
            checked={supplierMode}
            onCheckedChange={setSupplierMode}
          />
          <Label className="flex items-center">
            <Truck className="w-4 h-4 mr-2" />
            Modo Proveedor
          </Label>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <Label className="text-xs">Producto</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[250px] justify-between"
                >
                  {selectedProduct
                    ? products.find(
                        (product) => product.id === selectedProduct.id
                      )?.nombre
                    : 'Selecciona producto'}
                  <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <Command>
                  <CommandInput placeholder="Buscar producto" />
                  <CommandList className="product__list">
                    <CommandEmpty>Producto no encontrado.</CommandEmpty>
                    <CommandGroup>
                      {products.map((product) => (
                        <CommandItem
                          key={product.id}
                          value={product.nombre}
                          onSelect={() => {
                            handleSelectProduct(
                              product.id === selectedProduct?.id
                                ? ''
                                : product.id!
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedProduct?.id === product.id
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {product.nombre}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs">Cantidad</Label>
            <Input
              type="number"
              id="branch-select"
              value={selectedProduct ? quantity : 0}
              disabled={!selectedProduct}
              onChange={(e) =>
                handleQuantityChange(
                  selectedProduct?.id!,
                  Number(e.target.value)
                )
              }
              min={0}
              max={selectedProduct?.stock ?? 0}
              className="w-[6rem]"
            />
          </div>
          {supplierMode && (
            <div className="flex flex-col gap-1">
              <Label className="text-xs">Precio</Label>
              <Input
                type="number"
                id="branch-select"
                value={selectedProduct ? price : 0}
                disabled={!selectedProduct}
                onChange={(e) =>
                  handlePriceChange(
                    selectedProduct?.id!,
                    Number(e.target.value)
                  )
                }
                min={0}
                className="w-[6rem]"
              />
            </div>
          )}
          <div className="flex flex-col justify-end gap-1">
            <Button
              className="w-[7rem]"
              disabled={!selectedProduct || quantity <= 0 || price <= 0}
              onClick={handleAddProductSale}
            >
              Agregar
            </Button>
          </div>
        </div>
        <ProductSale
          products={productSale}
          handleRemoveProductSale={handleRemoveProductSale}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p>Subtotal: ${subTotal.toFixed(2)}</p>
        <p className="text-green-600">Descuento: ${totalDiscount.toFixed(2)}</p>
        <p className="font-bold">Total: ${total.toFixed(2)}</p>
        <Button disabled={productSale.length === 0}>Procesar Venta</Button>
      </CardFooter>
    </Card>
  );
};
