import { Button } from '@/components/ui/button';
import Signature from './signature';
import Comment from './comment';
import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ITool } from '.';
import Images from './photo';

export interface IToolTransfer {
  sucursalOrigenId: string;
  sucursalDestinoId: string | null;
  comentarioEnvio: string | null;
  firmaEnvio: string | null;
  archivosAdjuntos: string[];
  usuarioIdEnvia: string;
}

export interface IToolTransferProps {
  userId: string;
  destinationBranchId: string | null;
  sourceBranchId: string;
  shipmentTools: ITool[];
}

export const ToolTransfer = ({
  destinationBranchId,
  sourceBranchId,
  shipmentTools,
  userId,
}: IToolTransferProps) => {
  const [toolTransfer, setToolTransfer] = useState<IToolTransfer>({
    comentarioEnvio: null,
    firmaEnvio: '',
    sucursalOrigenId: '',
    sucursalDestinoId: '',
    archivosAdjuntos: [],
    usuarioIdEnvia: '',
  });

  const handleSaveComment = (comment: string) => {
    setToolTransfer({
      ...toolTransfer,
      comentarioEnvio: comment,
    });
  };

  const handleRemoveComment = () => {
    setToolTransfer({
      ...toolTransfer,
      comentarioEnvio: null,
    });
  };

  const handleSendTransfer = () => {
    const formattedTools = shipmentTools.map((tool) => ({
      invetarioSucursalId: tool.id,
      cantidad: tool.quantityToSend,
      comentarioEnvio: tool.comment,
      archivosAdjuntos: tool.gallery,
    }));

    console.log({
      ...toolTransfer,
      listDetalleTraslado: formattedTools,
    });
  };

  const handleSignature = (signature: string | null) => {
    setToolTransfer({
      ...toolTransfer,
      firmaEnvio: signature,
    });
  };

  const handleSaveImages = (images: string[]) => {
    setToolTransfer({
      ...toolTransfer,
      archivosAdjuntos: images,
    });
  };

  useEffect(() => {
    setToolTransfer({
      ...toolTransfer,
      sucursalOrigenId: sourceBranchId ?? '',
      sucursalDestinoId: destinationBranchId,
      usuarioIdEnvia: userId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceBranchId, destinationBranchId]);

  return (
    <div className="flex justify-between">
      <Comment
        comment={toolTransfer.comentarioEnvio}
        handleSaveComment={handleSaveComment}
        handleRemoveComment={handleRemoveComment}
      />
      <Images
        savedImages={toolTransfer.archivosAdjuntos}
        handleSaveImages={(images) => handleSaveImages(images)}
        className="h-[36px]"
        showTitle
      />
      <Signature
        savedSignature={toolTransfer.firmaEnvio}
        handleSignature={handleSignature}
      />
      <Button onClick={handleSendTransfer}>
        <Send className="w-4 h-4 mr-2" />
        Enviar
      </Button>
    </div>
  );
};
