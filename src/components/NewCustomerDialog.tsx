
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Customer } from "@/contexts/CustomerContext";
import { useToast } from "@/hooks/use-toast";
import { CustomerFormSection } from "./customer/CustomerFormSection";
import { TagSelector } from "./customer/TagSelector";

interface NewCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Customer;
  onSubmit?: (customer: Partial<Customer>) => void;
  productOptions: string[];
  tagOptions: string[];
  groupOptions: string[];
}

export function NewCustomerDialog({ 
  open, 
  onOpenChange, 
  initialData, 
  onSubmit,
  productOptions,
  tagOptions,
  groupOptions 
}: NewCustomerDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Customer>>(initialData || {
    customerNumber: "",
    groupName: "",
    nameEn: "",
    shortNameEn: "",
    fullNameEn: "",
    shortNameCn: "",
    fullNameCn: "",
    type: "公司户",
    isListed: false,
    stockCode: "",
    city: "",
    idType: "",
    idNumber: "",
    shareholders: "",
    actualController: "",
    registeredCapital: "",
    establishDate: "",
    registeredAddress: "",
    legalRepresentative: "",
    riskLevel: "低",
    entryDate: new Date().toISOString().split('T')[0],
    activeStatus: "活跃",
    products: [],
    tags: []
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleProductToggle = (value: string) => {
    const products = formData.products || [];
    if (products.includes(value)) {
      handleInputChange('products', products.filter(p => p !== value));
    } else {
      handleInputChange('products', [...products, value]);
    }
  };

  const handleTagToggle = (value: string) => {
    const tags = formData.tags || [];
    if (tags.includes(value)) {
      handleInputChange('tags', tags.filter(t => t !== value));
    } else {
      handleInputChange('tags', [...tags, value]);
    }
  };

  const handleSubmit = () => {
    if (!formData.customerNumber || !formData.shortNameCn) {
      toast({
        title: "请填写必填项",
        description: "客户号和中文简称为必填项",
        variant: "destructive"
      });
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
    
    toast({
      title: "操作成功",
      description: initialData ? "客户信息已更新" : "新客户已添加",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "编辑客户" : "新建客户"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CustomerFormSection 
            formData={formData} 
            handleInputChange={handleInputChange} 
            section="basic"
            groupOptions={groupOptions}
          />
          <CustomerFormSection 
            formData={formData} 
            handleInputChange={handleInputChange} 
            section="details"
            groupOptions={groupOptions}
          />
          <div className="space-y-4">
            <TagSelector
              label="提供产品"
              options={productOptions}
              selectedItems={formData.products || []}
              onToggle={handleProductToggle}
              bgColorClass="bg-blue-100"
            />
            
            <TagSelector
              label="触达部门"
              options={tagOptions}
              selectedItems={formData.tags || []}
              onToggle={handleTagToggle}
              bgColorClass="bg-green-100"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
