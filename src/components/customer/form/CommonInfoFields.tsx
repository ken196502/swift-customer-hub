
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Customer } from "@/contexts/CustomerContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CommonInfoFieldsProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  countries: string[];
  disabled?: boolean;
  isPersonalCustomer?: boolean;
}

export function CommonInfoFields({ 
  formData, 
  handleInputChange, 
  countries,
  disabled = false,
  isPersonalCustomer = false
}: CommonInfoFieldsProps) {
  const establishDateLabel = isPersonalCustomer ? "出生日期" : "成立日期";
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="progress">进展</Label>
          <RadioGroup
            value={formData.progress || "意向"}
            onValueChange={(value) => handleInputChange("progress", value)}
            className="flex space-x-4 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="意向" id="progress-intent" />
              <Label htmlFor="progress-intent">意向</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="已开户" id="progress-opened" />
              <Label htmlFor="progress-opened">已开户</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="activeStatus">活跃状态</Label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="establishDate">{establishDateLabel}</Label>
          <Input 
            type="date" 
            id="establishDate"
            placeholder={`请选择${establishDateLabel}`} 
            value={formData.establishDate || ""} 
            onChange={(e) => handleInputChange('establishDate', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="idType">证件类型</Label>
          <Select
            value={formData.idType || ""}
            onValueChange={(value) => handleInputChange("idType", value)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择证件类型" />
            </SelectTrigger>
            <SelectContent>
              {isPersonalCustomer ? (
                <>
                  <SelectItem value="身份证">身份证</SelectItem>
                  <SelectItem value="护照">护照</SelectItem>
                  <SelectItem value="港澳通行证">港澳通行证</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="营业执照">营业执照</SelectItem>
                  <SelectItem value="组织机构代码证">组织机构代码证</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="idNumber">证件号码</Label>
          <Input
            id="idNumber"
            value={formData.idNumber || ""}
            onChange={(e) => handleInputChange("idNumber", e.target.value)}
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="country">国家</Label>
          <Select
            value={formData.country || "中国"}
            onValueChange={(value) => handleInputChange("country", value)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择国家" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">城市</Label>
          <Input
            id="city"
            value={formData.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
            disabled={disabled}
          />
        </div>
        {!disabled && (
          <div>
            <Label htmlFor="entryDate">录入时间</Label>
            <Input
              id="entryDate"
              value={formData.entryDate || ""}
              onChange={(e) => handleInputChange("entryDate", e.target.value)}
              disabled
            />
          </div>
        )}
      </div>
    </div>
  );
}
