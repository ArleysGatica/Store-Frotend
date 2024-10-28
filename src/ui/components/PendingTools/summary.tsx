import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SummaryPendingTools = () => {
  return (
    <Card className="branch__transfer__list">
      <CardHeader>
        <CardTitle>Herramientas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Enviado</TableHead>
              <TableHead>Recibido</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Detalles</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {shipmentTools.map((tool) => (
              <TableRow key={tool.id}>
                <TableCell>
                  {tool.nombre}
                  <br />
                  <span className="text-sm text-muted-foreground">
                    {tool.quantityToSend}{' '}
                    {tool.quantityToSend === 1 ? 'unidad' : 'unidades'}
                  </span>
                </TableCell>
                <TableCell>{tool.id}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-between gap-2">
                    <Images
                      savedImages={tool.gallery}
                      handleSaveImages={(images) =>
                        handleSaveImages(tool.id!, images)
                      }
                    />
                    <Comment
                      comment={tool.comment}
                      handleRemoveComment={() => handleRemoveComment(tool)}
                      handleSaveComment={(comment) =>
                        handleSaveComment(tool.id!, comment)
                      }
                    >
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                      </Button>
                    </Comment>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveShipmentTool(tool)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
