
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Customer } from "@/contexts/CustomerContext";
import { useToast } from "@/hooks/use-toast";
import { CustomerFormSection } from "./customer/CustomerFormSection";

interface NewCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Customer;
  onSubmit?: (customer: Partial<Customer>) => void;
  productOptions: string[];
  groupOptions: string[];
  countries: string[];
  departments: string[];
}

export function NewCustomerDialog({ 
  open, 
  onOpenChange, 
  initialData, 
  onSubmit,
  productOptions,
  groupOptions,
  countries,
  departments
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
    country: "中国内地",
    idType: "营业执照",
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
    sponsorDepartments: [],
    entryDepartment: departments[0],
    progress: "意向",
    phone: "",
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

  const handleSubmit = () => {
    if (!formData.shortNameCn) {
      toast({
        title: "请填写必填项",
        description: "中文名称为必填项",
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
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
          <DialogTitle>{initialData ? "编辑客户" : "新建客户"}</DialogTitle>
          <DialogDescription>
            填写客户信息，带*为必填项
          </DialogDescription>
        </DialogHeader>
        

        <CustomerFormSection 
          formData={formData} 
          handleInputChange={handleInputChange} 
          groupOptions={groupOptions}
          countries={countries}
        />
        
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
