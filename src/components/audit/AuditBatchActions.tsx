
import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AuditBatchActionsProps {
  selectedIds: number[];
  onApprove: (ids: number[], reason?: string) => void;
  onReject: (ids: number[], reason?: string) => void;
}

export function AuditBatchActions({ selectedIds, onApprove, onReject }: AuditBatchActionsProps) {
  const { toast } = useToast();
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [rejectError, setRejectError] = useState("");
  const hasSelected = selectedIds.length > 0;

  const handleApproveConfirm = () => {
    onApprove(selectedIds, reason);
    setReason("");
    setIsApproveOpen(false);
    toast({
      title: "操作成功",
      description: `已通过 ${selectedIds.length} 项审核`,
    });
  };

  const handleRejectConfirm = () => {
    if (!reason.trim()) {
      setRejectError("请填写驳回原因");
      return;
    }
    
    onReject(selectedIds, reason);
    setReason("");
    setRejectError("");
    setIsRejectOpen(false);
    toast({
      title: "操作成功",
      description: `已驳回 ${selectedIds.length} 项审核`,
    });
  };

  return (
    <div className="mb-4 flex space-x-2">
      <Button
        variant="default"
        size="sm"
        className="bg-green-500 hover:bg-green-600"
        onClick={() => setIsApproveOpen(true)}
        disabled={!hasSelected}
      >
        <Check className="h-4 w-4 mr-2" />
        批量通过
      </Button>
      
      <Button
        variant="default"
        size="sm"
        className="bg-red-500 hover:bg-red-600"
        onClick={() => setIsRejectOpen(true)}
        disabled={!hasSelected}
      >
        <X className="h-4 w-4 mr-2" />
        批量驳回
      </Button>

      {/* Approve Confirmation Dialog */}
      <AlertDialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认通过审核</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要通过所选的 {selectedIds.length} 项审核吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4">
            <label className="text-sm font-medium mb-2 block">
              备注（非必填）
            </label>
            <Textarea 
              placeholder="输入通过原因（可选）" 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleApproveConfirm}>确认通过</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认驳回审核</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要驳回所选的 {selectedIds.length} 项审核吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4">
            <label className="text-sm font-medium mb-2 block">
              驳回原因<span className="text-red-500">*</span>
            </label>
            <Textarea 
              placeholder="请输入驳回原因" 
              value={reason} 
              onChange={(e) => {
                setReason(e.target.value);
                if (e.target.value.trim() && rejectError) {
                  setRejectError("");
                }
              }}
              className={rejectError ? "border-red-500" : ""}
            />
            {rejectError && (
              <p className="mt-1 text-sm text-red-500">{rejectError}</p>
            )}
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-500 hover:bg-red-600"
              onClick={handleRejectConfirm}
            >
              确认驳回
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
