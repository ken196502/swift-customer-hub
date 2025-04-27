
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";

interface CustomerDetailProps {
  customer: {
    id: number;
    name: string;
    nameEn: string;
    type: string;
    company: string;
    products: string[];
    tags: string[];
    entryDate: string;
  };
}

export function CustomerDetail({ customer }: CustomerDetailProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{customer.name}</CardTitle>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          编辑
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-sm text-gray-500">中文名称：</div>
              <div className="col-span-2">{customer.name}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-sm text-gray-500">英文名称：</div>
              <div className="col-span-2">{customer.nameEn}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-sm text-gray-500">客户类型：</div>
              <div className="col-span-2">{customer.type}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-sm text-gray-500">法人公司：</div>
              <div className="col-span-2">{customer.company}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-sm text-gray-500">录入时间：</div>
              <div className="col-span-2">{customer.entryDate}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-sm text-gray-500">风险等级：</div>
              <div className="col-span-2">低</div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-sm text-gray-500">活跃状态：</div>
              <div className="col-span-2">活跃</div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-sm text-gray-500">所在地区：</div>
              <div className="col-span-2">北京</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
