import LocationBasedBarChart from "./components/bar-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RadarChart from "./components/radar-chart";
import LineChartComponent from "./components/line-chart";
import LeaderBoard from "./components/leader-board";

export default async function Page() {

  return (
    <>
      <div className="mx-auto mb-10 grid w-full max-w-5xl gap-2">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-4 grid grid-cols-3 gap-4 ">
              <div>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="">Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">53</div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="">Volunteers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">960</div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="">Volunteer hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3840</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="col-span-2">
              <LocationBasedBarChart />
            </div>
            <div className="col-span-2">
              <RadarChart />
            </div>
            <div className="col-span-4">
              <LineChartComponent />
            </div>

              <div className="col-span-4">
              <LeaderBoard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
