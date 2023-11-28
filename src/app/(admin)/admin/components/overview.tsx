'use client';

import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

export function Overview({ data = [] }: { data: any[] }) {
  const filteredData = data.filter((val) => val.count > 0);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={filteredData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          interval={1}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="count" fill="#adfa1d" radius={[4, 4, 0, 0]}>
          <LabelList dataKey="count" position="center" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
