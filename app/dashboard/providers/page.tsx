// page.tsx
import { lusitana } from '@/app/ui/fonts';
import ProviderTable from '@/app/ui/providers/provider-table';
import { TableRowSkeleton } from '@/app/ui/skeletons';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Providers</h1>
      </div>
      <div className='mt-5'>
       
       <Suspense fallback={<TableRowSkeleton/>}>
       <ProviderTable/>
       </Suspense>
      </div>
    </div>
  );
}
