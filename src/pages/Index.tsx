
import { useState } from "react";
import { Search, File, PlusCircle, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomerFilters } from "@/components/CustomerFilters";
import { CustomerDetail } from "@/components/CustomerDetail";

// 模拟数据
const customers = [
  {
    id: 1,
    name: "小米集团",
    nameEn: "Xiaomi",
    type: "公司户",
    company: "小米科技有限责任公司",
    products: ["新客签约", "续约签约"],
    tags: ["专属秘书"],
    entryDate: "2019-10-01",
  },
  {
    id: 2,
    name: "小米科技",
    nameEn: "Xiaomi Tech",
    type: "公司户",
    company: "小米科技有限责任公司",
    products: ["销售", "IPO", "私募"],
    tags: ["机构投资", "CRM", "ERM"],
    entryDate: "2017-10-01",
  },
  {
    id: 3,
    name: "腾讯集团",
    nameEn: "Tencent",
    type: "公司户",
    company: "腾讯科技有限公司",
    products: [],
    tags: [],
    entryDate: "",
  },
  {
    id: 4,
    name: "高盛",
    nameEn: "Goldman Sachs",
    type: "公司户",
    company: "高盛集团",
    products: [],
    tags: [],
    entryDate: "",
  },
]

export default function Index() {
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  // 如果选中了客户，显示客户详情
  if (selectedCustomer !== null) {
    const customer = customers.find((c) => c.id === selectedCustomer);
    if (customer) {
      return (
        <div className="container mx-auto py-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">客户详情</h1>
            <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
              返回列表
            </Button>
          </div>
          <CustomerDetail customer={customer} />
        </div>
      );
    }
  }

  // 默认显示客户列表
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">客户关系管理系统</h1>

      <div className="flex flex-col space-y-4">
        <CustomerFilters />

        <div className="flex flex-wrap gap-2">
          <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600">
            <Search className="h-4 w-4 mr-2" />
            查询
          </Button>
          <Button variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600">
            <File className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Button variant="default" size="sm" className="bg-green-500 hover:bg-green-600">
            <PlusCircle className="h-4 w-4 mr-2" />
            新建
          </Button>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox />
                </TableHead>
                <TableHead>客户名称</TableHead>
                <TableHead>客户类型</TableHead>
                <TableHead>法人公司</TableHead>
                <TableHead>提供产品</TableHead>
                <TableHead>标签</TableHead>
                <TableHead>录入时间</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedCustomer(customer.id)}
                >
                  <TableCell>
                    <Checkbox onClick={(e) => e.stopPropagation()} />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.nameEn}</div>
                  </TableCell>
                  <TableCell>{customer.type}</TableCell>
                  <TableCell>{customer.company}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.products.map((product, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                        >
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map((tag, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-purple-100 text-purple-800 hover:bg-purple-100"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{customer.entryDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
