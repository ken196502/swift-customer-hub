
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ServiceRecord {
  id: string;
  date: string;
  type: string;
  notes: string;
  amount?: number;
  department?: string;
  person?: string;
  purpose?: string;
}

interface NewServiceRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (record: ServiceRecord) => void;
  contactTypes: string[];
}

export function NewServiceRecordDialog({ 
  open, 
  onOpenChange, 
  onSubmit,
  contactTypes 
}: NewServiceRecordDialogProps) {
  const { toast } = useToast();
  const [record, setRecord] = useState<Partial<ServiceRecord>>({
    date: new Date().toISOString().split('T')[0],
    type: "",
    notes: "",
    amount: undefined,
    department: "",
    person: "",
    purpose: "",
  });

  const departments = ["零售经纪", "机构经纪", "跨资产", "DCM", "ECM"];

  const handleChange = (field: string, value: any) => {
    setRecord({ ...record, [field]: value });
  };

  const handleSubmit = () => {
    if (!record.type || !record.date) {
      toast({
        title: "请填写必填项",
        description: "联系类型和日期为必填项",
        variant: "destructive"
      });
      return;
    }

    const newRecord: ServiceRecord = {
      id: Date.now().toString(),
      date: record.date || new Date().toISOString().split('T')[0],
      type: record.type || "",
      notes: record.notes || "",
      amount: record.amount,
      department: record.department,
      person: record.person,
      purpose: record.purpose,
    };

    onSubmit(newRecord);
    
    toast({
      title: "操作成功",
      description: "新服务记录已添加",
    });
    
    // Reset form
    setRecord({
      date: new Date().toISOString().split('T')[0],
      type: "",
      notes: "",
      amount: undefined,
      department: "",
      person: "",
      purpose: "",
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
              value={record.date} 
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>联系类型</Label>
            <Select
              value={record.type}
              onValueChange={(value) => handleChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择联系类型" />
              </SelectTrigger>
              <SelectContent>
                {contactTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>业务部门</Label>
            <Select
              value={record.department}
              onValueChange={(value) => handleChange('department', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择业务部门" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>业务人员</Label>
            <Input 
              placeholder="请输入业务人员" 
              value={record.person} 
              onChange={(e) => handleChange('person', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>金额（万元）</Label>
            <Input 
              type="number" 
              placeholder="请输入金额" 
              value={record.amount === undefined ? '' : record.amount} 
              onChange={(e) => handleChange('amount', parseFloat(e.target.value) || undefined)}
            />
          </div>

          <div className="space-y-2">
            <Label>用途</Label>
            <Input 
              placeholder="请输入用途" 
              value={record.purpose} 
              onChange={(e) => handleChange('purpose', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>备注</Label>
            <Textarea 
              placeholder="请输入备注" 
              value={record.notes} 
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
