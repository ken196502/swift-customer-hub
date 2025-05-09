
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TransactionData } from "@/components/CustomerDetail";

export function useInteractionRecords(
  transactionData: TransactionData[],
  customerId?: number,
  customerName?: string
) {
  const [showAccessDialog, setShowAccessDialog] = useState(false);
  const [accessRequestingId, setAccessRequestingId] = useState<number | null>(null);
  const [maskedTransactions, setMaskedTransactions] = useState<number[]>([1, 4]); // Demo data
  const { toast } = useToast();

  const handleEditTransaction = (transactionId: number) => {
    console.log(`Edit transaction: ${transactionId}`);
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
    const transaction = transactionData.find(t => t.id === accessRequestingId);
    
    if (transaction && customerId) {
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
  
  const handleApprovalReceived = (transactionId: number) => {
    setMaskedTransactions(prev => prev.filter(id => id !== transactionId));
    toast({
      title: "权限已授予",
      description: "您现在可以查看该触达记录",
    });
  };

  // Listen for audit approval events
  useEffect(() => {
    const handleAuditApproval = (e: CustomEvent) => {
      const { type, ids } = e.detail;
      if (type === "viewAccess" && ids.length > 0) {
        handleApprovalReceived(ids[0]);
      }
    };

    window.addEventListener("audit:approved", handleAuditApproval as EventListener);

    return () => {
      window.removeEventListener("audit:approved", handleAuditApproval as EventListener);
    };
  }, []);

  return {
    showAccessDialog,
    setShowAccessDialog,
    maskedTransactions,
    handleEditTransaction,
    handleRequestAccess,
    handleConfirmAccessRequest,
  };
}
