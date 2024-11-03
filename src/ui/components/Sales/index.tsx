'use client';

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
import { getDiscountsByBranch } from '@/app/slices/salesSlice';

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
      await store.dispatch(getDiscountsByBranch(user.sucursalId._id));
    } else {
      store.dispatch(updateSelectedBranch(null));
      setProducts([]);
    }
  };

  useEffect(() => {
    handleLoadBranch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
