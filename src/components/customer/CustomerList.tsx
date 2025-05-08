
import { Customer } from "@/contexts/CustomerContext";
import { CustomerTableView } from "./list/CustomerTableView";
import { CustomerGroupView } from "./list/CustomerGroupView";

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customerId: number) => void;
  viewMode: "customer" | "group";
  selectedCustomers: number[];
  onToggleSelect: (customerId: number) => void;
}

export function CustomerList({ 
  customers, 
  onSelectCustomer, 
  viewMode, 
  selectedCustomers,
  onToggleSelect
}: CustomerListProps) {
  if (viewMode === "customer") {
    return (
      <CustomerTableView 
        customers={customers} 
        onSelectCustomer={onSelectCustomer} 
        selectedCustomers={selectedCustomers}
        onToggleSelect={onToggleSelect}
      />
    );
  } else {
    return (
      <CustomerGroupView 
        customers={customers} 
        onSelectCustomer={onSelectCustomer} 
        selectedCustomers={selectedCustomers}
        onToggleSelect={onToggleSelect}
      />
    );
  }
}
