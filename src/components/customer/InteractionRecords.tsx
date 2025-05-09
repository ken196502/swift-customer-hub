
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Lock } from "lucide-react";
import { ServiceRecordChart } from "./ServiceRecordChart";
import { TransactionTable } from "./TransactionTable";
import { NewServiceRecordDialog } from "./NewServiceRecordDialog";
import type { TransactionData } from "@/components/CustomerDetail";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [showAccessDialog, setShowAccessDialog] = useState(false);
  const [accessRequestingId, setAccessRequestingId] = useState<number | null>(null);
  const [maskedTransactions, setMaskedTransactions] = useState<number[]>([1, 4]); // Demo data - transactions with IDs 1 and 4 are masked initially
  const { toast } = useToast();
  
  const handleEditTransaction = (transactionId: number) => {
    console.log(`Edit transaction: ${transactionId}`);
    // This would trigger an audit request before allowing edit
    toast({
      title: "提交审核",
      description: "已提交修改触达记录审核请求，审核通过后修改将生效",
    });
  };

  const handleRequestAccess = (transactionId: number) => {
    setAccessRequestingId(transactionId);
    setShowAccessDialog(true);
  };

  const handleConfirmAccessRequest = () => {
    // Get transaction details for the audit record
    const transaction = transactionData.find(t => t.id === accessRequestingId);
    
    if (transaction && customerId) {
      // In a real app, we would submit this to a backend
      // For demo, we'll dispatch a custom event that the Audit component listens for
      window.dispatchEvent(
        new CustomEvent("audit:create", {
          detail: {
            id: Math.floor(Math.random() * 10000),
            submitTime: new Date().toLocaleString(),
            customer: customerName || "未知客户",
            type: "权限变更",
            category: "共享权限",
            before: "",
            after: `部门: ${transaction.department}\n内容: 触达记录\n产品: ${transaction.type}`,
            note: `申请查看ID为${transaction.id}的触达记录`,
            submitter: "当前用户",
            status: "pending"
          },
        })
      );

      toast({
        title: "申请已提交",
        description: "查看权限申请已提交，请等待审核",
      });
    }
    setShowAccessDialog(false);
    setAccessRequestingId(null);
  };
  
  // This would be called when an approval event is received
  const handleApprovalReceived = (transactionId: number) => {
    setMaskedTransactions(prev => prev.filter(id => id !== transactionId));
    toast({
      title: "权限已授予",
      description: "您现在可以查看该触达记录",
    });
  };

  // Listen for audit approval events
  useState(() => {
    const handleAuditApproval = (e: CustomEvent) => {
      // Check if this is for our masked transaction
      const { type, ids } = e.detail;
      if (type === "viewAccess" && ids.length > 0) {
        // For demo, assume the first ID is for our masked transaction
        handleApprovalReceived(ids[0]);
      }
    };

    window.addEventListener("audit:approved", handleAuditApproval as EventListener);

    return () => {
      window.removeEventListener("audit:approved", handleAuditApproval as EventListener);
    };
  }, []);

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
            onEditTransaction={handleEditTransaction}
            maskedTransactions={maskedTransactions}
            onRequestAccess={handleRequestAccess}
          />
        </div>
      </div>

      <NewServiceRecordDialog
        open={showNewServiceRecord}
        onOpenChange={setShowNewServiceRecord}
        onSubmit={(record) => {
          // Instead of directly adding, we create an audit request
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
          
          // Still call the handler to store it locally if needed
          onAddServiceRecord(record);
        }}
        contactTypes={contactTypes}
        departments={departments}
      />

      <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>申请查看权限</DialogTitle>
            <DialogDescription>
              您正在申请查看受限的触达记录，需要提交审核
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            是否提交查看申请？提交后需要等待审核通过。
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAccessDialog(false)}>
              取消
            </Button>
            <Button onClick={handleConfirmAccessRequest}>
              提交申请
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
