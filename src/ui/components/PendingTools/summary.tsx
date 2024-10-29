import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListItemDePedido } from '@/interfaces/transferInterfaces';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { MessageSquare, MessageSquareMore } from 'lucide-react';
import Images from '../ToolShipment/photo';
import Comment from '../ToolShipment/comment';
import { Badge } from '@/components/ui/badge';
import { IStatus } from '@/interfaces/branchInterfaces';
import { Skeleton } from '@/components/ui/skeleton';
import './styles.scss';

const productStates = [
  { id: 1, value: 'Buen estado' },
  { id: 2, value: 'Regular' },
  { id: 3, value: 'Malo' },
  { id: 4, value: 'Incompleto' },
  { id: 5, value: 'Extraviado' },
];

export interface ISummaryPendingTools {
  products: ListItemDePedido[];
  status: IStatus;
}

export const SummaryPendingTools = ({
  products,
  status,
}: ISummaryPendingTools) => {
  const handleSaveComment = (comment: string) => {
    console.log(comment);
  };

  const handleRemoveComment = () => {};

  const handleSaveImages = (images: string[]) => {
    console.log(images);
  };

  return (
    <Card className="branch__transfer__list">
      <CardHeader>
        <CardTitle>Herramientas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[12%]">Código</TableHead>
              <TableHead className="w-[15%]">Nombre</TableHead>
              <TableHead className="w-[10%]">Enviado</TableHead>
              <TableHead className="w-[10%]">Recibido</TableHead>
              <TableHead className="w-[10%]">Precio ud.</TableHead>
              <TableHead className="w-[13%]">Estado</TableHead>
              <TableHead className=" text-center w-[15%]">Detalles</TableHead>
              <TableHead className="text-center w-[15%]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {status === 'loading' &&
              [1, 2, 3].map((item) => <ShipmentSkeleton key={item} />)}

            {status === 'succeeded' &&
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {product.inventarioSucursalId.productoId._id.slice(
                            0,
                            10
                          )}
                          ...
                        </TooltipTrigger>
                        <TooltipContent>
                          {product.inventarioSucursalId.productoId._id}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    {product.inventarioSucursalId.productoId.nombre}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={'secondary'}
                      className="flex items-center justify-center h-[36px] w-[50%]"
                    >
                      {product.cantidad}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      className="text-center w-[60%]"
                      value={0}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      className="text-center w-[60%]"
                      value={0}
                    />
                  </TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        {productStates.map((state) => (
                          <SelectItem key={state.id} value={state.value}>
                            {state.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Images
                        savedImages={product.archivosAdjuntos ?? []}
                        handleSaveImages={() => handleSaveImages([])}
                        readonly
                      />
                      <Comment
                        comment={product.comentarioEnvio ?? ''}
                        placeholder="No hay comentario"
                        readonly
                      >
                        <Button variant="outline" size="sm">
                          <MessageSquareMore className="w-4 h-4 mr-1" />
                        </Button>
                      </Comment>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Images
                        savedImages={[]}
                        handleSaveImages={() => handleSaveImages([])}
                      />
                      <Comment
                        comment={''}
                        handleRemoveComment={() => handleRemoveComment()}
                        handleSaveComment={() => handleSaveComment('')}
                      >
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                        </Button>
                      </Comment>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const ShipmentSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="product__skeleton" />
      </TableCell>
      <TableCell>
        <Skeleton className="product__skeleton" />
      </TableCell>
      <TableCell>
        <Skeleton className="product__skeleton" />
      </TableCell>
      <TableCell>
        <Skeleton className="product__skeleton" />
      </TableCell>
      <TableCell>
        <Skeleton className="product__skeleton" />
      </TableCell>
      <TableCell>
        <Skeleton className="product__skeleton" />
      </TableCell>
      <TableCell>
        <Skeleton className="product__skeleton" />
      </TableCell>
      <TableCell>
        <Skeleton className="product__skeleton" />
      </TableCell>
    </TableRow>
  );
};
