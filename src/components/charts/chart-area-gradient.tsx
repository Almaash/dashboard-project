"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdArrowUp } from "react-icons/io";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart configuration with labels and colors
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "green",
  },
  mobile: {
    label: "Mobile",
    color: "red",
  },
} satisfies ChartConfig;

export function AreaChartComp({ chartData }: any) {
  return (
    <Card>
      {/* Header Section with Title and Info Icon */}
      <div className="flex justify-between border-b px-5 pb-3">
        <p className="text-xl">Sales (MRP)</p>
        <BsQuestionCircle className="text-xl" />
      </div>
      
      {/* Sales Summary */}
      <CardHeader>
        <div className="flex justify-between items-center bg-white rounded-lg">
          <div>
            <p className="text-3xl font-bold">125.49</p>
          </div>
          <div className="flex flex-col justify-end items-end">
            <p className="font-bold text-green-600 flex items-center gap-1">
              <IoMdArrowUp /> 2.4%
            </p>
            <p className="text-gray-500 text-sm">vs 119.69 last month</p>
          </div>
        </div>
      </CardHeader>
      
      {/* Chart Content */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: -20, right: 12 }}
          >
            {/* Gradient Definitions for Areas */}
            <defs>
              <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            {/* Axes and Grid */}
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} tickCount={5} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            
            {/* Mobile Data Area */}
            <Area
              dataKey="mobile"
              type="linear"
              stroke="var(--color-mobile)"
              strokeDasharray="5 5"
              stackId="a"
              fill="none"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            
            {/* Desktop Data Area */}
            <Area
              dataKey="desktop"
              type="linear"
              fill="url(#colorDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      
      {/* Legend Section */}
      <div className="flex w-full items-start gap-2 text-sm border-t px-7 pt-5">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 font-medium leading-none">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>This month
          </div>
          <div className="flex items-center gap-2 font-medium leading-none">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>Last month
          </div>
        </div>
      </div>
    </Card>
  );
}