
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit } from "lucide-react";
import { Customer } from "@/contexts/CustomerContext";
import { BasicInformation } from "./customer/BasicInformation";
import { InteractionRecords } from "./customer/InteractionRecords";
import { NewCustomerDialog } from "./NewCustomerDialog";
import { CustomerDetailHeader } from "./customer/CustomerDetailHeader";
import { useCustomerDetail } from "@/hooks/use-customer-detail";

export interface TransactionData {
  id: number;
  date: string;
  amount: number;
  type: string;
  purpose: string;
  department: string;
  person: string;
  description?: string;
}

interface CustomerDetailProps {
  customer: Customer;
  onEditCustomer?: (updatedCustomer: Partial<Customer>) => void;
  productOptions?: string[];
  reachOptions?: string[];
  contactTypes: string[];
  groupOptions: string[];
  countries: string[];
  departments: string[];
}

const contactData = [
  { name: "投研服务", value: 5, percentage: 42, color: "#4f46e5" },
  { name: "电话沟通", value: 3, percentage: 25, color: "#10b981" },
  { name: "线上会议", value: 2, percentage: 16, color: "#f97316" },
  { name: "报告发送", value: 1, percentage: 8, color: "#ef4444" },
  { name: "招待客户", value: 1, percentage: 8, color: "#f59e0b" },
];

export function CustomerDetail({ 
  customer, 
  onEditCustomer, 
  productOptions = [], 
  reachOptions = [], 
  contactTypes,
  groupOptions = [],
  countries = [],
  departments = []
}: CustomerDetailProps) {
  const {
    activeTab,
    setActiveTab,
    editDialogOpen,
    setEditDialogOpen,
    transactionData,
    handleUpdateCustomer,
    handleAddServiceRecord
  } = useCustomerDetail(customer, onEditCustomer);

  return (
    <Card>
      <CardHeader>
        <CustomerDetailHeader customer={customer} />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="basic">基本信息</TabsTrigger>
              <TabsTrigger value="interaction">触达记录</TabsTrigger>
            </TabsList>
            {activeTab === "basic" && (
              <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
                <Edit className="h-4 w-4 mr-2" />
                编辑
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
              departments={departments}
              customerId={customer.id}
              customerName={customer.fullNameCn}
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
        groupOptions={groupOptions}
        countries={countries}
        departments={departments}
      />
    </Card>
  );
}
