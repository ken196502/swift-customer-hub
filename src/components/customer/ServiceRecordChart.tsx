
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

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
    <div className="grid grid-cols-2 gap-6">
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
              y="65%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs text-green-600"
            >
              去年同比-12.34%
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <Table>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.percentage}%</TableCell>
                <TableCell>{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
