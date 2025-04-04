

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowUpDown, LineChart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SKUDashboard({ skuStats, heading }: any) {
  const [selectedSKUs, setSelectedSKUs] = useState<string[]>([
    "protein-bar",
    "choco-bar",
  ]);

  const handleCheckboxChange = (id: string) => {
    setSelectedSKUs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-2xl font-semibold">{heading} level data</p>
          <p className="text-sm text-muted-foreground">
            Analytics for all your {heading}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-[#027056] text-white hover:text-white hover:bg-emerald-800"
            >
              Filter(s) (1) <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All SKUs</DropdownMenuItem>
            <DropdownMenuItem>Active SKUs</DropdownMenuItem>
            <DropdownMenuItem>Inactive SKUs</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-md bg-white shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px] border-0">
                <div className="flex items-center">
                <LineChart className="w-4 h-4 mr-2" />
                SKU Name
                </div>
              </TableHead>
              <TableHead
                colSpan={3}
                className="text-center border-l-[1px] border-gray-300"
              >
                Availability
              </TableHead>
              <TableHead
                colSpan={4}
                className="text-center border-l-[1px] border-gray-300"
              >
                Visibility
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead></TableHead>
              <TableHead                 className="text-center border-l-[1px] border-gray-300"
              >
                <div className="flex items-center">
                  Sales <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Out of Stock <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Total Inventory <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead                 className="text-center border-l-[1px] border-gray-300"
              >
                <div className="flex items-center">
                  Average Rank <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Est. Traffic <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Est. Impressions <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  CTR <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skuStats?.data.map((sku: any) => {
              const isChecked = selectedSKUs.includes(sku.id);
              return (
                <TableRow key={sku.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Checkbox
                        id={sku.id}
                        checked={isChecked}
                        onCheckedChange={() => handleCheckboxChange(sku.id)}
                        className="mr-2"
                      />
                      <label htmlFor={sku.id} className="cursor-pointer">
                        {sku.name}
                      </label>
                    </div>
                  </TableCell>
                  <TableCell                 className="text-center border-l-[1px] border-gray-300"
                  >
                    {sku.sales}
                    {isChecked && sku.change && (
                      <div className="flex items-center text-green-500 text-xs mt-1">
                        ↑ {sku.change}%
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div
                      className={
                        sku.outOfStockPercent > 5 ? "text-amber-500" : ""
                      }
                    >
                      {sku.outOfStock}
                    </div>
                    {isChecked && sku.change && (
                      <div className="flex items-center text-green-500 text-xs mt-1">
                        ↑ {sku.change}%
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {sku.totalInventory}
                    {sku.id === "choco-bar" && isChecked && sku.change && (
                      <div className="text-xs mt-1">-</div>
                    )}
                  </TableCell>
                  <TableCell className="border-l-[1px]">
                    {sku.averageRank}
                    {isChecked && sku.change && (
                      <div className="flex items-center text-green-500 text-xs mt-1">
                        ↑ {sku.change}%
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {sku.estTraffic}
                    {isChecked && sku.change && (
                      <div className="flex items-center text-green-500 text-xs mt-1">
                        ↑ {sku.change}%
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {sku.estImpressions}
                    {isChecked && sku.change && (
                      <div className="flex items-center text-green-500 text-xs mt-1">
                        ↑ {sku.change}%
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {sku.ctr}
                    {isChecked && sku.id === "choco-bar" && (
                      <div className="flex items-center text-red-500 text-xs mt-1">
                        ↓ {sku.change}%
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableRow className="font-semibold border-t rounded-md">
            <TableCell>Total</TableCell>
            <TableCell className="border-l-[1px]">
              {skuStats?.totals.sales}
            </TableCell>
            <TableCell>{skuStats?.totals.outOfStock}</TableCell>
            <TableCell>{skuStats?.totals.totalInventory}</TableCell>
            <TableCell className="border-l-[1px]">
              {skuStats?.totals.averageRank}
            </TableCell>
            <TableCell>{skuStats?.totals.estTraffic}</TableCell>
            <TableCell>{skuStats?.totals.estImpressions}</TableCell>
            <TableCell>{skuStats?.totals.ctr}</TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
  );
}
