import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardContent } from "./ui/card";
import { AreaChartComp } from "./charts/chart-area-gradient";
// import { HalfDonutChart } from "./charts/chart-radial-stacked";
import blinnkit from "../assets/blinki.png";
import zepto from "../assets/zepto.png";
import instamart from "../assets/instamart.png";
import TopCitiesDashboard from "./charts/chart-radial-stackedNew";

const MetricsCards = ({chartData,cityData}:any) => {


  return (
    <div>
      <Tabs defaultValue="blinkit" className="space-y-4 ">
        <div className="bg-white pl-3 pb-3 border-b ">
          <TabsList className="bg-white border">
            <TabsTrigger value="blinkit">
              <img src={blinnkit} alt="blinnkit.png" width={20} className="rounded" />
              Blinkit
            </TabsTrigger>
            <TabsTrigger value="zeptos">
              <img src={zepto} alt="blinnkit.png" width={20} className="rounded" />
              Zepto
            </TabsTrigger>
            <TabsTrigger value="instamart">
              <img src={instamart} alt="blinnkit.png" width={20} className="rounded" />
              instamart
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="blinkit" className="space-y-4">
          <CardContent>
            <div className="flex gap-5 ">
              <AreaChartComp chartData={chartData?.data}/>
              <AreaChartComp chartData={chartData?.data2} />
              <TopCitiesDashboard cityData={cityData} />
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="zeptos" className="space-y-4">
          <CardContent>
          <div className="flex gap-5 ">
              <AreaChartComp chartData={chartData?.data}/>
              <AreaChartComp chartData={chartData?.data2} />
              <TopCitiesDashboard cityData={cityData} />
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="instamart" className="space-y-4">
          <CardContent>
          <div className="flex gap-5 ">
              <AreaChartComp chartData={chartData?.data}/>
              <AreaChartComp chartData={chartData?.data2} />
              <TopCitiesDashboard cityData={cityData} />
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetricsCards;
