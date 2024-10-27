import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ToolShipment from '../../../../ui/components/ToolShipment';
import ReceivedTools2 from '@/ui/components/ReceivedTools';
import { Button } from '@/components/ui/button';
import { ShippedOrders } from '@/ui/components/shippedOrders';

export const HeaderTable = () => {
  // Estado local para manejar la pestaña activa
  const [activeTab, setActiveTab] = useState('send');

  return (
    <div className="container mx-auto flex">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col items-start justify-between gap-4 mb-4 sm:flex-row sm:items-center">
          <TabsList className="gap-4 font-bold text-white bg-black">
            <TabsTrigger
              className="text-[#ffffff] font-bold border-b-2 border-bg-gray-200 border-opacity-0 bg-black"
              value="send"
            >
              Enviar herramientas
            </TabsTrigger>
            <TabsTrigger
              className="bg-black text-[#ffffff] font-bold"
              value="receive"
            >
              Recibir herramientas
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 mb-4 sm:flex-row sm:items-center">
          <Button onClick={() => setActiveTab('shipped')}>
            Pedidos enviados
          </Button>
          <Button onClick={() => setActiveTab('receive')}>
            Pedidos recibidos
          </Button>
        </div>
        <TabsContent value="shipped">
          <ShippedOrders />
        </TabsContent>

        <TabsContent value="receive">
          <ReceivedTools2 />
        </TabsContent>
        <TabsContent value="send">
          <ToolShipment />
        </TabsContent>
      </Tabs>
    </div>
  );
};
