import { LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CommerceHeader() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className=" pb-3 rounded-t-xl bg-white">
      <div className="flex justify-between items-center p-3 border-b ">
        <p>Quick Commerce</p>
        <div className="flex items-center gap-2">
          
          <div className="flex items-center gap-2 pr-2  border rounded-lg border-gray-300">
            {/* Chart Icon Button */}
            <button className="w-8 h-8 flex justify-center items-center text-green-900">
              <LineChart className="w-4 h-4" />
            </button>

            {/* Toggle Switch */}
            <button
              onClick={() => setEnabled(!enabled)}
              className={`w-8 h-5 flex items-center px-[3px] rounded-full transition-colors cursor-pointer ${
                enabled ? "bg-green-800" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full shadow-md transition-transform ${
                  enabled ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
            {/* <CalendarIcon className="h-3.5 w-3.5" /> */}
            <span>Aug 01, 2024 - Aug 03, 2024</span>
            {/* <ChevronDown className="h-3.5 w-3.5" /> */}
          </Button>
        </div>
      </div>
    </div>
  );
}
