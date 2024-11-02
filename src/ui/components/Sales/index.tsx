'use client';

// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Eye } from 'lucide-react';
import { Sale } from './Sale';
import { Inventory } from './Inventory';
import { SaleHistory } from './SaleHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { ITablaBranch } from '@/interfaces/branchInterfaces';
import { GetBranches } from '@/shared/helpers/Branchs';
import { store } from '@/app/store';
import { updateSelectedBranch } from '@/app/slices/branchSlice';

// Simulated discount rules
// const discountRules = [
//   { id: 1, productId: 1, minQuantity: 5, discountPercentage: 10 },
//   { id: 2, productId: 2, minQuantity: 3, discountPercentage: 15 },
//   { id: 3, productIds: [1, 2], minQuantity: 2, discountPercentage: 20 },
// ];

export default function SalesInventorySystem() {
  const user = useAppSelector((state) => state.auth.signIn.user);
  const [products, setProducts] = useState<ITablaBranch[]>([]);

  const handleLoadBranch = async () => {
    if (user?.sucursalId) {
      const response = await GetBranches(user.sucursalId._id);

      store.dispatch(
        updateSelectedBranch({
          ...user.sucursalId,
          products: response,
        })
      );
      setProducts(response);
    } else {
      store.dispatch(updateSelectedBranch(null));
      setProducts([]);
    }
  };

  useEffect(() => {
    handleLoadBranch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   const [currentSale, setCurrentSale] = useState([]);
  //   const [salesHistory, setSalesHistory] = useState([]);
  //   const [selectedProduct, setSelectedProduct] = useState('');
  //   const [saleQuantity, setSaleQuantity] = useState(1);
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const [selectedSale, setSelectedSale] = useState(null);
  //   const [isSupplier, setIsSupplier] = useState(false);

  //   useEffect(() => {
  //     updateCurrentSalePrices();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [isSupplier]);

  //   const updateCurrentSalePrices = () => {
  //     setCurrentSale(
  //       currentSale.map((item) => ({
  //         ...item,
  //         price: isSupplier
  //           ? products.find((p) => p.id === item.id).supplierPrice
  //           : products.find((p) => p.id === item.id).price,
  //       }))
  //     );
  //   };

  //   const addToSale = () => {
  //     const product = products.find((p) => p.id === parseInt(selectedProduct));
  //     if (product && product.inventory >= saleQuantity) {
  //       const price = isSupplier ? product.supplierPrice : product.price;
  //       const existingItem = currentSale.find((item) => item.id === product.id);
  //       if (existingItem) {
  //         setCurrentSale(
  //           currentSale.map((item) =>
  //             item.id === product.id
  //               ? { ...item, quantity: item.quantity + saleQuantity, price }
  //               : item
  //           )
  //         );
  //       } else {
  //         setCurrentSale([
  //           ...currentSale,
  //           { ...product, quantity: saleQuantity, price },
  //         ]);
  //       }
  //       setSelectedProduct('');
  //       setSaleQuantity(1);
  //     } else {
  //       setAlerts([
  //         ...alerts,
  //         { type: 'error', message: 'Insufficient inventory for this sale' },
  //       ]);
  //     }
  //   };

  //   const removeFromSale = (productId) => {
  //     setCurrentSale(currentSale.filter((item) => item.id !== productId));
  //   };

  //   const applyDiscounts = (saleItems) => {
  //     let discountedItems = [...saleItems];

  //     // Apply individual product discounts
  //     discountedItems = discountedItems.map((item) => {
  //       const rule = discountRules.find(
  //         (r) => r.productId === item.id && item.quantity >= r.minQuantity
  //       );
  //       if (rule) {
  //         const discountAmount =
  //           (item.price * item.quantity * rule.discountPercentage) / 100;
  //         return {
  //           ...item,
  //           discount: discountAmount,
  //           discountPercentage: rule.discountPercentage,
  //         };
  //       }
  //       return item;
  //     });

  //     // Apply group discounts
  //     discountRules
  //       .filter((rule) => rule.productIds)
  //       .forEach((rule) => {
  //         const groupItems = discountedItems.filter((item) =>
  //           rule?.productIds?.includes(item.id)
  //         );
  //         const groupQuantity = groupItems.reduce(
  //           (sum, item) => sum + item.quantity,
  //           0
  //         );
  //         if (groupQuantity >= rule.minQuantity) {
  //           groupItems.forEach((item) => {
  //             const index = discountedItems.findIndex((i) => i.id === item.id);
  //             const discountAmount =
  //               (item.price * item.quantity * rule.discountPercentage) / 100;
  //             discountedItems[index] = {
  //               ...item,
  //               discount: Math.max(discountAmount, item.discount || 0),
  //               discountPercentage: Math.max(
  //                 rule.discountPercentage,
  //                 item.discountPercentage || 0
  //               ),
  //             };
  //           });
  //         }
  //       });

  //     return discountedItems;
  //   };

  //   const processSale = () => {
  //     const discountedSale = applyDiscounts(currentSale);

  //     // Update inventory
  //     const updatedProducts = products.map((product) => {
  //       const saleItem = discountedSale.find((item) => item.id === product.id);
  //       if (saleItem) {
  //         return { ...product, inventory: product.inventory - saleItem.quantity };
  //       }
  //       return product;
  //     });

  //     // Calculate subtotal and total
  //     const subtotal = discountedSale.reduce(
  //       (sum, item) => sum + item.price * item.quantity,
  //       0
  //     );
  //     const totalDiscount = discountedSale.reduce(
  //       (sum, item) => sum + (item.discount || 0),
  //       0
  //     );
  //     const total = subtotal - totalDiscount;

  //     // Record sale
  //     const newSale = {
  //       id: salesHistory.length + 1,
  //       items: discountedSale,
  //       subtotal: subtotal,
  //       totalDiscount: totalDiscount,
  //       total: total,
  //       date: new Date().toISOString(),
  //       isSupplier: isSupplier,
  //     };

  //     setProducts(updatedProducts);
  //     setSalesHistory([...salesHistory, newSale]);
  //     setCurrentSale([]);
  //     setAlerts([
  //       ...alerts,
  //       {
  //         type: 'success',
  //         message: `Sale #${newSale.id} processed successfully!`,
  //       },
  //     ]);
  //     setIsSupplier(false);
  //   };

  //   const discountedSale = applyDiscounts(currentSale);
  //   const subtotal = discountedSale.reduce(
  //     (sum, item) => sum + item.price * item.quantity,
  //     0
  //   );
  //   const totalDiscount = discountedSale.reduce(
  //     (sum, item) => sum + (item.discount || 0),
  //     0
  //   );
  //   const total = subtotal - totalDiscount;

  return (
    <div className="container p-4 mx-auto">
      <Tabs defaultValue="sale">
        <div className="flex flex-col items-start justify-between gap-4 mb-4 sm:flex-row sm:items-center">
          <TabsList className="gap-4 font-bold text-white bg-black">
            <TabsTrigger
              className="text-[#ffffff] font-bold border-b-2 border-bg-gray-200 border-opacity-0 bg-black"
              value="sale"
            >
              Nueva venta
            </TabsTrigger>
            <TabsTrigger
              className="bg-black text-[#ffffff] font-bold"
              value="history"
            >
              Historial de ventas
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="sale">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 h-[36rem] max-h-[36rem]">
            <Inventory products={products} />
            <Sale products={products} setProducts={setProducts} />
          </div>
        </TabsContent>
        <TabsContent value="history">
          <SaleHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
