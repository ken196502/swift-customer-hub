
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewServiceRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewServiceRecordDialog({ open, onOpenChange }: NewServiceRecordDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>新增触达记录</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>日期</Label>
            <Input type="date" />
          </div>

          <div className="space-y-2">
            <Label>金额 (折合HKD)</Label>
            <Input type="number" placeholder="请输入金额" />
          </div>

          <div className="space-y-2">
            <Label>联系类型</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="请选择联系类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="research">投研服务</SelectItem>
                <SelectItem value="phone">电话沟通</SelectItem>
                <SelectItem value="meeting">线上会议</SelectItem>
                <SelectItem value="report">报告发送</SelectItem>
                <SelectItem value="visit">招待客户</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>联系描述</Label>
            <Input placeholder="请输入联系描述" />
          </div>

          <div className="space-y-2">
            <Label>联系部门</Label>
            <Input placeholder="请输入联系部门" />
          </div>

          <div className="space-y-2">
            <Label>服务人</Label>
            <Input placeholder="请输入服务人" />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button>保存</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
