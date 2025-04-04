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
import { ChevronDown, LineChart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SKUDashboard({ skuStats, heading }: any) {
  // State to manage selected SKUs
  const [selectedSKUs, setSelectedSKUs] = useState<string[]>([
    "protein-bar",
    "choco-bar",
  ]);

  // Toggle SKU selection
  const handleCheckboxChange = (id: string) => {
    setSelectedSKUs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full p-5">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-2xl font-semibold">{heading} level data</p>
          <p className="text-sm text-muted-foreground">
            Analytics for all your {heading}
          </p>
        </div>
        {/* Filter Dropdown */}
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

      {/* Data Table */}
      <div className="border rounded-md bg-white shadow-md">
        <Table>
          <TableHeader>
            {/* Table Header Row */}
            <TableRow>
              <TableHead className="w-[250px] border-0">
                <div className="flex items-center">
                  <LineChart className="w-4 h-4 mr-2" />
                  SKU Name
                </div>
              </TableHead>
              <TableHead colSpan={3} className="text-center border-l">
                Availability
              </TableHead>
              <TableHead colSpan={4} className="text-center border-l">
                Visibility
              </TableHead>
            </TableRow>
            {/* Column Headers */}
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="text-center border-l">
                Sales <ChevronDown className="ml-1 h-4 w-4" />
              </TableHead>
              <TableHead>
                Out of Stock <ChevronDown className="ml-1 h-4 w-4" />
              </TableHead>
              <TableHead>
                Total Inventory <ChevronDown className="ml-1 h-4 w-4" />
              </TableHead>
              <TableHead className="text-center border-l">
                Average Rank <ChevronDown className="ml-1 h-4 w-4" />
              </TableHead>
              <TableHead>
                Est. Traffic <ChevronDown className="ml-1 h-4 w-4" />
              </TableHead>
              <TableHead>
                Est. Impressions <ChevronDown className="ml-1 h-4 w-4" />
              </TableHead>
              <TableHead>
                CTR <ChevronDown className="ml-1 h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Table Rows */}
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
                  <TableCell className="text-center border-l">{sku.sales}</TableCell>
                  <TableCell>{sku.outOfStock}</TableCell>
                  <TableCell>{sku.totalInventory}</TableCell>
                  <TableCell className="border-l">{sku.averageRank}</TableCell>
                  <TableCell>{sku.estTraffic}</TableCell>
                  <TableCell>{sku.estImpressions}</TableCell>
                  <TableCell>{sku.ctr}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          {/* Totals Row */}
          <TableRow className="font-semibold border-t rounded-md">
            <TableCell>Total</TableCell>
            <TableCell className="border-l">{skuStats?.totals.sales}</TableCell>
            <TableCell>{skuStats?.totals.outOfStock}</TableCell>
            <TableCell>{skuStats?.totals.totalInventory}</TableCell>
            <TableCell className="border-l">{skuStats?.totals.averageRank}</TableCell>
            <TableCell>{skuStats?.totals.estTraffic}</TableCell>
            <TableCell>{skuStats?.totals.estImpressions}</TableCell>
            <TableCell>{skuStats?.totals.ctr}</TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
  );
}