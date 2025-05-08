
import { Customer } from "@/contexts/CustomerContext";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { DetailedInfoFields } from "./form/DetailedInfoFields";

interface CustomerFormSectionProps {
  formData: Partial<Customer>;
  handleInputChange: (field: string, value: any) => void;
  section: "basic" | "details";
  groupOptions: string[];
  countries: string[];
}

export function CustomerFormSection({ 
  formData, 
  handleInputChange, 
  section, 
  groupOptions,
  countries 
}: CustomerFormSectionProps) {
  if (section === "basic") {
    return (
      <BasicInfoFields 
        formData={formData} 
        handleInputChange={handleInputChange} 
        groupOptions={groupOptions} 
        countries={countries}
      />
    );
  }

  return (
    <DetailedInfoFields 
      formData={formData} 
      handleInputChange={handleInputChange}
      countries={countries}
    />
  );
}
