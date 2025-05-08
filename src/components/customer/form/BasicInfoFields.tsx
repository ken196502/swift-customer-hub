
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Customer } from "@/contexts/CustomerContext";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BasicInfoFieldsProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  groupOptions: string[];
  countries: string[];
  disabled?: boolean;
}

export function BasicInfoFields({ 
  formData, 
  handleInputChange, 
  groupOptions,
  countries,
  disabled = false 
}: BasicInfoFieldsProps) {
  const isPersonalCustomer = formData.type === "个人户";

  return (
    <div className="space-y-4">
      {!isPersonalCustomer && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shortNameCn" className="text-right">
                中文简称 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="shortNameCn"
                value={formData.shortNameCn || ""}
                onChange={(e) => handleInputChange("shortNameCn", e.target.value)}
                disabled={disabled}
                required
              />
            </div>
            <div>
              <Label htmlFor="shortNameEn">英文简称</Label>
              <Input
                id="shortNameEn"
                value={formData.shortNameEn || ""}
                onChange={(e) => handleInputChange("shortNameEn", e.target.value)}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullNameCn">中文全称</Label>
              <Input
                id="fullNameCn"
                value={formData.fullNameCn || ""}
                onChange={(e) => handleInputChange("fullNameCn", e.target.value)}
                disabled={disabled}
              />
            </div>
            <div>
              <Label htmlFor="fullNameEn">英文全称</Label>
              <Input
                id="fullNameEn"
                value={formData.fullNameEn || ""}
                onChange={(e) => handleInputChange("fullNameEn", e.target.value)}
                disabled={disabled}
              />
            </div>
          </div>
        </>
      )}

      {isPersonalCustomer && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shortNameCn" className="text-right">
              中文名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="shortNameCn"
              value={formData.shortNameCn || ""}
              onChange={(e) => handleInputChange("shortNameCn", e.target.value)}
              disabled={disabled}
              required
            />
          </div>
          <div>
            <Label htmlFor="shortNameEn">英文名称</Label>
            <Input
              id="shortNameEn"
              value={formData.shortNameEn || ""}
              onChange={(e) => handleInputChange("shortNameEn", e.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
      )}

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
          <Label htmlFor="groupName">所属集团</Label>
          <Select
            value={formData.groupName || ""}
            onValueChange={(value) => handleInputChange("groupName", value)}
            disabled={disabled}
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="isListed"
            checked={formData.isListed || false}
            onCheckedChange={(checked) => handleInputChange("isListed", checked)}
            disabled={disabled || isPersonalCustomer}
          />
          <Label htmlFor="isListed" className={cn(isPersonalCustomer && "text-muted-foreground")}>是否上市</Label>
        </div>
        {!isPersonalCustomer && formData.isListed && (
          <div>
            <Label htmlFor="stockCode">股票代码</Label>
            <Input
              id="stockCode"
              value={formData.stockCode || ""}
              onChange={(e) => handleInputChange("stockCode", e.target.value)}
              disabled={disabled}
            />
          </div>
        )}
      </div>

      {isPersonalCustomer && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">手机号</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={disabled}
              />
            </div>
            <div>
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={disabled}
              />
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="idNumber">证件号码</Label>
          <Input
            id="idNumber"
            value={formData.idNumber || ""}
            onChange={(e) => handleInputChange("idNumber", e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="city">城市</Label>
          <Input
            id="city"
            value={formData.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="entryDate">录入时间</Label>
        <Input
          id="entryDate"
          value={formData.entryDate || ""}
          onChange={(e) => handleInputChange("entryDate", e.target.value)}
          disabled
        />
      </div>
    </div>
  );
}
