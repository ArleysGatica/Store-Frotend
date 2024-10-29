import Images from '../ToolShipment/photo';
import Comment from '../ToolShipment/comment';
import Signature from '../ToolShipment/signature';
import { Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { IUser } from '@/app/slices/login';

export interface ITransferDetails {
  fechaRecepcion: Date | null;
  comentarioRecepcion: string | null;
  firmaRecepcion: string | null;
  archivosAdjuntos: string[];
  usuarioIdRecibe: IUser | null;
}

export const PendingProductsActions = () => {
  const user = useAppSelector((state) => state.auth.signIn.user);
  const [toolReceiving, setToolReceiving] = useState<ITransferDetails>({
    fechaRecepcion: null,
    comentarioRecepcion: null,
    firmaRecepcion: '',
    archivosAdjuntos: [],
    usuarioIdRecibe: null,
  });

  const handleSaveComment = (comment: string) => {
    setToolReceiving({
      ...toolReceiving,
      comentarioRecepcion: comment,
    });
  };

  const handleRemoveComment = () => {
    setToolReceiving({
      ...toolReceiving,
      comentarioRecepcion: null,
    });
  };

  const handleReceiveTransfer = async () => {
    const formattedReceivingData = {
      ...toolReceiving,
      fechaRecepcion: new Date(),
      usuarioIdRecibe: user ?? '',
    };
    console.log(formattedReceivingData, 'toolReceiving');
  };

  const handleSignature = (signature: string | null) => {
    setToolReceiving({
      ...toolReceiving,
      firmaRecepcion: signature,
    });
  };

  const handleSaveImages = (images: string[]) => {
    setToolReceiving({
      ...toolReceiving,
      archivosAdjuntos: images,
    });
  };

  return (
    <div className="flex justify-between mt-6">
      <Comment
        comment={toolReceiving.comentarioRecepcion}
        handleSaveComment={handleSaveComment}
        handleRemoveComment={handleRemoveComment}
      />
      <Images
        savedImages={toolReceiving.archivosAdjuntos}
        handleSaveImages={(images) => handleSaveImages(images)}
        className="h-[36px]"
        showTitle
      />
      <Signature
        savedSignature={toolReceiving.firmaRecepcion}
        handleSignature={handleSignature}
      />
      <Button
        disabled={false}
        onClick={handleReceiveTransfer}
        className="uppercase"
      >
        <ArrowDown />
        Recibir
      </Button>
      <Toaster richColors position="bottom-right" />
    </div>
  );
};
