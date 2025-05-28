
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ServiceRecord {
  id: string;
  date: string;
  type: string;
  customType?: string;
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
  departments: string[];
}

export function NewServiceRecordDialog({ 
  open, 
  onOpenChange, 
  onSubmit,
  contactTypes,
  departments
}: NewServiceRecordDialogProps) {
  const { toast } = useToast();
  
  // 模拟业务人员数据
  const salesPersons = useMemo(() => [
    { id: '1', name: '张三', enName: 'Zhang San' },
    { id: '2', name: '李四', enName: 'Li Si' },
    { id: '3', name: '王五', enName: 'Wang Wu' },
    { id: '4', name: '赵六', enName: 'Zhao Liu' },
    { id: '5', name: '钱七', enName: 'Qian Qi' },
  ], []);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // 根据搜索词过滤业务人员
  const filteredPersons = useMemo(() => {
    if (!searchTerm) return salesPersons;
    const term = searchTerm.toLowerCase();
    return salesPersons.filter(
      person => 
        person.name.toLowerCase().includes(term) || 
        person.enName.toLowerCase().includes(term)
    );
  }, [searchTerm, salesPersons]);

  const [record, setRecord] = useState<Partial<ServiceRecord>>({
    date: new Date().toISOString().split('T')[0],
    type: "",
    customType: "",
    notes: "",
    amount: undefined,
    department: "",
    person: "",
    purpose: "",
  });

  const showCustomTypeInput = record.type === "其他";

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

    if (record.type === "其他" && !record.customType) {
      toast({
        title: "请填写自定义类型",
        description: "选择其他类型时，自定义类型为必填项",
        variant: "destructive"
      });
      return;
    }

    const newRecord: ServiceRecord = {
      id: Date.now().toString(),
      date: record.date || new Date().toISOString().split('T')[0],
      type: record.type || "",
      customType: record.customType,
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
      customType: "",
      notes: "",
      amount: undefined,
      department: "",
      person: "",
      purpose: "",
    });
    
    onOpenChange(false);
  };

  // Reset customType when type changes
  useEffect(() => {
    if (record.type !== "其他") {
      setRecord(prev => ({ ...prev, customType: "" }));
    }
  }, [record.type]);

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

          {showCustomTypeInput && (
            <div className="space-y-2">
              <Label>自定义类型</Label>
              <Input 
                placeholder="请输入自定义类型" 
                value={record.customType} 
                onChange={(e) => handleChange('customType', e.target.value)}
              />
            </div>
          )}

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
            <Select
              value={record.person}
              onValueChange={(value) => handleChange('person', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择或搜索业务人员" />
              </SelectTrigger>
              <SelectContent>
                <div className="px-3 py-2">
                  <Input 
                    placeholder="搜索姓名或拼音..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="mb-2"
                  />
                </div>
                {filteredPersons.length > 0 ? (
                  filteredPersons.map((person) => (
                    <SelectItem key={person.id} value={person.name}>
                      {person.name} {person.enName}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    未找到匹配的业务人员
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>成本金额</Label>
            <Input 
              type="number" 
              placeholder="请输入成本金额" 
              value={record.amount === undefined ? '' : record.amount} 
              onChange={(e) => handleChange('amount', parseFloat(e.target.value) || undefined)}
            />
          </div>

          <div className="space-y-2">
            <Label>成本用途</Label>
            <Input 
              placeholder="请输入成本用途" 
              value={record.purpose} 
              onChange={(e) => handleChange('purpose', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>触达内容<span className="text-red-500">*</span></Label>
            <Textarea 
              placeholder="请输入触达内容" 
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
