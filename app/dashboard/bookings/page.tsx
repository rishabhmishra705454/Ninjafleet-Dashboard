"use client"
import { Suspense, useEffect, useState } from "react";
import { TableRowSkeleton } from "@/app/ui/skeletons";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { fetchBookings, Booking } from "@/app/api/booking";
import { Machinery } from "@/app/api/machinery";

export default async function Page() {

    const bookings: Booking[] = (await fetchBookings(1, 100)) || [];
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Bookings</h1>
      </div>
      <div className="">
        <Suspense fallback={<TableRowSkeleton/>}>
        <div className="container mx-auto py-10">
           
          <DataTable columns={columns} data={bookings ? bookings : []} /> 
          </div>
        </Suspense>
      </div>
    </div>
  );
}
