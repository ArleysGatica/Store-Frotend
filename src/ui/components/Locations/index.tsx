import { MoreVertical, MapPin, Package, Warehouse, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface WarehouseData {
  id: string;
  name: string;
  location: string;
  pendingOrders: number;
  description: string;
  hasAccess: boolean;
}

const warehouses: WarehouseData[] = [
  {
    id: '1',
    name: 'Nombre de bodega',
    location: 'Ubicación',
    pendingOrders: 1,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    hasAccess: true,
  },
  {
    id: '2',
    name: 'Nombre de bodega',
    location: 'Ubicación',
    pendingOrders: 0,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    hasAccess: true,
  },
  {
    id: '3',
    name: 'Nombre de bodega',
    location: 'Ubicación',
    pendingOrders: 0,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    hasAccess: true,
  },
  {
    id: '4',
    name: 'Nombre de bodega',
    location: 'Ubicación',
    pendingOrders: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    hasAccess: false,
  },
  {
    id: '5',
    name: 'Nombre de bodega',
    location: 'Ubicación',
    pendingOrders: 0,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    hasAccess: true,
  },
  {
    id: '6',
    name: 'Nombre de bodega',
    location: 'Ubicación',
    pendingOrders: 0,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    hasAccess: true,
  },
  {
    id: '7',
    name: 'Nombre de bodega',
    location: 'Ubicación',
    pendingOrders: 0,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    hasAccess: true,
  },
  {
    id: '8',
    name: 'Nombre de bodega',
    location: 'Ubicación',
    pendingOrders: 0,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    hasAccess: true,
  },
];

export default function WarehouseDashboard() {
  return (
    <div className="container mx-auto ">
      <nav className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <MapPin className="h-5 w-5" />
          <Input placeholder="Nombre de la bodega" className="w-full sm:w-64" />
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          <Button variant="outline" className="flex-grow sm:flex-grow-0">
            Alquileres
          </Button>
          <Button variant="outline" className="flex-grow sm:flex-grow-0">
            Herramientas
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Ver materiales disponibles
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Más opciones</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Más opciones</SheetTitle>
                <SheetDescription>
                  Seleccione una opción adicional
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-2">
                <Button variant="outline" className="w-full">
                  Opción 1
                </Button>
                <Button variant="outline" className="w-full">
                  Opción 2
                </Button>
                <Button variant="outline" className="w-full">
                  Opción 3
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden sm:inline-flex">
                Más opciones
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Opción 1</DropdownMenuItem>
              <DropdownMenuItem>Opción 2</DropdownMenuItem>
              <DropdownMenuItem>Opción 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="w-full sm:w-auto">Desplegar filtros</Button>
        </div>
      </nav>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {warehouses.map((warehouse) => (
          <Card key={warehouse.id} className="flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {warehouse.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold">{warehouse.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {warehouse.location}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem>Eliminar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">
                {warehouse.pendingOrders > 0 && (
                  <p>
                    Pedidos pendientes de recibir{' '}
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-semibold text-red-800">
                      {warehouse.pendingOrders}
                    </span>
                  </p>
                )}
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-semibold">Datos</h4>
                <p className="text-sm text-muted-foreground">
                  {warehouse.description}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-between gap-2">
              {warehouse.hasAccess ? (
                <>
                  <Button variant="outline" size="sm" className="flex-grow">
                    <Warehouse className="mr-2 h-4 w-4" />
                    Alquileres
                  </Button>
                  <Button variant="outline" size="sm" className="flex-grow">
                    Herramientas
                  </Button>
                  <Button variant="outline" size="sm" className="flex-grow">
                    <Package className="mr-2 h-4 w-4" />
                    Materiales
                  </Button>
                </>
              ) : (
                <Button className="w-full" variant="default">
                  Solicitar acceso
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
