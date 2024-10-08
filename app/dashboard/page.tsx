import { CardDashboard } from '@/app/ui/dashboard/cards';
import BookingChart from '../ui/dashboard/booking-charts';



 
export default async function Page() {
  return (
    <main>
      <h1 className={` mb-4 text-xl font-semibold md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardDashboard title="Total Farmers" value={100} type="farmers" />
        <CardDashboard title="Total Providers" value={100} type="providers" />
        <CardDashboard title="Total Machinery" value={100} type="machineries" />
        <CardDashboard
          title="Total Bookings"  
          value={100}
          type="bookings"
        />
      </div>
     
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

        <div className=' mt-4'>
        <BookingChart />
        </div>
        
      </div>
    </main>
  );
}