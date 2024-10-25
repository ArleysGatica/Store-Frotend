import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ReceivedTools from '../../../../ui/components/ReceivedTools';
import ToolShipment from '../../../../ui/components/ToolShipment';

export const HeaderTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container mx-auto ">
      <Tabs defaultValue="receive">
        <TabsList className="mb-4 gap-4 bg-[#ffffff] text-[#ffffff] font-bold">
          <TabsTrigger
            className="  text-[#ffffff] font-bold
          border-b-2 border-bg-gray-200 border-opacity-0
          bg-black
          "
            value="receive"
          >
            Recibir herramientas
          </TabsTrigger>
          <TabsTrigger
            className="bg-black text-[#ffffff] font-bold"
            value="send"
          >
            Enviar herramientas
          </TabsTrigger>
        </TabsList>
        <div className="flex flex-col items-start justify-between gap-4 mb-4 sm:flex-row sm:items-center">
          <Button variant="outline">Contraer filtros</Button>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              Filtrar por fecha <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline">
              Filtrar por código <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline">
              Ordenar <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
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
          <h2 className="mb-4 text-2xl font-bold">Recibir Herramientas</h2>
          <ReceivedTools />
        </TabsContent>
        <TabsContent value="send">
          <h2 className="mb-4 text-2xl font-bold">Enviar Herramientas</h2>
          <ToolShipment />
        </TabsContent>
      </Tabs>
    </div>
  );
};
