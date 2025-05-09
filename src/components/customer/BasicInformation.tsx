
import { Customer } from "@/contexts/CustomerContext";
import { BasicInfoCard } from "./info/BasicInfoCard";
import { DetailedInfoCard } from "./info/DetailedInfoCard";

interface BasicInformationProps {
  customer: Customer;
}

export function BasicInformation({ customer }: BasicInformationProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <BasicInfoCard customer={customer} />
      <DetailedInfoCard customer={customer} />
    </div>
  );
}
