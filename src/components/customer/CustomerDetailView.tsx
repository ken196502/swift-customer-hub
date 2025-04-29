
import { Button } from "@/components/ui/button";
import { CustomerDetail } from "@/components/CustomerDetail";
import type { Customer } from "@/pages/Index";

interface CustomerDetailViewProps {
  customer: Customer;
  onBack: () => void;
  onEditCustomer: (updatedCustomer: Partial<Customer>) => void;
  productOptions: string[];
  tagOptions: string[];
  contactTypes: string[];
}

export function CustomerDetailView({
  customer,
  onBack,
  onEditCustomer,
  productOptions,
  tagOptions,
  contactTypes
}: CustomerDetailViewProps) {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">客户详情</h1>
        <Button variant="outline" onClick={onBack}>
          返回列表
        </Button>
      </div>
      <CustomerDetail 
        customer={customer} 
        onEditCustomer={onEditCustomer}
        productOptions={productOptions}
        tagOptions={tagOptions}
        contactTypes={contactTypes}
      />
    </div>
  );
}
