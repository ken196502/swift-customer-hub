
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
import { useCustomerAudit } from "@/hooks/use-customer-audit";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [mergeDialogOpen, setMergeDialogOpen] = useState(false);
  const [duplicateCustomerNumber, setDuplicateCustomerNumber] = useState("");
  const [mergeLoading, setMergeLoading] = useState(false);
  const {
    activeTab,
    setActiveTab,
    editDialogOpen,
    setEditDialogOpen,
    transactionData,
    handleAddServiceRecord
  } = useCustomerDetail(customer, null); // Set onEditCustomer to null since we'll use audit now

  const { submitCustomerChanges, setupAuditApprovedListener } = useCustomerAudit({
    onApproved: (updatedCustomer) => {
      if (onEditCustomer) {
        onEditCustomer(updatedCustomer);
      }
    }
  });

  // Set up the listener for audit approvals
  useEffect(() => {
    const cleanupListener = setupAuditApprovedListener();
    return cleanupListener;
  }, []);

  // Handle customer updates through the audit system
  const handleUpdateCustomer = (updatedData: Partial<Customer>) => {
    submitCustomerChanges(customer, updatedData, false);
    setEditDialogOpen(false);
  };

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
              <div className="flex gap-1">
                <Dialog open={mergeDialogOpen} onOpenChange={setMergeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      合并重复客户
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>合并重复客户</DialogTitle>
                      <DialogDescription>
                        将删除较新客户，并将所有信息合并到较旧客户中，但旧客户已有数据不会被覆盖
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="duplicateCustomerNumber">重复客户号</Label>
                        <Input
                          id="duplicateCustomerNumber"
                          value={duplicateCustomerNumber}
                          onChange={(e) => setDuplicateCustomerNumber(e.target.value)}
                          placeholder="请输入已存在客户号"
                        />
                      </div>
                      <Button
                        onClick={async () => {
                          if (!duplicateCustomerNumber.trim()) {
                            alert("请输入已存在客户号");
                            return;
                          }
                          
                          try {
                            setMergeLoading(true);
                            alert("已提交一条审核记录");
                            setMergeDialogOpen(false);
                            setDuplicateCustomerNumber("");
                          } catch (error) {
                            alert("提交失败，请重试");
                          } finally {
                            setMergeLoading(false);
                          }
                        }}
                        disabled={mergeLoading}
                      >
                        {mergeLoading ? "提交中..." : "确定"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
                  <Edit className="h-4 w-4" />
                  编辑
                </Button>
              </div>
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
