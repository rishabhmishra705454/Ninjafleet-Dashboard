"use client"

import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a label list"

// Updated chart data reflecting order statuses
const chartData = [
    { status: "pending", orders: 275, fill: "#ffcc00" }, // Yellow for Pending
    { status: "confirmed", orders: 200, fill: "#28a745" }, // Green for Confirmed
    { status: "inprogress", orders: 187, fill: "#007bff" }, // Blue for In Progress
    { status: "completed", orders: 173, fill: "#6f42c1" }, // Purple for Completed
    { status: "failed", orders: 90, fill: "#dc3545" }, // Red for Failed
  ];

// Chart configuration
const chartConfig = {
  orders: {
    label: "Orders",
  },
  pending: {
    label: "Pending",
    color: "#ffcc00",
  },
  confirmed: {
    label: "Confirmed",
    color: "#28a745",
  },
  inprogress: {
    label: "In Progress",
    color: "#007bff",
  },
  completed: {
    label: "Completed",
    color: "#6f42c1",
  },
  failed: {
    label: "Failed",
    color: "#dc3545",
  },
} satisfies ChartConfig

export default function BookingChart() {
  return (
    <Card className="w-[450px] flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Bookings of Machinery Details</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="max-w-full min-h-[350px]"
        >
          <PieChart >
            <ChartTooltip
              content={<ChartTooltipContent nameKey="orders" hideLabel />}
            />
            <Pie data={chartData} dataKey="orders" fill="var(--color-other)">
              <LabelList
                dataKey="status"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total bookings for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
