import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Plus, Trash2, Camera } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export interface IImages {
  handleSaveImages: (images: string[]) => void;
  savedImages: string[];
  className?: string;
  showTitle?: boolean;
}

export default function Images({
  savedImages,
  handleSaveImages,
  className,
  showTitle,
}: IImages) {
  const [isOpen, setIsOpen] = useState(false);
  const [fotos, setFotos] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotos([...fotos, reader.result as string]);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecciona un archivo de imagen.');
    }
  };

  const deleteLastImage = () => {
    setFotos(fotos.slice(0, -1));
  };

  const saveImages = () => {
    handleSaveImages(fotos);
    setIsOpen(false);
  };

  useEffect(() => {
    setFotos(savedImages ?? []);
  }, [savedImages]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Camera className="w-4 h-4 mr-1" />
          {showTitle && <span className="px-1">Gestionar imágenes</span>}
          {fotos.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {fotos.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-[350px] p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center pb-2 space-x-2">
            <div className="flex items-center justify-center w-8 h-8 font-semibold rounded-full bg-primary text-primary-foreground">
              A
            </div>
            <CardTitle>Fotografía</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-1">
              {fotos.map((foto, index) => (
                <div key={index} className={'col-span-1'}>
                  <img
                    src={foto}
                    alt={`Foto ${index}`}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="flex justify-between w-full">
              {fotos.length < 6 && (
                <div className="grid items-center w-[120px]">
                  <Label htmlFor="picture" className="sr-only">
                    Agregar más
                  </Label>
                  <div className="relative">
                    <Input
                      id="picture"
                      type="file"
                      className="sr-only"
                      aria-hidden="true"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="picture"
                      className="h-[30px] flex items-center justify-center font-semibold text-xs text-black bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-50 shadow-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      <span>Agregar más</span>
                    </label>
                  </div>
                </div>
              )}
              {fotos.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteLastImage()}
                  className="w-[130px]"
                >
                  <Trash2 className="w-4 h-4" /> Eliminar imagen
                </Button>
              )}
            </div>
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                Cerrar
              </Button>
              <Button size="sm" onClick={saveImages}>
                Guardar
              </Button>
            </div>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
