import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Images from '../ToolShipment/photo';
import { useEffect, useState } from 'react';
import Comment from '../ToolShipment/comment';

export const TableReceived = () => {
  const Data = [
    {
      id: '671a8c08a6e0841fd34fdd42',
      nombre: 'Martillo',
      quantityToSend: 2,
    },
  ];

  const [images, setImages] = useState<string[]>([]);
  const handleSaveImages = (newImages: string[]) => {
    setImages(newImages);
  };

  const handleSave = (comment: string) => {
    console.log('Comentario guardado:', comment);
  };

  const handleDelete = () => {
    console.log('Comentario eliminado');
  };

  const [shipmentTools, setShipmentTools] = useState<any[]>([]);

  useEffect(() => {
    if (Data.length === 0) return setShipmentTools([]);
    setShipmentTools(Data);
  }, [Data]);

  return (
    <Card className="branch__transfer__list">
      <CardHeader>
        <CardTitle>Herramientas</CardTitle>
      </CardHeader>
      <CardContent>
        {shipmentTools.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Código</TableHead>
                <TableHead className="flex items-center justify-center">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipmentTools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell className="flex items-center justify-center gap-2 flex-col">
                    {tool.nombre}
                    <span className="text-sm text-muted-foreground">
                      {tool.quantityToSend}{' '}
                      {tool.quantityToSend === 1 ? 'unidad' : 'unidades'}
                    </span>
                  </TableCell>
                  <TableCell>{tool.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center flex-col justify-between gap-2">
                      <Images
                        savedImages={images}
                        handleSaveImages={handleSaveImages}
                        showTitle={true}
                        maxImages={5}
                        title="Mis Imágenes"
                      />
                      <Comment
                        comment="Este es un comentario inicial"
                        handleSaveComment={handleSave}
                        handleRemoveComment={handleDelete}
                        title="Nota de Revisión"
                        placeholder="Escribe tu nota aquí..."
                        buttonText="Añadir nota"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No hay herramientas para mostrar.</p>
        )}
      </CardContent>
    </Card>
  );
};
