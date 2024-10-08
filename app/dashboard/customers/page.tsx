import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { InvoicesTableSkeleton, TableRowSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import UserTable from '@/app/ui/customers/user-table';
import { Input } from "@/components/ui/input"


export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Customers</h1>
      </div>
      <div className='mt-5'>
      <Suspense fallback={<TableRowSkeleton/>}>
      <UserTable/>
      </Suspense>
      </div>
     
    </div>
  );
}