import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SendHorizonal } from 'lucide-react';
import CustomSelect from './customSelect';
import { Badge } from '@/components/ui/badge';
import { Branch } from '@/app/slices/branchSlice';
import { ITablaBranch } from '@/interfaces/branchInterfaces';

export interface IConsolidatedShipment {
  selectedBranch:
    | (Branch & {
        products: ITablaBranch[];
      })
    | null;
  setDestinationBranch: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ConsolidatedShipment = ({
  selectedBranch,
  setDestinationBranch,
}: IConsolidatedShipment) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consolidado de envío</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Badge
            variant="outline"
            className="flex items-center justify-center text-base font-semibold w-[250px] max-w-[250px] h-[68px] whitespace-nowrap overflow-hidden text-ellipsis shadow-md"
          >
            {selectedBranch?.nombre ?? ''}
          </Badge>
          <SendHorizonal />
          <CustomSelect
            sourceBranchId={selectedBranch?._id ?? ''}
            setDestinationBranch={setDestinationBranch}
          />
        </div>
      </CardContent>
    </Card>
  );
};
