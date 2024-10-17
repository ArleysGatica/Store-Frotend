import { useState } from 'react';
import { Search, X, Camera, MessageSquare, Edit3, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Tool {
  id: string;
  name: string;
  code: string;
  availableQuantity: number;
  quantityToSend: number;
}

interface ShipmentTool extends Tool {
  photos: number;
  comments: number;
}

const initialTools: Tool[] = [
  {
    id: '1',
    name: 'Taladro neumático de mano de 50W',
    code: '1234567890abcd',
    availableQuantity: 25,
    quantityToSend: 0,
  },
];

const shipmentTools: ShipmentTool[] = [
  { ...initialTools[0], photos: 0, comments: 0 },
  { ...initialTools[1], photos: 1, comments: 0 },
];

export default function ToolShipment() {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [searchTerm, setSearchTerm] = useState('');

  const handleQuantityChange = (id: string, quantity: number) => {
    setTools(
      tools.map((tool) =>
        tool.id === id ? { ...tool, quantityToSend: quantity } : tool
      )
    );
  };

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto ">
      <TabsContent value="send">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <br />
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nombre herramientas..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Herramientas</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Cantidad disponible</TableHead>
                    <TableHead>Cantidad a enviar</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTools.map((tool) => (
                    <TableRow key={tool.id}>
                      <TableCell>{tool.name}</TableCell>
                      <TableCell>{tool.code}</TableCell>
                      <TableCell>{tool.availableQuantity} unidades</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={tool.quantityToSend}
                          onChange={(e) =>
                            handleQuantityChange(
                              tool.id,
                              parseInt(e.target.value)
                            )
                          }
                          min={0}
                          max={tool.availableQuantity}
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Agregar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Consolidado de envío</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Envía:</p>
                    <p>Nombre de la bodega que envía</p>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">
                      A
                    </Badge>
                    <div>
                      <p className="font-semibold">Nombre de bodega</p>
                      <p className="text-sm text-muted-foreground">Ubicación</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <p className="font-semibold mb-2">Transportista</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Selecciona el tipo de transportista:
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Button>Externo</Button>
                    <Button variant="outline">Interno</Button>
                  </div>
                  <Input placeholder="Escribe el nombre del transportista externo" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Herramientas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Herramientas</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipmentTools.map((tool) => (
                      <TableRow key={tool.id}>
                        <TableCell>
                          {tool.name}
                          <br />
                          <span className="text-sm text-muted-foreground">
                            {tool.quantityToSend} unidades
                          </span>
                        </TableCell>
                        <TableCell>{tool.code}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Camera className="h-4 w-4 mr-1" />
                              {tool.photos > 0
                                ? 'Ver fotografías'
                                : 'Agregar fotografía'}
                              {tool.photos > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                  {tool.photos}
                                </Badge>
                              )}
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {tool.comments > 0
                                ? 'Ver comentarios'
                                : 'Agregar comentarios'}
                              {tool.comments > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                  {tool.comments}
                                </Badge>
                              )}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-between mt-4">
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Agregar comentarios
                  </Button>
                  <Button variant="outline">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Agregar firma
                  </Button>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
    </div>
  );
}
