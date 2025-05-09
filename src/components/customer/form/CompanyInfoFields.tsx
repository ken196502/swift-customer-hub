
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Customer } from "@/contexts/CustomerContext";

interface CompanyInfoFieldsProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  disabled?: boolean;
}

export function CompanyInfoFields({ 
  formData, 
  handleInputChange, 
  disabled = false 
}: CompanyInfoFieldsProps) {
  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="establishDate">成立日期</Label>
          <Input
            id="establishDate"
            type="date"
            value={formData.establishDate || ""}
            onChange={(e) => handleInputChange("establishDate", e.target.value)}
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">联系电话</Label>
          <Input
            id="phone"
            value={formData.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
