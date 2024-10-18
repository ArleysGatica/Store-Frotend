import {
  ArrowDownIcon,
  ArrowUpIcon,
  ShoppingBagIcon,
  UsersIcon,
  CreditCardIcon,
  PackageIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { ReactNode } from 'react';

export default function Dashboard() {
  const salesData = [
    { name: 'Sept 10', total: 65 },
    { name: 'Sept 11', total: 59 },
    { name: 'Sept 12', total: 80 },
    { name: 'Sept 13', total: 81 },
    { name: 'Sept 14', total: 56 },
    { name: 'Sept 15', total: 55 },
    { name: 'Sept 16', total: 40 },
  ];

  const marketingData = [
    { name: 'Adquisición', value: 300 },
    { name: 'Compra', value: 50 },
    { name: 'Retención', value: 100 },
  ];

  const COLORS = ['#8b5cf6', '#3b82f6', '#f59e0b'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Ventas"
            value="$4,000,000.00"
            subValue="450"
            subLabel="Volumen"
            change={20.0}
            icon={<CreditCardIcon className="h-6 w-6 text-blue-500" />}
          />
          <StatCard
            title="Clientes"
            value="1,250"
            subValue="1,180"
            subLabel="Activos"
            change={15.8}
            icon={<UsersIcon className="h-6 w-6 text-green-500" />}
          />
          <StatCard
            title="Pedidos"
            value="450"
            subValue="5"
            subLabel="Pendientes"
            change={-4.9}
            icon={<ShoppingBagIcon className="h-6 w-6 text-purple-500" />}
          />
          <StatCard
            title="Productos"
            value="45"
            subValue="32"
            subLabel="Activos"
            change={24}
            icon={<PackageIcon className="h-6 w-6 text-yellow-500" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Resumen de Ventas
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Marketing</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {marketingData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Pedidos Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                      <PackageIcon className="h-8 w-8 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">iPhone 13</p>
                      <p className="text-sm text-gray-500">$730,000.00 x 1</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">12 Sept 2022</p>
                    <Badge
                      variant={i % 2 === 0 ? 'secondary' : 'outline'}
                      className="mt-1"
                    >
                      {i % 2 === 0 ? 'Pendiente' : 'Completado'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  subValue: string;
  subLabel: string;
  change: number;
  icon: ReactNode;
}

function StatCard({
  title,
  value,
  subValue,
  subLabel,
  change,
  icon,
}: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-2">
          <span>
            {subValue} {subLabel}
          </span>
          <span
            className={`ml-2 flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {change >= 0 ? (
              <ArrowUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            )}
            {Math.abs(change)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
