
import { Customer } from "@/contexts/CustomerContext";
import { CompanyInfoFields } from "./CompanyInfoFields";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { CommonInfoFields } from "./CommonInfoFields";
import { CustomerTypeSelector } from "./CustomerTypeSelector";

interface BasicInfoFieldsProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  countries: string[];
  disabled?: boolean;
}

export function BasicInfoFields({ 
  formData, 
  handleInputChange, 
  countries,
  disabled = false 
}: BasicInfoFieldsProps) {
  const isPersonalCustomer = formData.type === "个人户";

  return (
    <div className="space-y-6">
      <CustomerTypeSelector
        formData={formData}
        handleInputChange={handleInputChange}
        disabled={disabled}
      />
      
      {isPersonalCustomer ? (
        <PersonalInfoFields 
          formData={formData} 
          handleInputChange={handleInputChange} 
          disabled={disabled} 
        />
      ) : (
        <CompanyInfoFields 
          formData={formData} 
          handleInputChange={handleInputChange} 
          disabled={disabled} 
        />
      )}
      
      <CommonInfoFields 
        formData={formData} 
        handleInputChange={handleInputChange}
        disabled={disabled}
        isPersonalCustomer={isPersonalCustomer}
      />
    </div>
  );
}
