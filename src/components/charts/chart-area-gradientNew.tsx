// import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ArrowUp } from 'lucide-react';

const SalesPerformanceGraph = () => {
  const thisMonthData = [1.5, 2.5, 2.5, 3.7, 2.6, 4.8, 2.9, 3.6, 3.2, 5.8];
  const lastMonthData = [2.4, 2.2, 1.9, 2.0, 3.5, 3.1, 3.4, 4.2, 2.5, 3.6];
  const labels = ['09', '10', '11', '12', '13', '14', '15'];
  const maxValue = 6.0;

  const scaleDataPoint = (value:any) => {
    const graphHeight = 120;
    return graphHeight - (value / maxValue) * graphHeight;
  };

  const generatePath = (data:any) => {
    return `M ${data.map((point:any, index:any) => `${index * 40 + 30},${scaleDataPoint(point)}`).join(' L ')}`;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium text-gray-700">Total Quantity Sold</CardTitle>
        <HelpCircle className="h-5 w-5 text-gray-400" />
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="flex items-baseline space-x-2">
          <h2 className="text-5xl font-bold text-gray-900">125.49</h2>
          <div className="flex items-center text-emerald-600">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span className="text-xl font-medium">2.4%</span>
          </div>
        </div>
        
        <p className="text-gray-500 mt-1">vs 119.69 last month</p>
        
        <div className="mt-6 relative h-40">
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>6.0</span>
            <span>4.5</span>
            <span>3.0</span>
            <span>1.5</span>
          </div>
          
          <div className="ml-8 h-full">
            <div className="absolute left-8 right-0 h-full flex flex-col justify-between">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="border-t border-gray-200 w-full h-0"></div>
              ))}
            </div>
            
            <svg className="absolute left-8 top-0 w-full h-full overflow-visible">
              <path 
                d={`${generatePath(thisMonthData)} L ${(thisMonthData.length - 1) * 40 + 30},${scaleDataPoint(0)} L 30,${scaleDataPoint(0)} Z`}
                fill="rgba(16, 185, 129, 0.1)"
              />
              <path
                d={generatePath(thisMonthData)}
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />
              <path
                d={generatePath(lastMonthData)}
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="4"
                fill="none"
              />
            </svg>
            
            <div className="absolute left-8 right-0 bottom-0 flex justify-between mt-2 text-xs text-gray-500">
              {labels.map((label, index) => (
                <div key={index} className="flex-1 text-center">{label}</div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-8 mt-4 text-sm text-gray-500">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-600 mr-2"></div>
            <span>This Month</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span>Last Month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPerformanceGraph;
