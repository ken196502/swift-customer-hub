
import { Customer } from "@/contexts/CustomerContext";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { DetailedInfoFields } from "./form/DetailedInfoFields";

interface CustomerFormSectionProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  groupOptions: string[];
  countries: string[];
}

export function CustomerFormSection({ 
  formData, 
  handleInputChange, 
  groupOptions,
  countries 
}: CustomerFormSectionProps) {
  const isPersonalCustomer = formData.type === "个人户";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <BasicInfoFields 
          formData={formData} 
          handleInputChange={handleInputChange}  
          countries={countries}
        />
      </div>
      {!isPersonalCustomer && (
        <div>
          <DetailedInfoFields 
            formData={formData} 
            handleInputChange={handleInputChange}
            groupOptions={groupOptions}
          />
        </div>
      )}
    </div>
  );
}
