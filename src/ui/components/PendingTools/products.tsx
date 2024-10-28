import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { store } from '@/app/store';
import {
  getPendingProductsByTransfer,
  setPendingSelected,
} from '@/app/slices/transferSlice';
import { useAppSelector } from '@/app/hooks';
import { SummaryPendingTools } from './summary';
import { PendingProductsActions } from './actions';
import { useParams } from 'react-router-dom';

export default function PendingProductsByTransfer() {
  const { id } = useParams<{ id: string }>();
  const pendingTransfer = useAppSelector(
    (state) => state.transfer.selectedPending
  );
  const [searchTerm, setSearchTerm] = useState('');

  const ShipmentList = pendingTransfer?.listItemDePedido.filter(
    (shipment) =>
      shipment.inventarioSucursalId &&
      shipment.inventarioSucursalId.productoId.nombre
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!id) return;
    store.dispatch(getPendingProductsByTransfer(id));

    return () => {
      store.dispatch(setPendingSelected(null));
    };
  }, [id]);

  return (
    <div className="container mx-auto ">
      <Tabs defaultValue="receive">
        <Card className="product__list">
          <br />
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar herramientas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {pendingTransfer && (
              <>
                <SummaryPendingTools products={ShipmentList ?? []} />
                <PendingProductsActions />
              </>
            )}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
