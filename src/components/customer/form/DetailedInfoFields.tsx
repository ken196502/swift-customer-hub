
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Customer } from "@/contexts/CustomerContext";

interface DetailedInfoFieldsProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
}

export function DetailedInfoFields({ formData, handleInputChange }: DetailedInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>证件类型 <span className="text-red-500">*</span></Label>
        <Select
          value={formData.idType}
          onValueChange={(value) => handleInputChange('idType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="请选择证件类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">统一社会信用代码</SelectItem>
            <SelectItem value="idcard">身份证</SelectItem>
            <SelectItem value="other">其他</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>证件号码 <span className="text-red-500">*</span></Label>
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
  );
}
