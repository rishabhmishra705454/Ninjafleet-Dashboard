"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "MMM d, yyyy h:mm a");
};

// This type defines the structure of the machinery data.
export type Machinery = {
  id: string;
  providerId: string;
  machineryName: string;
  category: string;
  model?: string;
  condition: "New" | "Used" | "Needs Maintenance";
  fuelType?: string;
  pricing: number;
  isActive: boolean;
  availabilityStart: string;
  availabilityEnd: string;
  latitude: number;
  longitude: number;
  images?: string[]; // Array of image URLs
  insuranceStatus: boolean;
};

export const columns: ColumnDef<Machinery>[] = [
  {
    accessorKey: "machineryName",
    header: "Machinery Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  //   {
  //     accessorKey: "condition",
  //     header: "Condition",
  //   },
  //   {
  //     accessorKey: "fuelType",
  //     header: "Fuel Type",
  //   },
  {
    accessorKey: "pricing",
    header: () => <div>Pricing (per hour)</div>,
    cell: ({ row }) => {
      const pricing = parseFloat(row.getValue("pricing"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(pricing);

      return <div>{formatted}</div>;
    },
  },

  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => (row.original.isActive ? "Yes" : "No"),
  },
  {
    accessorKey: "availabilityStart",
    header: "Available From",
    cell: ({ row }) => formatDate(row.original.availabilityStart),
  },
  {
    accessorKey: "availabilityEnd",
    header: "Available Until",
    cell: ({ row }) => formatDate(row.original.availabilityEnd),
  },
  //   {
  //     accessorKey: "insuranceStatus",
  //     header: "Insurance Status",
  //     cell: ({ row }) => (row.original.insuranceStatus ? "Insured" : "Not Insured"),
  //   },

  {
    id: "actions",
    cell: ({ row }) => {
      
      const data = row.original
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`update/${data.id}`}> <DropdownMenuItem >
              Update
            </DropdownMenuItem> </Link>
            <DropdownMenuItem>
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 ">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
