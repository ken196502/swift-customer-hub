
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

  return (
    <div className="space-y-4">
      <div className="h-64">
        <div className="text-center font-medium mb-2">服务记录类型明细</div>
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
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center text-sm">
          总数量：<span className="font-bold text-lg">{totalCount}</span>
        </div>
      </div>

      {/* <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-sm">{item.name}</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">{item.percentage}%</div>
              <div className="text-sm">{item.value}</div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
