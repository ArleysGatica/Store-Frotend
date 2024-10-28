import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getFormatedDate } from '@/shared/helpers/transferHelper';
import {
  ArrowRight,
  Package,
  Warehouse,
  Calendar,
  MessageSquare,
  PenTool,
} from 'lucide-react';

interface Producto {
  imagen: string;
}

interface DetallesEnvioProps {
  pedidoId: string;
  fechaCreacion: Date;
  origen: string;
  destino: string;
  fechaEnvio: Date;
  fechaRecepcion: Date;
  productos: Producto[] | null;
  comentarioEnvio: string;
  firmaRecepcion: string;
}

export default function DetallesEnvio({
  pedidoId,
  fechaCreacion,
  origen,
  destino,
  fechaEnvio,
  fechaRecepcion,
  productos,
  comentarioEnvio,
  firmaRecepcion,
}: DetallesEnvioProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden shadow-lg rounded-lg">
      <CardContent className="p-0">
        <Header pedidoId={pedidoId} />
        <div className="p-6 grid gap-4 bg-gray-50">
          <FechaCreacion fecha={getFormatedDate(fechaCreacion)} />
          <Ubicaciones origen={origen} destino={destino} />
          <Separator className="border-gray-300" />
          <FechasEnvioRecepcion
            fechaEnvio={getFormatedDate(fechaEnvio)}
            fechaRecepcion={getFormatedDate(fechaRecepcion)}
          />
          <Separator className="border-gray-300" />
          <ListaProductos productos={productos} />
          <Separator className="border-gray-300" />
          <Comentario comentario={comentarioEnvio} />
          <Separator className="border-gray-300" />
          <FirmaRecepcion firma={firmaRecepcion} />
        </div>
      </CardContent>
    </Card>
  );
}

function Header({ pedidoId }: { pedidoId: string }) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
      <h2 className="text-4xl font-bold mb-2">Detalles del Envío</h2>
      <p className="text-lg opacity-90">Pedido #{pedidoId}</p>
    </div>
  );
}

function FechaCreacion({ fecha }: { fecha: string }) {
  return (
    <div className="flex items-center justify-between text-gray-600">
      <div className="flex items-center space-x-2 text-sm">
        <Calendar className="w-5 h-5" />
        <span>Creado: {fecha}</span>
      </div>
    </div>
  );
}

function Ubicaciones({ origen, destino }: { origen: string; destino: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-8">
      <Ubicacion label="Origen" ubicacion={origen} />
      <Ubicacion label="Destino" ubicacion={destino} />
    </div>
  );
}

function Ubicacion({ label, ubicacion }: { label: string; ubicacion: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-2 text-gray-600 text-sm">
        <Warehouse className="w-5 h-5" />
        <span>{label}</span>
      </div>
      <p className="font-semibold text-gray-800">{ubicacion}</p>
    </div>
  );
}

function FechasEnvioRecepcion({
  fechaEnvio,
  fechaRecepcion,
}: {
  fechaEnvio: string;
  fechaRecepcion: string;
}) {
  return (
    <div className="flex items-center justify-between text-gray-600">
      <div className="space-y-1">
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="w-5 h-5" />
          <span>Fecha de Envío</span>
        </div>
        <p className="font-semibold text-gray-800">{fechaEnvio}</p>
      </div>
      <ArrowRight className="w-6 h-6 text-indigo-500" />
      <div className="space-y-1">
        <div className="flex items-center space-x-2 text-sm">
          <Package className="w-5 h-5" />
          <span>Fecha de Recepción</span>
        </div>
        <p className="font-semibold text-gray-800">{fechaRecepcion}</p>
      </div>
    </div>
  );
}

function ListaProductos({ productos }: { productos: Producto[] }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Productos</h3>
      <div
        className={`grid gap-4 ${productos.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}
      >
        {productos.map((producto, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-2 border rounded-lg shadow-sm hover:shadow-md transition duration-200"
          >
            <img
              src={producto.imagen}
              className="w-full h-auto object-cover rounded-md mb-2"
              alt={`Producto ${idx + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Comentario({ comentario }: { comentario: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-gray-600 text-sm">
        <MessageSquare className="w-5 h-5" />
        <span>Comentario de Envío</span>
      </div>
      <p className="bg-gray-100 p-4 rounded-lg text-gray-700">{comentario}</p>
    </div>
  );
}

function FirmaRecepcion({ firma }: { firma: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-gray-600 text-sm">
        <PenTool className="w-5 h-5" />
        <span>Firma de Recepción</span>
      </div>
      <div className="border rounded-lg flex justify-center bg-gray-100">
        <img
          src={firma}
          alt="Firma de recepción"
          className="max-w-full h-[160px] object-contain"
        />
      </div>
    </div>
  );
}
