import { useState } from 'react';
import { Trash2, Pencil, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format, isWithinInterval } from 'date-fns';
import { cn } from '@/lib/utils';

interface Discount {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  applicationType: 'product' | 'group';
  applicationTarget: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  code: string;
  minPurchaseAmount?: number;
  minQuantity?: number;
}

// Dummy data for products and groups
const products = ['Product A', 'Product B', 'Product C'];
const groups = ['Group X', 'Group Y', 'Group Z'];

export default function DiscountManager() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [applicationType, setApplicationType] = useState<'product' | 'group'>(
    'product'
  );
  const [applicationTarget, setApplicationTarget] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>(
    'percentage'
  );
  const [value, setValue] = useState('');
  const [code, setCode] = useState('');
  const [minPurchaseAmount, setMinPurchaseAmount] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New state for filters
  const [filterType, setFilterType] = useState<'all' | 'product' | 'group'>(
    'all'
  );
  const [filterDiscountType, setFilterDiscountType] = useState<
    'all' | 'percentage' | 'fixed'
  >('all');
  const [filterStartDate, setFilterStartDate] = useState<Date | undefined>(
    undefined
  );
  const [filterEndDate, setFilterEndDate] = useState<Date | undefined>(
    undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    if (editingId !== null) {
      setDiscounts(
        discounts.map((discount) =>
          discount.id === editingId
            ? {
                ...discount,
                name,
                startDate,
                endDate,
                applicationType,
                applicationTarget,
                discountType,
                value: parseFloat(value),
                code,
                minPurchaseAmount: minPurchaseAmount
                  ? parseFloat(minPurchaseAmount)
                  : undefined,
                minQuantity: minQuantity
                  ? parseInt(minQuantity, 10)
                  : undefined,
              }
            : discount
        )
      );
      setEditingId(null);
    } else {
      const newDiscount: Discount = {
        id: Date.now(),
        name,
        startDate,
        endDate,
        applicationType,
        applicationTarget,
        discountType,
        value: parseFloat(value),
        code,
        minPurchaseAmount: minPurchaseAmount
          ? parseFloat(minPurchaseAmount)
          : undefined,
        minQuantity: minQuantity ? parseInt(minQuantity, 10) : undefined,
      };
      setDiscounts([...discounts, newDiscount]);
    }
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setName('');
    setStartDate(new Date());
    setEndDate(new Date());
    setApplicationType('product');
    setApplicationTarget('');
    setDiscountType('percentage');
    setValue('');
    setCode('');
    setMinPurchaseAmount('');
    setMinQuantity('');
  };

  const handleEdit = (discount: Discount) => {
    setName(discount.name);
    setStartDate(discount.startDate);
    setEndDate(discount.endDate);
    setApplicationType(discount.applicationType);
    setApplicationTarget(discount.applicationTarget);
    setDiscountType(discount.discountType);
    setValue(discount.value.toString());
    setCode(discount.code);
    setMinPurchaseAmount(discount.minPurchaseAmount?.toString() || '');
    setMinQuantity(discount.minQuantity?.toString() || '');
    setEditingId(discount.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDiscounts(discounts.filter((discount) => discount.id !== id));
  };

  const filteredDiscounts = discounts.filter((discount) => {
    const typeMatch =
      filterType === 'all' || discount.applicationType === filterType;
    const discountTypeMatch =
      filterDiscountType === 'all' ||
      discount.discountType === filterDiscountType;
    const dateMatch =
      !filterStartDate ||
      !filterEndDate ||
      isWithinInterval(discount.startDate, {
        start: filterStartDate,
        end: filterEndDate,
      }) ||
      isWithinInterval(discount.endDate, {
        start: filterStartDate,
        end: filterEndDate,
      });
    return typeMatch && discountTypeMatch && dateMatch;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Discount Manager</h1>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Add New Discount
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingId !== null ? 'Edit Discount' : 'Add New Discount'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Discount Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !startDate && 'text-muted-foreground'
                      )}
                    >
                      {startDate ? (
                        format(startDate, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !endDate && 'text-muted-foreground'
                      )}
                    >
                      {endDate ? (
                        format(endDate, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <Label htmlFor="applicationType">Application Type</Label>
              <Select
                value={applicationType}
                onValueChange={(value: 'product' | 'group') =>
                  setApplicationType(value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="applicationTarget">
                {applicationType === 'product' ? 'Product' : 'Group'}
              </Label>
              <Select
                value={applicationTarget}
                onValueChange={setApplicationTarget}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(applicationType === 'product' ? products : groups).map(
                    (item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="discountType">Discount Type</Label>
              <Select
                value={discountType}
                onValueChange={(value: 'percentage' | 'fixed') =>
                  setDiscountType(value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="value">
                Discount Value {discountType === 'percentage' ? '(%)' : '($)'}
              </Label>
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                min="0"
                max={discountType === 'percentage' ? '100' : undefined}
              />
            </div>
            <div>
              <Label htmlFor="code">Discount Code</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="minPurchaseAmount">
                Minimum Purchase Amount ($)
              </Label>
              <Input
                id="minPurchaseAmount"
                type="number"
                value={minPurchaseAmount}
                onChange={(e) => setMinPurchaseAmount(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="minQuantity">Minimum Quantity</Label>
              <Input
                id="minQuantity"
                type="number"
                value={minQuantity}
                onChange={(e) => setMinQuantity(e.target.value)}
                min="0"
              />
            </div>
            <Button type="submit">
              {editingId !== null ? 'Update Discount' : 'Add Discount'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <Label htmlFor="filterType">Filter by Type</Label>
          <Select
            value={filterType}
            onValueChange={(value: 'all' | 'product' | 'group') =>
              setFilterType(value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="group">Group</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="filterDiscountType">Filter by Discount Type</Label>
          <Select
            value={filterDiscountType}
            onValueChange={(value: 'all' | 'percentage' | 'fixed') =>
              setFilterDiscountType(value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="fixed">Fixed Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Filter Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !filterStartDate && 'text-muted-foreground'
                )}
              >
                {filterStartDate ? (
                  format(filterStartDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filterStartDate}
                onSelect={setFilterStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Filter End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !filterEndDate && 'text-muted-foreground'
                )}
              >
                {filterEndDate ? (
                  format(filterEndDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filterEndDate}
                onSelect={setFilterEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date Range</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Min. Purchase</TableHead>
            <TableHead>Min. Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDiscounts.map((discount) => (
            <TableRow key={discount.id}>
              <TableCell>{discount.name}</TableCell>
              <TableCell>{`${format(discount.startDate, 'PP')} - ${format(discount.endDate, 'PP')}`}</TableCell>
              <TableCell>{discount.applicationType}</TableCell>
              <TableCell>{discount.applicationTarget}</TableCell>
              <TableCell>
                {discount.discountType === 'percentage'
                  ? `${discount.value}%`
                  : `$${discount.value.toFixed(2)}`}
              </TableCell>
              <TableCell>{discount.code}</TableCell>
              <TableCell>
                {discount.minPurchaseAmount
                  ? `$${discount.minPurchaseAmount.toFixed(2)}`
                  : 'N/A'}
              </TableCell>
              <TableCell>{discount.minQuantity || 'N/A'}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(discount)}
                  className="mr-2"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(discount.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
