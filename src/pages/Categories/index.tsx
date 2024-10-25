import Categories from '@/ui/components/Categories';
import { Toaster } from 'sonner';

export const PagesCategories = () => {
  return (
    <div>
      <Categories />
      <Toaster richColors position="bottom-right" />
    </div>
  );
};
