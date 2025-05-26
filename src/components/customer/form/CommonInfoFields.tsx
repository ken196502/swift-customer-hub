
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CountrySelect } from "@/components/ui/country-select";
import { Customer } from "@/contexts/CustomerContext";
import { countries } from "@/utils/countries";

interface CommonInfoFieldsProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  disabled?: boolean;
  isPersonalCustomer?: boolean;
}

export function CommonInfoFields({
  formData,
  handleInputChange,
  disabled = false,
  isPersonalCustomer = false
}: CommonInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="country">国家/地区</Label>
        <CountrySelect
          value={formData.country}
          onChange={(value) => handleInputChange("country", value)}
          disabled={disabled}
        />
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

      <div className="space-y-2">
        <Label>风险等级</Label>
        <Select
          value={formData.riskLevel}
          onValueChange={(value) => handleInputChange('riskLevel', value)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder={isPersonalCustomer ? "请选择风险等级" : "请选择风险等级"} />
          </SelectTrigger>
          <SelectContent>
            {isPersonalCustomer ? (
              <>
                <SelectItem value="未测评">未测评</SelectItem>
                <SelectItem value="稳健型">稳健型</SelectItem>
                <SelectItem value="审慎型">审慎型</SelectItem>
                <SelectItem value="均衡型">均衡型</SelectItem>
                <SelectItem value="进取型">进取型</SelectItem>
                <SelectItem value="投机型">投机型</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="低">低</SelectItem>
                <SelectItem value="中">中</SelectItem>
                <SelectItem value="高">高</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>
      
      {/* Added active status dropdown */}
      <div className="space-y-2">
        <Label>活跃状态</Label>
        <Select
          value={formData.activeStatus}
          onValueChange={(value) => handleInputChange('activeStatus', value)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="请选择活跃状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="活跃">活跃</SelectItem>
            <SelectItem value="一般">一般</SelectItem>
            <SelectItem value="不活跃">不活跃</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Added development progress dropdown */}
      <div className="space-y-2">
        <Label>开发进度</Label>
        <Select
          value={formData.progress}
          onValueChange={(value) => handleInputChange('progress', value)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="请选择开发进度" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="意向">意向</SelectItem>
            <SelectItem value="落地">落地</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!isPersonalCustomer && (
        <div className="space-y-2">
          <Label htmlFor="idType">证件类型</Label>
          <Select
            value={formData.idType || "营业执照"}
            onValueChange={(value) => handleInputChange("idType", value)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择证件类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="营业执照">营业执照</SelectItem>
              <SelectItem value="组织机构代码证">组织机构代码证</SelectItem>
              <SelectItem value="税务登记证">税务登记证</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {isPersonalCustomer ? (
        <div className="space-y-2">
          <Label htmlFor="idType">证件类型</Label>
          <Select
            value={formData.idType || "身份证"}
            onValueChange={(value) => handleInputChange("idType", value)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择证件类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="身份证">身份证</SelectItem>
              <SelectItem value="护照">护照</SelectItem>
              <SelectItem value="港澳通行证">港澳通行证</SelectItem>
              <SelectItem value="台湾通行证">台湾通行证</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : null}

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
  );
}
