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

  return (
    <div className="container p-4 mx-auto">
      <Tabs defaultValue="sale">
        <div className="flex flex-col items-start justify-center gap-4 mb-4 sm:flex-row sm:items-center">
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
            <Sale
              userId={user?._id ?? ''}
              products={products}
              setProducts={setProducts}
            />
          </div>
        </TabsContent>
        <TabsContent value="history">
          <SaleHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
