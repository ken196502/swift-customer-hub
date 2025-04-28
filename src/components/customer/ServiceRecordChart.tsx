
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export interface ServiceRecord {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface ServiceRecordChartProps {
  data: ServiceRecord[];
}

export function ServiceRecordChart({ data }: ServiceRecordChartProps) {
  const totalCount = data.reduce((sum, item) => sum + item.value, 0);
  
  // Custom Legend component to show percentage and value
  const CustomLegend = ({ payload }: any) => {
    if (!payload) return null;
    
    return (
      <div className="flex flex-col space-y-2">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm">{entry.value}</span>
            </div>
            <div className="flex space-x-6">
              <span className="text-sm">{entry.payload.percentage}%</span>
              <span className="text-sm">{entry.payload.value}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-medium"
            >
              触达次数
            </text>
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-bold"
            >
              {totalCount}
            </text>
            <text
              x="50%"
              y="70%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs text-green-600"
            >
              去年同比-12.34%
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <Legend content={<CustomLegend />} />
    </div>
  );
}
