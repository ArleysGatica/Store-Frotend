import { Button } from '@/components/ui/button';
import Signature from './signature';
import Comment from './comment';
import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import Images from './photo';
import {
  ITransferDetails,
  IToolTransferProps,
} from '@/interfaces/transferInterfaces';
import {
  createProductTransfer,
  updateStatus,
} from '@/app/slices/transferSlice';
import { store } from '@/app/store';
import { Toaster, toast } from 'sonner';
import { useAppSelector } from '@/app/hooks';
import { isValidTransfer } from '@/shared/helpers/transferHelper';

export const ToolTransfer = ({
  destinationBranchId,
  sourceBranchId,
  shipmentTools,
  userId,
  setShipmentTools,
}: IToolTransferProps) => {
  const transferStatus = useAppSelector((state) => state.transfer.status);
  const [sending, setSending] = useState(false);
  const [toolTransfer, setToolTransfer] = useState<ITransferDetails>({
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

  const handleSendTransfer = async () => {
    setSending(true);

    const validTransfer = isValidTransfer(toolTransfer, shipmentTools.length);
    if (!validTransfer) return setSending(false);

    const formattedTools = shipmentTools.map((tool) => ({
      inventarioSucursalId: tool.inventarioSucursalId,
      cantidad: tool.quantityToSend,
      comentarioEnvio: tool.comment,
      archivosAdjuntos: tool.gallery,
    }));

    const request = store
      .dispatch(
        createProductTransfer({
          ...toolTransfer,
          listDetalleTraslado: formattedTools,
        })
      )
      .unwrap();

    toast.promise(request, {
      loading: 'Enviando...',
      success: '¡Transferencia enviada!',
      error: (err) => `Error al enviar transferencia: ${err}`,
    });

    if (transferStatus === 'succeeded') {
      setShipmentTools([]);
      setToolTransfer({
        ...toolTransfer,
        comentarioEnvio: null,
        firmaEnvio: '',
        archivosAdjuntos: [],
      });
    }

    store.dispatch(updateStatus('idle'));
    setSending(false);
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
      <Button disabled={sending} onClick={handleSendTransfer}>
        <Send className="w-4 h-4 mr-2" />
        Enviar
      </Button>
      <Toaster richColors position="bottom-right" />
    </div>
  );
};
