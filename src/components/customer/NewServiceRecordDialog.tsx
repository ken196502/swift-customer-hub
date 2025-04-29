
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface NewServiceRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export function NewServiceRecordDialog({ open, onOpenChange, onSubmit }: NewServiceRecordDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: "",
    contactType: "",
    description: "",
    department: "",
    servicePerson: ""
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    if (!formData.date || !formData.contactType) {
      toast({
        title: "请填写必填项",
        description: "日期和联系类型为必填项",
        variant: "destructive"
      });
      return;
    }
    
    if (onSubmit) {
      onSubmit(formData);
    }
    
    toast({
      title: "操作成功",
      description: "触达记录已添加",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>新增触达记录</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>日期</Label>
            <Input 
              type="date" 
              value={formData.date} 
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>金额 (折合HKD)</Label>
            <Input 
              type="number" 
              placeholder="请输入金额" 
              value={formData.amount} 
              onChange={(e) => handleInputChange('amount', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>联系类型</Label>
            <Select
              value={formData.contactType}
              onValueChange={(value) => handleInputChange('contactType', value)}
            >
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
            <Input 
              placeholder="请输入联系描述" 
              value={formData.description} 
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>联系部门</Label>
            <Input 
              placeholder="请输入联系部门" 
              value={formData.department} 
              onChange={(e) => handleInputChange('department', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>服务人</Label>
            <Input 
              placeholder="请输入服务人" 
              value={formData.servicePerson} 
              onChange={(e) => handleInputChange('servicePerson', e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit}>保存</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
