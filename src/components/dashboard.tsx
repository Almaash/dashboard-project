import Sidebar from "@/components/sidebar";
import { CommerceHeader } from "@/components/commerce-header";
import MetricsCards from "./metrics-cards";
import SkuTable from "./sku-table";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  // State variables for storing fetched data
  const [skuData, setSkuData] = useState<any>(null);
  const [cityLevelData, setCityLevelData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [cityData, setCityData] = useState<any>(null);

  // Fetch SKU data from JSON file
  useEffect(() => {
    const fetchSkuData = async () => {
      try {
        const response = await axios.get("/data/blinkit/skudata.json");
        setSkuData(response.data);
      } catch (error) {
        console.error("Error loading SKU data:", error);
      }
    };
    fetchSkuData();
  }, []);

  // Fetch city-level data from JSON file
  useEffect(() => {
    const fetchCityLevelData = async () => {
      try {
        const response = await axios.get("/data/blinkit/cityLevelData.json");
        setCityLevelData(response.data);
      } catch (error) {
        console.error("Error loading city-level data:", error);
      }
    };
    fetchCityLevelData();
  }, []);

  // Fetch chart data from JSON file
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get("/data/blinkit/chartData.json");
        setChartData(response.data);
      } catch (error) {
        console.error("Error loading chart data:", error);
      }
    };
    fetchChartData();
  }, []);

  // Fetch city data from JSON file
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get("/data/blinkit/cityData.json");
        setCityData(response.data);
      } catch (error) {
        console.error("Error loading city data:", error);
      }
    };
    fetchCityData();
  }, []);

  return (
    <div className="flex h-screen w-screen bg-background">
      {/* Sidebar navigation */}
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="w-full h-full p-4">
          {/* Main content area */}
          <div className="border rounded-t-lg flex-col bg-[#fafafa]">
            {/* Dashboard Header */}
            <CommerceHeader />
            
            {/* Metrics and chart data */}
            <MetricsCards chartData={chartData} cityData={cityData} />
            
            {/* SKU data table */}
            <SkuTable skuStats={skuData} heading={"SKU"} />
            
            {/* City-level data table */}
            <SkuTable skuStats={cityLevelData} heading={"City"} />
          </div>
        </div>
      </div>
    </div>
  );
}