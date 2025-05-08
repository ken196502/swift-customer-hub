
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Customer } from "@/contexts/CustomerContext";

interface PersonalInfoFieldsProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  disabled?: boolean;
}

export function PersonalInfoFields({ 
  formData, 
  handleInputChange, 
  disabled = false 
}: PersonalInfoFieldsProps) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}
