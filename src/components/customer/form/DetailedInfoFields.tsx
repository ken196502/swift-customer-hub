
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Customer } from "@/contexts/CustomerContext";
import { Button } from "@/components/ui/button";

interface DetailedInfoFieldsProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  countries?: string[];
}

export function DetailedInfoFields({ formData, handleInputChange, countries = [] }: DetailedInfoFieldsProps) {
  return (
    <div className="space-y-4">
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
        <Label>成立日期</Label>
        <Input 
          type="date" 
          placeholder="请选择成立日期" 
          value={formData.establishDate} 
          onChange={(e) => handleInputChange('establishDate', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>注册地址</Label>
        <div className="flex space-x-2">
          <div className="w-1/3">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-between"
              onClick={() => {}}
            >
              {formData.country || "请选择国家"}
            </Button>
          </div>
          <div className="w-2/3">
            <Input 
              placeholder="请输入详细地址" 
              value={formData.registeredAddress} 
              onChange={(e) => handleInputChange('registeredAddress', e.target.value)}
            />
          </div>
        </div>
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

      <div className="space-y-2">
        <Label>录入时间</Label>
        <Input 
          type="date" 
          placeholder="请选择录入时间" 
          value={formData.entryDate} 
          onChange={(e) => handleInputChange('entryDate', e.target.value)}
        />
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
            <SelectItem value="潜在">潜在</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
