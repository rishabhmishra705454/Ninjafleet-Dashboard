import { ColumnDef } from "@tanstack/react-table"

// Define the shape of the booking data
export type Booking = {
  id: number
  userId: number
  machineryId: number
  providerId: number
  landCoordinates: string // JSON string
  landArea: number
  startDate: string
  endDate: string
  status: string
  totalAmount: string
  createdAt: string
  updatedAt: string
}

// Define columns for the booking table
export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "machineryId",
    header: "Machinery ID",
  },
  {
    accessorKey: "providerId",
    header: "Provider ID",
  },
  {
    accessorKey: "landArea",
    header: "Land Area (hectares)",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    
  },
  {
    accessorKey: "endDate",
    header: "End Date",
   
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
]
