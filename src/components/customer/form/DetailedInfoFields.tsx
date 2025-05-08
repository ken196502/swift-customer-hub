
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Customer } from "@/contexts/CustomerContext";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface DetailedInfoFieldsProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  groupOptions: string[];
}

export function DetailedInfoFields({ 
  formData, 
  handleInputChange,
  groupOptions 
}: DetailedInfoFieldsProps) {
  const isPersonalCustomer = formData.type === "个人户";

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="groupName">所属集团</Label>
        <Select
          value={formData.groupName || ""}
          onValueChange={(value) => handleInputChange("groupName", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="选择集团" />
          </SelectTrigger>
          <SelectContent>
            {groupOptions.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="isListed"
          checked={formData.isListed || false}
          onCheckedChange={(checked) => handleInputChange("isListed", checked)}
          disabled={isPersonalCustomer}
        />
        <Label htmlFor="isListed" className={cn(isPersonalCustomer && "text-muted-foreground")}>是否上市</Label>
      </div>
      
      {!isPersonalCustomer && formData.isListed && (
        <div className="space-y-2">
          <Label htmlFor="stockCode">股票代码</Label>
          <Input
            id="stockCode"
            value={formData.stockCode || ""}
            onChange={(e) => handleInputChange("stockCode", e.target.value)}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>主要股东</Label>
        <Input 
          placeholder="请输入主要股东" 
          value={formData.shareholders} 
          onChange={(e) => handleInputChange('shareholders', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>实际控制人</Label>
        <Input 
          placeholder="请输入实际控制人" 
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
        <Label>注册地址</Label>
        <Input 
          placeholder="请输入详细地址" 
          value={formData.registeredAddress} 
          onChange={(e) => handleInputChange('registeredAddress', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>法定代表人</Label>
        <Input 
          placeholder="请输入法定代表人" 
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
    </div>
  );
}
