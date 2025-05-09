
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AccessRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function AccessRequestDialog({ 
  open, 
  onOpenChange, 
  onConfirm 
}: AccessRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={onConfirm}>
            提交申请
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
