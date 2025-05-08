
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
  const allSelected = customers.length > 0 && selectedCustomers.length === customers.length;

  const handleToggleSelectAll = () => {
    if (allSelected) {
      // Deselect all
      selectedCustomers.forEach(id => onToggleSelect(id));
    } else {
      // Select all currently unselected
      customers.forEach(customer => {
        if (!selectedCustomers.includes(customer.id)) {
          onToggleSelect(customer.id);
        }
      });
    }
  };

  if (viewMode === "customer") {
    return (
      <CustomerTableView 
        customers={customers} 
        onSelectCustomer={onSelectCustomer} 
        selectedCustomers={selectedCustomers}
        onToggleSelect={onToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        allSelected={allSelected}
      />
    );
  } else {
    return (
      <CustomerGroupView 
        customers={customers} 
        onSelectCustomer={onSelectCustomer} 
        selectedCustomers={selectedCustomers}
        onToggleSelect={onToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        allSelected={allSelected}
      />
    );
  }
}
