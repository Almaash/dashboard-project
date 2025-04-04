import  Sidebar  from "@/components/sidebar";
import { CommerceHeader } from "@/components/commerce-header";
import MetricsCards from "./metrics-cards";
import SkuTable from "./sku-table";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [skuData, setSkuData] = useState<any>(null);
  const [cityLevelData, setCityLevelData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [cityData, setCityData] = useState<any>(null);

  useEffect(() => {
      const fetchConfig = async () => {
        try {
          const response = await axios.get('/data/blinkit/skudata.json'); 
          setSkuData(response.data);
        } catch (error) {
          console.error('Error loading JSON:', error);
        }
      };
      fetchConfig();
    }, []);

    useEffect(() => {
      const fetchConfig = async () => {
        try {
          const response = await axios.get('/data/blinkit/cityLevelData.json'); 
          setCityLevelData(response.data);
        } catch (error) {
          console.error('Error loading JSON:', error);
        }
      };
      fetchConfig();
    }, []);
  
    useEffect(() => {
      const fetchConfig = async () => {
        try {
          const response = await axios.get('/data/blinkit/chartData.json'); 
          setChartData(response.data);
        } catch (error) {
          console.error('Error loading JSON:', error);
        }
      };
      fetchConfig();
    }, []);

    useEffect(() => {
      const fetchConfig = async () => {
        try {
          const response = await axios.get('/data/blinkit/cityData.json'); 
          setCityData(response.data);
        } catch (error) {
          console.error('Error loading JSON:', error);
        }
      };
      fetchConfig();
    }, []);

    

   
  return (
    <div className="flex h-screen w-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-y-auto ">
        <div className="w-full h-full p-4">
          <div className=" border rounded-t-lg flex-col bg-[#fafafa]">
            <CommerceHeader />

            <MetricsCards chartData={chartData} cityData={cityData}/>
            <SkuTable skuStats={skuData} heading={"SKU"} />
            <SkuTable skuStats={cityLevelData} heading={"City"} />
          </div>
        </div>
      </div>
    </div>
  );
}
