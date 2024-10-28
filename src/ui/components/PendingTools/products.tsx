import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { store } from '@/app/store';
import { getPendingTransfers } from '@/app/slices/transferSlice';
import { useAppSelector } from '@/app/hooks';
import { SummaryPendingTools } from './summary';
import { PendingProductsActions } from './actions';

export default function PendingProductsByTransfer() {
  const user = useAppSelector((state) => state.auth.signIn.user);
  const pendingTransfer = useAppSelector((state) => state.transfer.pending);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShipments = pendingTransfer.filter(
    (shipment) =>
      (shipment.consecutivo &&
        shipment.consecutivo?.toString().includes(searchTerm)) ||
      shipment.sucursalDestinoId.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      shipment.usuarioIdEnvia.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!user?.sucursalId) return;
    store.dispatch(getPendingTransfers(user.sucursalId._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <SummaryPendingTools />
            <PendingProductsActions />
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
