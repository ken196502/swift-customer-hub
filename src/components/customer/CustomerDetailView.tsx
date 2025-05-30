
import { Button } from "@/components/ui/button";
import { CustomerDetail } from "@/components/CustomerDetail";
import { Customer } from "@/contexts/CustomerContext";

interface CustomerDetailViewProps {
  customer: Customer;
  onBack: () => void;
  onEditCustomer: (updatedCustomer: Partial<Customer>) => void;
  productOptions: string[];
  contactTypes: string[];
  groupOptions: string[] | { cn: string; en: string }[];
  departments: string[];
  countries: string[];
}

export function CustomerDetailView({
  customer,
  onBack,
  onEditCustomer,
  productOptions,
  contactTypes,
  groupOptions: originalGroupOptions,
  departments,
  countries
}: CustomerDetailViewProps) {
  // 将 groupOptions 转换为 string[] 类型
  const groupOptions = originalGroupOptions.map(opt => typeof opt === 'string' ? opt : opt.cn);
  return (
    <div className="mx-auto space-y-6">
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
        contactTypes={contactTypes}
        groupOptions={groupOptions}
        departments={departments}
        countries={countries}
      />
    </div>
  );
}
