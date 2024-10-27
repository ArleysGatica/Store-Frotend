import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { OrderReceived } from '.';

interface IOrder {
  orders: OrderReceived[];
}

export const CardReceived = ({ orders }: IOrder) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Overall Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-600">
                Total Orders
              </h3>
              <p className="text-3xl font-bold">{orders.length}</p>
              <p className="text-sm text-gray-500">Last 7 days</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-500">
                Total Received
              </h3>
              <p className="text-3xl font-bold">
                {orders.filter((o) => o.status === 'Solicitado').length}
              </p>
              <p className="text-sm">
                $
                {orders
                  .filter((o) => o.status === 'Solicitado')
                  .reduce(
                    (acc, curr) => acc + parseInt(curr.value.slice(1)),
                    0
                  )}{' '}
                Revenue
              </p>
              <p className="text-sm text-gray-500">Last 7 days</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-600">
                Total Returned
              </h3>
              <p className="text-3xl font-bold">
                {orders.filter((o) => o.status === 'Terminado').length}
              </p>
              <p className="text-sm">
                $
                {orders
                  .filter((o) => o.status === 'Terminado')
                  .reduce(
                    (acc, curr) => acc + parseInt(curr.value.slice(1)),
                    0
                  )}{' '}
                Cost
              </p>
              <p className="text-sm text-gray-500">Last 7 days</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-500">On the way</h3>
              <p className="text-3xl font-bold">
                {orders.filter((o) => o.status === 'Imcompleto').length}
              </p>
              <p className="text-sm">
                $
                {orders
                  .filter((o) => o.status === 'Imcompleto')
                  .reduce(
                    (acc, curr) => acc + parseInt(curr.value.slice(1)),
                    0
                  )}{' '}
                Cost
              </p>
              <p className="text-sm text-gray-500">Ordered</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
