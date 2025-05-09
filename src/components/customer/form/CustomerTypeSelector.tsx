
import { Customer } from "@/contexts/CustomerContext";
// Incorrect import: @/components/Button
import { Button } from "@/components/ui/button"; // Corrected to use the actual UI component path

interface CustomerTypeSelectorProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  disabled?: boolean;
}

export function CustomerTypeSelector({ 
  formData, 
  handleInputChange, 
  disabled = false 
}: CustomerTypeSelectorProps) {
  const isPersonal = formData.type === "个人户";
  const isCompany = formData.type === "公司户";
  const isInstitution = formData.type === "机构户";
  
  return (
    <div className="space-y-2">
      <div className="flex gap-4"> {/* 改为与新增面板一致的 gap 间距 */}
        <Button
          type="button"
          variant={isCompany ? "default" : "outline"}
          onClick={() => handleInputChange("type", "公司户")}
          disabled={disabled}
          className="flex-1"
        >
          公司户
        </Button>
        <Button
          type="button"
          variant={isInstitution ? "default" : "outline"}
          onClick={() => handleInputChange("type", "机构户")}
          disabled={disabled}
          className="flex-1"
        >
          机构户
        </Button>
        <Button
          type="button"
          variant={isPersonal ? "default" : "outline"}
          onClick={() => handleInputChange("type", "个人户")}
          disabled={disabled}
          className="flex-1"
        >
          个人户
        </Button>
      </div>
    </div>
  );
}
