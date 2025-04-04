import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { BsQuestionCircle } from "react-icons/bs";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    month: "january",
    newDelhi: 26.5,
    mumbai: 36.4,
    westBengal: 12.2,
    others: 24.3,
  },
];

const chartConfig = {
  newDelhi: {
    label: "New Delhi",
    color: "#6c4fed",
  },
  mumbai: {
    label: "Mumbai",
    color: "#ea6153",
  },
  westBengal: {
    label: "West Bengal",
    color: "#f7c245",
  },
  others: {
    label: "Others",
    color: "#d9d9d9",
  },
} satisfies ChartConfig;

export function HalfDonutChart() {
  const totalVisitors =
    chartData[0].newDelhi +
    chartData[0].mumbai +
    chartData[0].westBengal +
    chartData[0].others;

    const data = [
        { name: "New Delhi", value: "₹26.5L", percentage: "35%", change: "1.2%", color: "green", isIncrease: true },
        { name: "Mumbai", value: "₹36.4L", percentage: "23%", change: "3.3%", color: "red", isIncrease: false },
        { name: "West Bengal", value: "₹12.2L", percentage: "21%", change: "2.3%", color: "yellow", isIncrease: false },
        { name: "Others", value: "₹24.3L", percentage: "9%", change: "1.09%", color: "gray", isIncrease: true },
      ];

  return (
    <Card className="flex flex-col relative">
      <div className="flex justify-between border-b px-5 pb-3">
        <div className="">
          <p className="text-xl">Top Cities</p>
        </div>
        <div className="text-right flex justify-center items-center">
          <BsQuestionCircle className="text-xl" />
        </div>
      </div>
      <div className="flex flex-1 items-center pb-18 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-muted-foreground text-lg"
                        >
                          Total
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 30}
                          className="fill-muted-foreground text-lg"
                        >
                          <ArrowUpRight size={14} /> 2.22%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 10}
                          className="fill-foreground text-2xl font-bold"
                        >
                          ₹{totalVisitors.toLocaleString()}L
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="newDelhi"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-newDelhi)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mumbai"
              fill="var(--color-mumbai)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="westBengal"
              fill="var(--color-westBengal)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="others"
              fill="var(--color-others)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </div>
      <div className="w-full max-w-md mx-auto px-4 absolute bottom-0">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b last:border-none">
          <div className="flex items-center space-x-2">
            {/* <span className={`w-3 h-3 rounded-full ${item.color}`}></span> */}
            <div className={`w-2 h-2 bg-${item.color}-500 rounded-full`}></div>
            <span className="text-gray-700 font-medium">{item.name}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-black">{item.value}</span>
            <span className="bg-gray-100 px-2 py-1 text-xs rounded text-gray-600">{item.percentage}</span>
            <div className={`flex items-center ${item.isIncrease ? "text-green-500" : "text-red-500"}`}>
              {item.isIncrease ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span className="text-sm font-medium">{item.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    </Card>
  );
}
