"use client";

import { RadialBar, RadialBarChart, LabelList } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "UK", volunteering: 410, fill: "var(--color-firefox)" },
  { browser: "US", volunteering: 260, fill: "var(--color-safari)" },
  { browser: "India", volunteering: 750, fill: "var(--color-chrome)" },
];

const chartConfig = {
  visitors: {
    label: "volunteering",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function RadarChartComponent() {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle> Location wise Volunteering</CardTitle>
        <CardDescription>Showing total Volunteers</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square mx-auto h-96"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="volunteering" background>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        */}
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          {/* January - June 2024 */}
          {/* Location wise Volunteering */}
        </div>
      </CardFooter>
    </Card>
  );
}
