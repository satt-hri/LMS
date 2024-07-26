"use client";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
} from "recharts";

type Props = {
  data: {
    name: string;
    total: number;
  }[];
};
export const Chart = ({ data }: Props) => {
  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={350}>
        <BarChart width={150} height={40} data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar dataKey="total" fill="#0369a1" radius={[4,4,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
