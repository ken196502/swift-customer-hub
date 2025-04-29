
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import type { Customer } from "@/pages/Index";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Customer;
  onSubmit?: (customer: Partial<Customer>) => void;
}

export function NewCustomerDialog({ open, onOpenChange, initialData, onSubmit }: NewCustomerDialogProps) {
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

  const productOptions = ["股票交易", "咨询", "债券交易", "IPO", "发债"];
  const tagOptions = ["零售经纪", "机构经纪", "跨资产", "DCM", "ECM"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "编辑客户" : "新建客户"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>客户号</Label>
              <Input 
                placeholder="请输入客户号" 
                value={formData.customerNumber} 
                onChange={(e) => handleInputChange('customerNumber', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>所属集团</Label>
              <Input 
                placeholder="请输入所属集团" 
                value={formData.groupName} 
                onChange={(e) => handleInputChange('groupName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>英文简称</Label>
              <Input 
                placeholder="请输入英文简称" 
                value={formData.shortNameEn} 
                onChange={(e) => handleInputChange('shortNameEn', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>中文简称</Label>
              <Input 
                placeholder="请输入中文简称" 
                value={formData.shortNameCn} 
                onChange={(e) => handleInputChange('shortNameCn', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>英文全称</Label>
              <Input 
                placeholder="请输入英文全称" 
                value={formData.fullNameEn} 
                onChange={(e) => handleInputChange('fullNameEn', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>中文全称</Label>
              <Input 
                placeholder="请输入中文全称" 
                value={formData.fullNameCn} 
                onChange={(e) => handleInputChange('fullNameCn', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>客户类型</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择客户类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="公司户">公司户</SelectItem>
                  <SelectItem value="个人户">个人户</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>是否上市</Label>
              <Select
                value={formData.isListed ? "true" : "false"}
                onValueChange={(value) => handleInputChange('isListed', value === "true")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择是否上市" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">是</SelectItem>
                  <SelectItem value="false">否</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>股票代码</Label>
              <Input 
                placeholder="请输入股票代码" 
                value={formData.stockCode} 
                onChange={(e) => handleInputChange('stockCode', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>城市地区</Label>
              <Input 
                placeholder="请输入城市地区" 
                value={formData.city} 
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>证件类型</Label>
              <Select
                value={formData.idType}
                onValueChange={(value) => handleInputChange('idType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择证件类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">统一社会信用代码</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>证件号码</Label>
              <Input 
                placeholder="请输入证件号码" 
                value={formData.idNumber} 
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>股东</Label>
              <Input 
                placeholder="请输入股东信息" 
                value={formData.shareholders} 
                onChange={(e) => handleInputChange('shareholders', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>实控人</Label>
              <Input 
                placeholder="请输入实控人" 
                value={formData.actualController} 
                onChange={(e) => handleInputChange('actualController', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>注册资本</Label>
              <Input 
                placeholder="请输入注册资本" 
                value={formData.registeredCapital} 
                onChange={(e) => handleInputChange('registeredCapital', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>成立日期</Label>
              <Input 
                type="date" 
                value={formData.establishDate} 
                onChange={(e) => handleInputChange('establishDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>注册地址</Label>
              <Input 
                placeholder="请输入注册地址" 
                value={formData.registeredAddress} 
                onChange={(e) => handleInputChange('registeredAddress', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>法人代表</Label>
              <Input 
                placeholder="请输入法人代表" 
                value={formData.legalRepresentative} 
                onChange={(e) => handleInputChange('legalRepresentative', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>风险等级</Label>
              <Select
                value={formData.riskLevel}
                onValueChange={(value) => handleInputChange('riskLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择风险等级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="低">低</SelectItem>
                  <SelectItem value="中">中</SelectItem>
                  <SelectItem value="高">高</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>活跃状态</Label>
              <Select
                value={formData.activeStatus}
                onValueChange={(value) => handleInputChange('activeStatus', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择活跃状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="活跃">活跃</SelectItem>
                  <SelectItem value="不活跃">不活跃</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label>提供产品</Label>
            <div className="flex flex-wrap gap-2">
              {productOptions.map((product) => (
                <div 
                  key={product}
                  onClick={() => handleProductToggle(product)}
                  className={`px-3 py-1 rounded-md cursor-pointer border flex items-center gap-2 ${
                    formData.products?.includes(product)
                      ? 'bg-blue-100 border-blue-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  {formData.products?.includes(product) && <Check className="h-4 w-4" />}
                  {product}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>标签</Label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <div 
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-md cursor-pointer border flex items-center gap-2 ${
                    formData.tags?.includes(tag)
                      ? 'bg-green-100 border-green-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  {formData.tags?.includes(tag) && <Check className="h-4 w-4" />}
                  {tag}
                </div>
              ))}
            </div>
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
