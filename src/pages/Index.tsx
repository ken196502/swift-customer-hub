
import { useState } from "react";
import { Search, File, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerFilters } from "@/components/CustomerFilters";
import { CustomerDetail } from "@/components/CustomerDetail";
import { NewCustomerDialog } from "@/components/NewCustomerDialog";

export interface Customer {
  id: number;
  customerNumber: string;
  groupName: string;
  nameEn: string;
  shortNameEn: string;
  fullNameEn: string;
  shortNameCn: string;
  fullNameCn: string;
  type: string;
  isListed: boolean;
  stockCode: string;
  city: string;
  idType: string;
  idNumber: string;
  shareholders: string;
  actualController: string;
  registeredCapital: string;
  establishDate: string;
  registeredAddress: string;
  legalRepresentative: string;
  riskLevel: string;
  entryDate: string;
  activeStatus: string;
  products: string[];
  tags: string[];
}

// Updated mock data
const customers: Customer[] = [
  {
    id: 1,
    customerNumber: "C20240001",
    groupName: "小米集团",
    nameEn: "Xiaomi Auto",
    shortNameEn: "Xiaomi Auto",
    fullNameEn: "Xiaomi Automobile Co., Ltd.",
    shortNameCn: "小米汽车",
    fullNameCn: "小米汽车有限责任公司",
    type: "公司户",
    isListed: true,
    stockCode: "1810.HK",
    city: "北京",
    idType: "统一社会信用代码",
    idNumber: "91110000XXXXX",
    shareholders: "雷军,小米科技",
    actualController: "雷军",
    registeredCapital: "100亿元",
    establishDate: "2021-09-01",
    registeredAddress: "北京市海淀区清河中街68号",
    legalRepresentative: "雷军",
    riskLevel: "低",
    entryDate: "2019-10-01",
    activeStatus: "活跃",
    products: ["股票交易", "咨询", "债券交易", "IPO", "发债"],
    tags: ["零售经纪", "机构经纪", "跨资产", "DCM", "ECM"],
  }
];

export default function Index() {
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);

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
          <Button 
            variant="default" 
            size="sm" 
            className="bg-green-500 hover:bg-green-600"
            onClick={() => setShowNewCustomerDialog(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            新建
          </Button>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>客户号</TableHead>
                <TableHead>客户名称</TableHead>
                <TableHead>客户类型</TableHead>
                <TableHead>所属集团</TableHead>
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
                  <TableCell>{customer.customerNumber}</TableCell>
                  <TableCell>
                    <div className="font-medium">{customer.shortNameCn}</div>
                    <div className="text-sm text-gray-500">{customer.shortNameEn}</div>
                  </TableCell>
                  <TableCell>{customer.type}</TableCell>
                  <TableCell>{customer.groupName}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.products.map((product, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className={
                            product === "股票交易"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : product === "咨询"
                                ? "bg-pink-100 text-pink-800 hover:bg-pink-100"
                                : product === "债券交易"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : product === "IPO"
                                    ? "bg-cyan-100 text-cyan-800 hover:bg-cyan-100"
                                    : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                          }
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
                          className={
                            tag === "零售经纪"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : tag === "机构经纪"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : tag === "跨资产"
                                  ? "bg-cyan-100 text-cyan-800 hover:bg-cyan-100"
                                  : tag === "DCM"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                          }
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
      <NewCustomerDialog 
        open={showNewCustomerDialog} 
        onOpenChange={setShowNewCustomerDialog} 
      />
    </div>
  );
}
