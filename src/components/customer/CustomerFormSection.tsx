
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Customer } from "@/pages/Index";

interface CustomerFormSectionProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  section: "basic" | "details";
  groupOptions: string[];
}

export function CustomerFormSection({ formData, handleInputChange, section, groupOptions }: CustomerFormSectionProps) {
  if (section === "basic") {
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

  return (
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
  );
}
