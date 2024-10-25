import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Images from './photo';
import Comment from './comment';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import { ITool } from '.';
import { useEffect, useState } from 'react';

export interface ISummaryTools {
  tools: ITool[];
  handleRemoveShipmentTool: (tool: ITool) => void;
  handleRemoveComment: (tool: ITool) => void;
  handleSaveComment: (toolId: string, comment: string) => void;
  handleSaveImages: (toolId: string, images: string[]) => void;
}

export const SummaryTools = ({
  tools,
  handleRemoveShipmentTool,
  handleRemoveComment,
  handleSaveComment,
  handleSaveImages,
}: ISummaryTools) => {
  const [shipmentTools, setShipmentTools] = useState<ITool[]>([]);

  useEffect(() => {
    if (tools.length === 0) return setShipmentTools([]);
    setShipmentTools(tools);
  }, [tools]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Herramientas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Código</TableHead>
              <TableHead className="flex justify-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipmentTools.map((tool) => (
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
