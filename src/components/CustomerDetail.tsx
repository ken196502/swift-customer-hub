
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit } from "lucide-react";
import type { Customer } from "@/pages/Index";
import { BasicInformation } from "./customer/BasicInformation";
import { InteractionRecords } from "./customer/InteractionRecords";

interface CustomerDetailProps {
  customer: Customer;
}

const contactData = [
  { name: "投资服务", value: 5, percentage: 42, color: "#4f46e5" },
  { name: "销售沟通", value: 3, percentage: 25, color: "#f97316" },
  { name: "线上会议", value: 2, percentage: 16, color: "#10b981" },
  { name: "客服反馈", value: 1, percentage: 8, color: "#ef4444" },
  { name: "招待客户", value: 1, percentage: 8, color: "#f59e0b" },
];

const transactionData = [
  {
    id: 1,
    date: "2025-03-26",
    amount: -34000.0,
    type: "出差费用",
    purpose: "出差实访客户",
    department: "销售三部",
    person: "张三",
  },
  {
    id: 2,
    date: "2025-03-22",
    amount: 0.0,
    type: "电话沟通",
    purpose: "运营和销售沟通",
    department: "销售部",
    person: "李四",
  },
  {
    id: 3,
    date: "2025-03-21",
    amount: 0.0,
    type: "服务反馈",
    purpose: "运营和销售服务反馈",
    department: "销售部",
    person: "李四",
  },
  {
    id: 4,
    date: "2025-03-20",
    amount: -1234.56,
    type: "招待客户",
    purpose: "招待客户",
    department: "销售三部",
    person: "张三，王五",
  },
  {
    id: 5,
    date: "2025-03-19",
    amount: 0.0,
    type: "线上会议",
    purpose: "线上1on1",
    department: "CRM",
    person: "赵六",
  },
];

export function CustomerDetail({ customer }: CustomerDetailProps) {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{customer.shortNameCn}</CardTitle>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          编辑
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="basic">基本信息</TabsTrigger>
            <TabsTrigger value="interaction">触达记录</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicInformation customer={customer} />
          </TabsContent>

          <TabsContent value="interaction">
            <InteractionRecords 
              contactData={contactData} 
              transactionData={transactionData} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
