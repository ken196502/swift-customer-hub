
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit, CircleDot, Plus } from "lucide-react";
import type { Customer } from "@/pages/Index";
import { BasicInformation } from "./customer/BasicInformation";
import { InteractionRecords } from "./customer/InteractionRecords";
import { NewCustomerDialog } from "./NewCustomerDialog";
import { NewServiceRecordDialog } from "./customer/NewServiceRecordDialog";

interface CustomerDetailProps {
  customer: Customer;
  onEditCustomer?: (updatedCustomer: Partial<Customer>) => void;
  productOptions?: string[];
  tagOptions?: string[];
  contactTypes: string[];
}

const contactData = [
  { name: "投研服务", value: 5, percentage: 42, color: "#4f46e5" },
  { name: "电话沟通", value: 3, percentage: 25, color: "#10b981" },
  { name: "线上会议", value: 2, percentage: 16, color: "#f97316" },
  { name: "报告发送", value: 1, percentage: 8, color: "#ef4444" },
  { name: "招待客户", value: 1, percentage: 8, color: "#f59e0b" },
];

export interface TransactionData {
  id: number;
  date: string;
  amount: number;
  type: string;
  purpose: string;
  department: string;
  person: string;
}

const initialTransactions: TransactionData[] = [
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

export function CustomerDetail({ customer, onEditCustomer, productOptions = [], tagOptions = [], contactTypes }: CustomerDetailProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newServiceDialogOpen, setNewServiceDialogOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<TransactionData[]>(initialTransactions);

  const handleUpdateCustomer = (updatedCustomer: Partial<Customer>) => {
    if (onEditCustomer) {
      onEditCustomer(updatedCustomer);
    }
    setEditDialogOpen(false);
  };

  const handleAddServiceRecord = (data: any) => {
    const contactTypeMap: Record<string, string> = {
      "research": "投研服务",
      "phone": "电话沟通",
      "meeting": "线上会议",
      "report": "报告发送",
      "visit": "招待客户"
    };

    // Create a new transaction record
    const newTransaction: TransactionData = {
      id: transactionData.length + 1,
      date: data.date,
      amount: parseFloat(data.amount) || 0,
      type: contactTypeMap[data.contactType] || data.contactType,
      purpose: data.description,
      department: data.department,
      person: data.servicePerson
    };

    // Add the new transaction to the list
    setTransactionData([newTransaction, ...transactionData]);
  };

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{customer.fullNameCn}</CardTitle>
        </div>
        <div className="flex items-center text-sm text-gray-500 space-x-8">
          <div className="flex items-center space-x-2">
            <span>所属集团:</span>
            <span className="text-gray-700">{customer.groupName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>录入时间:</span>
            <span className="text-gray-700">{customer.entryDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>活跃状态:</span>
            <div className="flex items-center space-x-1">
              <CircleDot className="h-3 w-3 text-green-500" />
              <span className="text-gray-700">{customer.activeStatus}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="basic">基本信息</TabsTrigger>
              <TabsTrigger value="interaction">触达记录</TabsTrigger>
            </TabsList>
            {activeTab === "basic" ? (
              <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
                <Edit className="h-4 w-4 mr-2" />
                编辑
              </Button>
            ) : (
              <Button size="sm" onClick={() => setNewServiceDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                新增触达记录
              </Button>
            )}
          </div>

          <TabsContent value="basic">
            <BasicInformation customer={customer} />
          </TabsContent>

          <TabsContent value="interaction">
            <InteractionRecords 
              contactData={contactData} 
              transactionData={transactionData} 
              onAddServiceRecord={handleAddServiceRecord}
              contactTypes={contactTypes}
            />
          </TabsContent>
        </Tabs>
      </CardContent>

      <NewCustomerDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        initialData={customer}
        onSubmit={handleUpdateCustomer}
        productOptions={productOptions}
        tagOptions={tagOptions}
      />

      <NewServiceRecordDialog
        open={newServiceDialogOpen}
        onOpenChange={setNewServiceDialogOpen}
        onSubmit={handleAddServiceRecord}
        contactTypes={contactTypes}
      />
    </Card>
  );
}
