import { Card, CardContent } from "@/components/ui/card";
import { BsQuestionCircle } from "react-icons/bs";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function TopCitiesDashboard({ cityData }: any) {
  return (
    <Card className="w-full max-w-md mx-auto">
      {/* Header section with title and info icon */}
      <div className="flex justify-between border-b px-5 pb-3">
        <p className="text-xl">Top Cities</p>
        <BsQuestionCircle className="text-xl" />
      </div>
      
      <CardContent className="pt-0">
        {/* Semi-circular Pie Chart */}
        <div className="relative flex justify-center mb-8">
          <div className="relative w-full h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cityData?.cities}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={110}
                  outerRadius={160}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {cityData?.cities?.map((entry: any, index: any) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Overlay with total values and change percentage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
              <div className="text-gray-500 text-sm">Total</div>
              <div className="text-3xl font-bold">₹{cityData?.totalValue}L</div>
              <div
                className={`flex items-center ${cityData?.totalChange >= 0 ? "text-green-600" : "text-red-500"}`}
              >
                {cityData?.totalChange >= 0 ? "↑" : "↓"} {Math.abs(cityData?.totalChange)}%
              </div>
            </div>
          </div>
        </div>
        
        {/* City breakdown list */}
        <div className="space-y-4">
          {cityData?.cities.map((city: any) => (
            <div key={city.name} className="flex items-center justify-between text-sm">
              {/* City name with color indicator */}
              <div className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: city.color }}
                ></div>
                <span className="text-gray-600">{city.name}</span>
              </div>
              
              {/* City value, percentage, and change indicator */}
              <div className="flex items-center space-x-4">
                <span className="font-semibold">₹{city.value}L</span>
                <span className="w-10 text-gray-500">{city.percentage}%</span>
                <span className={`${city.change >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {city.change >= 0 ? "↑" : "↓"} {Math.abs(city.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}