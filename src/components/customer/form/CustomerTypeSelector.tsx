
import { Customer } from "@/contexts/CustomerContext";

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
      <h3 className="font-medium">客户类型</h3>
      <div className="flex items-center space-x-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            checked={isCompany}
            onChange={() => handleInputChange("type", "公司户")}
            disabled={disabled}
            className="h-4 w-4"
          />
          <span>公司户</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            checked={isInstitution}
            onChange={() => handleInputChange("type", "机构户")}
            disabled={disabled}
            className="h-4 w-4"
          />
          <span>机构户</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            checked={isPersonal}
            onChange={() => handleInputChange("type", "个人户")}
            disabled={disabled}
            className="h-4 w-4"
          />
          <span>个人户</span>
        </label>
      </div>
    </div>
  );
}
