import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ReceivedTools from '../../../../ui/components/ReceivedTools';
import ToolShipment from '../../../../ui/components/ToolShipment';

export const HeaderTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container mx-auto ">
      <Tabs defaultValue="send">
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
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por consecutivo, bodega o enviado por..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <TabsContent value="receive">
          <ReceivedTools />
        </TabsContent>
        <TabsContent value="send">
          <ToolShipment />
        </TabsContent>
      </Tabs>
    </div>
  );
};
