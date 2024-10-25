import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppSelector } from '@/app/hooks';
import { Branch } from '@/app/slices/branchSlice';

export interface ICustomSelect {
  sourceBranchId: string;
  setDestinationBranch: React.Dispatch<React.SetStateAction<string | null>>;
}

const CustomSelect = ({
  setDestinationBranch,
  sourceBranchId,
}: ICustomSelect) => {
  const branches = useAppSelector((state) => state.branches.data);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Branch | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');

  const handleRemove = (id: string) => {
    const branch = id === selectedWarehouse?._id ? null : selectedWarehouse;
    setSelectedWarehouse(branch);
    setDestinationBranch(branch?._id ?? null);
  };

  const handleWarehouseSelect = (warehouse: Branch) => {
    setSelectedWarehouse(warehouse);
    setDestinationBranch(warehouse._id ?? null);
    setIsOpen(false);
  };

  const filteredWarehouses = branches.filter(
    (warehouse) =>
      warehouse.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      sourceBranchId !== warehouse._id
  );

  return (
    <div className="flex flex-col max-w-md px-4 py-1 bg-white border border-gray-[#e4e4e7] rounded-lg shadow-md">
      <div className="flex items-center justify-between w-[280px]">
        <div className="flex items-center justify-between gap-3">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <div className="flex items-center justify-center w-8 h-8 bg-green-700 rounded-full cursor-pointer">
                <span className="text-lg font-semibold text-white">
                  {selectedWarehouse?.nombre.charAt(0) ?? 'A'}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <input
                type="text"
                placeholder="Buscar bodega"
                className="w-full px-4 py-2 transition bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul className="branch__list">
                {filteredWarehouses.length > 0 ? (
                  filteredWarehouses.map((warehouse) => (
                    <li
                      key={warehouse._id}
                      className={cn(
                        'px-4 py-2 mt-2 cursor-pointer hover:bg-gray-100 rounded-md',
                        selectedWarehouse?._id === warehouse._id &&
                          'bg-gray-100 rounded-md'
                      )}
                      onClick={() => handleWarehouseSelect(warehouse)}
                    >
                      {warehouse.nombre}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">
                    No se encontraron bodegas
                  </li>
                )}
              </ul>
            </PopoverContent>
          </Popover>
          <div className="flex-grow">
            <p className="text-base font-semibold">
              {selectedWarehouse?.nombre ?? 'Nombre de bodega'}
            </p>
            <p className="text-sm text-gray-600">
              {selectedWarehouse?.direccion ?? 'Ubicación'}
            </p>
          </div>
        </div>
        <button
          onClick={() =>
            selectedWarehouse && handleRemove(selectedWarehouse._id!)
          }
          disabled={!selectedWarehouse}
        >
          <Trash className="text-red-500" size={20} />
        </button>
      </div>
    </div>
  );
};

export default CustomSelect;
