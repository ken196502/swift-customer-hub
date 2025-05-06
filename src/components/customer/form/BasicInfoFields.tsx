
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Customer } from "@/contexts/CustomerContext";

interface BasicInfoFieldsProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  groupOptions: string[];
}

export function BasicInfoFields({ formData, handleInputChange, groupOptions }: BasicInfoFieldsProps) {
  return (
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
        <Select
          value={formData.groupName}
          onValueChange={(value) => handleInputChange('groupName', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="请选择所属集团" />
          </SelectTrigger>
          <SelectContent>
            {groupOptions.map((group) => (
              <SelectItem key={group} value={group}>{group}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
  );
}
