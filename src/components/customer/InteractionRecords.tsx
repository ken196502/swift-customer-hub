
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ServiceRecordChart } from "./ServiceRecordChart";
import { TransactionTable } from "./TransactionTable";
import { NewServiceRecordDialog } from "./NewServiceRecordDialog";
import type { TransactionData } from "@/components/CustomerDetail";
import { AccessRequestDialog } from "./AccessRequestDialog";
import { useInteractionRecords } from "@/hooks/use-interaction-records";
import { useToast } from "@/hooks/use-toast";

interface InteractionRecordsProps {
  contactData: Array<{ name: string; value: number; percentage: number; color: string }>;
  transactionData: TransactionData[];
  onAddServiceRecord: (record: any) => void;
  contactTypes: string[];
  departments: string[];
  customerId?: number;
  customerName?: string;
}

export function InteractionRecords({ 
  contactData, 
  transactionData, 
  onAddServiceRecord,
  contactTypes,
  departments,
  customerId,
  customerName
}: InteractionRecordsProps) {
  const [showNewServiceRecord, setShowNewServiceRecord] = useState(false);
const [editRow, setEditRow] = useState<any>(null);
  const { toast } = useToast();
  
  const {
    showAccessDialog,
    setShowAccessDialog,
    maskedTransactions,
    handleEditTransaction,
    handleRequestAccess,
    handleConfirmAccessRequest,
  } = useInteractionRecords(transactionData, customerId, customerName);

  const handleDeleteTransaction = (id: number) => {
    // 这里添加删除逻辑，比如调用API删除记录
    // 删除后触发父组件更新数据
    const recordToDelete = transactionData.find(record => record.id === id);
    if (!recordToDelete) return;

    // 发送审核事件
    window.dispatchEvent(
      new CustomEvent("audit:create", {
        detail: {
          id: Math.floor(Math.random() * 10000),
          submitTime: new Date().toLocaleString(),
          customer: customerName || "未知客户",
          type: "删除",
          category: "触达记录",
          before: `类型: ${recordToDelete.type}\n时间: ${recordToDelete.date}\n人员: ${recordToDelete.person}\n部门: ${recordToDelete.department}\n金额: ${recordToDelete.amount || 0}\n目的: ${recordToDelete.purpose || ''}`,
          after: "",
          note: "",
          submitter: "当前用户",
          status: "pending"
        },
      })
    );

    toast({
      title: "提交审核",
      description: "已提交删除触达记录审核请求，审核通过后将删除该记录",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">触达记录</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowNewServiceRecord(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          新增触达记录
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="w-full">
          <ServiceRecordChart data={contactData} />
        </div>
        <div className="w-full">
          <TransactionTable 
            data={transactionData} 
            onEditTransaction={(row) => {
              setShowNewServiceRecord(true);
              setEditRow(row);
            }}
            onDeleteTransaction={handleDeleteTransaction}
            maskedTransactions={maskedTransactions}
            onRequestAccess={handleRequestAccess}
          />
        </div>
      </div>

      <NewServiceRecordDialog
  open={showNewServiceRecord}
  onOpenChange={setShowNewServiceRecord}
  onSubmit={(record) => {
    setShowNewServiceRecord(false);
    setEditRow(null);
    window.dispatchEvent(
      new CustomEvent("audit:create", {
        detail: {
          id: Math.floor(Math.random() * 10000),
          submitTime: new Date().toLocaleString(),
          customer: customerName || "未知客户",
          type: "新增",
          category: "触达记录",
          before: "",
          after: `类型: ${record.type}\n时间: ${record.date}\n人员: ${record.person}\n部门: ${record.department}\n金额: ${record.amount || 0}\n目的: ${record.purpose || ''}`,
          note: record.notes || "",
          submitter: "当前用户",
          status: "pending"
        },
      })
    );
    toast({
      title: "提交审核",
      description: "已提交新增触达记录审核请求，审核通过后将添加记录",
    });
    onAddServiceRecord(record);
  }}
  contactTypes={contactTypes}
  departments={departments}
  {...(editRow ? { defaultValue: editRow } : {})}
/>

      <AccessRequestDialog
        open={showAccessDialog}
        onOpenChange={setShowAccessDialog}
        onConfirm={handleConfirmAccessRequest}
      />
    </div>
  );
}
