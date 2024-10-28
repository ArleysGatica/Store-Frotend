import Images from '../ToolShipment/photo';
import Comment from '../ToolShipment/comment';
import Signature from '../ToolShipment/signature';
import { Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export const PendingProductsActions = () => {
  const handleSaveComment = (comment: string) => {};

  const handleRemoveComment = () => {};

  const handleSendTransfer = async () => {};

  const handleSignature = (signature: string | null) => {};

  const handleSaveImages = (images: string[]) => {};

  return (
    <div className="flex justify-between mt-6">
      <Comment
        comment={''}
        handleSaveComment={handleSaveComment}
        handleRemoveComment={handleRemoveComment}
      />
      <Images
        savedImages={[]}
        handleSaveImages={(images) => handleSaveImages(images)}
        className="h-[36px]"
        showTitle
      />
      <Signature savedSignature={''} handleSignature={handleSignature} />
      <Button disabled={false} onClick={handleSendTransfer}>
        <ArrowDown />
        Recibir
      </Button>
      <Toaster richColors position="bottom-right" />
    </div>
  );
};
