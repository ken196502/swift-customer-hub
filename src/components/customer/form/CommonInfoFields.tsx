
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CountrySelect } from "@/components/ui/country-select";
import { Customer } from "@/contexts/CustomerContext";
import { countries } from "@/utils/countries";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

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
                <SelectItem value="未测评">未测评</SelectItem>
                <SelectItem value="低">低</SelectItem>
                <SelectItem value="中">中</SelectItem>
                <SelectItem value="高">高</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Added active status dropdown */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Label>活跃状态</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>个人户为反洗钱等级</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Select
          value={formData.activeStatus}
          onValueChange={(value) => handleInputChange('activeStatus', value)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="请选择活跃状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="一般">一般</SelectItem>
            <SelectItem value="活跃">活跃</SelectItem>
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
            value={formData.idType ?? ""}
            onValueChange={(value) => handleInputChange("idType", value)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择证件类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10:LEI</SelectItem>
              <SelectItem value="11">11:公司注册证书</SelectItem>
              <SelectItem value="12">12:营业执照</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {isPersonalCustomer ? (
        <div className="space-y-2">
          <Label htmlFor="idType">证件类型</Label>
          <Select
            value={formData.idType ?? ""}
            onValueChange={(value) => handleInputChange("idType", value)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择证件类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0:香港永久身份证</SelectItem>
              <SelectItem value="1">1:大陆身份证</SelectItem>
              <SelectItem value="2">2:护照</SelectItem>
              <SelectItem value="5">5:澳门身份证</SelectItem>
              <SelectItem value="6">6:台湾身份证</SelectItem>
              <SelectItem value="7">7:香港非永久身份证</SelectItem>
              <SelectItem value="9">9:其他</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor="idNumber">证件号码</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>提交时将校验证件号码是否已存在</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="idNumber"
          value={formData.idNumber || ""}
          onChange={(e) => handleInputChange("idNumber", e.target.value)}
          disabled={disabled}
        />
      </div>

      {isPersonalCustomer && <div className="space-y-2">
        <div className="flex items-center space-x-2">
        <Label htmlFor="hsAccount">恒生柜台账号</Label>
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>提交时校验恒生号码是否已存在</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="hsAccount"
          value={formData.hsAccount || ""}
          onChange={(e) => handleInputChange("hsAccount", e.target.value)}
          disabled={disabled}
          placeholder="请输入恒生柜台账号"
        />
      </div>}
    </div>
  );
}
